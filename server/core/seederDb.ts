import bcrypt from 'bcrypt';
import { pool } from '../core/db';
import { ROLES } from '../core/constants/roles';

async function seederDb() {
  try {
    // Таблицы
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        name VARCHAR(255),
        google_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE,
        description TEXT,
        duration VARCHAR(50),
        price NUMERIC(10, 2),
        sale INTEGER CHECK (sale >= 0 AND sale <= 100),
        author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_roles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
        UNIQUE (user_id, role_id)
      );
    `);

    // Пароли
    const password1 = await bcrypt.hash('123456', 10);
    const password2 = await bcrypt.hash('123456', 10);

    // Юзеры
    await pool.query(
      `INSERT INTO users (email, password, name, google_id) VALUES
       ('user1@gmail.com', $1, 'User One', NULL),
       ('user2@gmail.com', $2, 'User Two', 'googleid123')
       ON CONFLICT (email) DO NOTHING;`,
      [password1, password2]
    );

    // Роли
    const roleValues = Object.values(ROLES).map((r, i) => `($${i + 1})`).join(',');
    await pool.query(
      `INSERT INTO roles (name) VALUES ${roleValues}
       ON CONFLICT (name) DO NOTHING;`,
      Object.values(ROLES)
    );

    // Роли юзерам
    await pool.query(`
      INSERT INTO user_roles (user_id, role_id)
      SELECT u.id, r.id
      FROM users u, roles r
      WHERE (u.email = 'user1@gmail.com' AND r.name = $1)
         OR (u.email = 'user2@gmail.com' AND r.name = $2)
      ON CONFLICT (user_id, role_id) DO NOTHING;
    `, [ROLES.ADMIN, ROLES.USER]);

    console.log('✅ Сидинг завершён успешно!');
  } catch (err) {
    console.error('❌ Ошибка при сидинге:', err);
  } finally {
    await pool.end();
  }
}

seederDb();