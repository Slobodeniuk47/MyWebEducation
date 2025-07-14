import { pool } from '../../core/db';
import bcrypt from 'bcrypt';
import { UserEntity } from '../../core/entities/userEntity';
import { QueryResult } from 'pg';
import { DEFAULT_ROLE } from '../../core/constants/roles';
import { GoogleExternalLoginDto } from '../dtos/googleExternalLoginDto';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID);

export class UserService {
  async createUser(user: UserEntity): Promise<UserEntity | null> {
    const hashedPassword = user.password ? await bcrypt.hash(user.password, 10) : null;

    const result: QueryResult<UserEntity> = await pool.query(
      `INSERT INTO users (email, password, name, google_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, google_id, created_at`,
      [user.email, hashedPassword, user.name || null, user.googleId || null]
    );

    const createdUser = result.rows[0];

    const roleResult = await pool.query(`SELECT id FROM roles WHERE name = $1`, [DEFAULT_ROLE]);
    const userRoleId = roleResult.rows[0]?.id;

    if (userRoleId) {
      await pool.query(
        `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)
         ON CONFLICT (user_id, role_id) DO NOTHING`,
        [createdUser.id, userRoleId]
      );
    }

    return this.getUserById(createdUser.id!);
  }

  async googleExternalLogin(dto: GoogleExternalLoginDto): Promise<UserEntity> {
    if (dto.provider !== 'google') {
      throw new Error('Поддерживается только Google login');
    }

    const ticket = await client.verifyIdToken({
      idToken: dto.token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error('Невалидный Google токен');
    }

    const { email, name, sub: googleId } = payload;

    let user = await this.getUserByEmail(email);

    if (!user) {
      user = await this.createUser({
        email,
        name: name || null,
        googleId,
      });
    }

    return user!;
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    const result = await pool.query(
      `
      SELECT 
        u.id, u.email, u.name, u.google_id, u.created_at,
        ARRAY_REMOVE(ARRAY_AGG(r.name), NULL) AS roles
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.id = $1
      GROUP BY u.id
      `,
      [id]
    );
    return result.rows[0] || null;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const result: QueryResult<UserEntity> = await pool.query(
      `SELECT id, email, password, name, google_id, created_at FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const result = await pool.query(
      `
      SELECT 
        u.id, u.email, u.name, u.google_id, u.created_at,
        ARRAY_REMOVE(ARRAY_AGG(r.name), NULL) AS roles
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      GROUP BY u.id
      `
    );
    return result.rows;
  }

  async updateUser(id: number, user: Partial<UserEntity>): Promise<UserEntity | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (user.email) {
      fields.push(`email = $${idx++}`);
      values.push(user.email);
    }
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      fields.push(`password = $${idx++}`);
      values.push(hashedPassword);
    }
    if (user.name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(user.name);
    }
    if (user.googleId !== undefined) {
      fields.push(`google_id = $${idx++}`);
      values.push(user.googleId);
    }

    if (fields.length > 0) {
      values.push(id);
      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, email, name, google_id, created_at`;
      await pool.query(query, values);
    }

    if (user.roles && Array.isArray(user.roles)) {
      const roleCheck = await pool.query(
        `SELECT name FROM roles WHERE name = ANY($1::text[])`,
        [user.roles]
      );
      const existingRoles = roleCheck.rows.map(r => r.name);
      const unknownRoles = user.roles.filter(r => !existingRoles.includes(r));
      if (unknownRoles.length > 0) {
        throw new Error(`Unknown roles: ${unknownRoles.join(', ')}`);
      }

      await pool.query(`DELETE FROM user_roles WHERE user_id = $1`, [id]);

      const roleIdsResult = await pool.query(
        `SELECT id FROM roles WHERE name = ANY($1::text[])`,
        [user.roles]
      );
      const roleIds: number[] = roleIdsResult.rows.map(r => r.id);

      for (const roleId of roleIds) {
        await pool.query(
          `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`,
          [id, roleId]
        );
      }
    }

    return await this.getUserById(id);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result: QueryResult = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return (result?.rowCount ?? 0) > 0;
  }
}
