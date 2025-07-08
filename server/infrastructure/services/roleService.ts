// server/services/roleService.ts
import { pool } from '../../core/db'; // твой экземпляр подключения к db
import { RoleEntity } from '../../core/entities/roleEntity';

export const RoleService = {
  async create(role: RoleEntity) {
    const result = await pool.query(
      'INSERT INTO roles (name) VALUES ($1) RETURNING *',
      [role.name]
    );
    return result.rows[0];
  },

  async update(id: number, role: RoleEntity) {
    const result = await pool.query(
      'UPDATE roles SET name = $1 WHERE id = $2 RETURNING *',
      [role.name, id]
    );
    return result.rows[0];
  },

  async delete(id: number) {
    await pool.query('DELETE FROM roles WHERE id = $1', [id]);
  },

  async getAll() {
    const result = await pool.query('SELECT * FROM roles');
    return result.rows;
  },

  async getById(id: number) {
    const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    return result.rows[0];
  },
};
