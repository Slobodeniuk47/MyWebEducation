import { pool } from '../../core/db';
import bcrypt from 'bcrypt';
import { UserEntity } from '../../core/entities/userEntity';
import { QueryResult } from 'pg';

export class UserService {
  async createUser(user: UserEntity): Promise<UserEntity> {
    const hashedPassword = user.password ? await bcrypt.hash(user.password, 10) : null;
    const result: QueryResult<UserEntity> = await pool.query(
      `INSERT INTO users (email, password, name, google_id) VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, google_id, created_at`,
      [user.email, hashedPassword, user.name || null, user.googleId || null]
    );
    return result.rows[0];
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    const result: QueryResult<UserEntity> = await pool.query(
      `SELECT id, email, name, google_id, created_at FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const result: QueryResult<UserEntity> = await pool.query(
      `SELECT id, email, name, google_id, created_at FROM users`
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
    if (fields.length === 0) return null; // нечего обновлять

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, email, name, google_id, created_at`;
    const result: QueryResult<UserEntity> = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result: QueryResult = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return (result?.rowCount ?? 0) > 0;


  }
}
