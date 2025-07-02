import 'dotenv/config';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seederDb() {
  try {
    // Создаем таблицы отдельно
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

    // Хешируем пароли
    const password1 = await bcrypt.hash('password1', 10);
    const password2 = await bcrypt.hash('password2', 10);

    // Вставляем пользователей с параметрами
    await pool.query(
      `INSERT INTO users (email, password, name, google_id) VALUES
       ('user1@example.com', $1, 'User One', NULL),
       ('user2@example.com', $2, 'User Two', 'googleid123')
       ON CONFLICT (email) DO NOTHING;`,
      [password1, password2]
    );

    // Вставляем курсы
    await pool.query(`
      INSERT INTO courses (title, description, duration, price, sale, author_id) VALUES
      ('Курс по трейдингу', 'Учимся торговать на бирже с нуля', '4 недели', 99.99, 20, 1),
      ('Основы криптовалют', 'Введение в криптовалюты и блокчейн', '6 недель', 149.00, 30, 2)
      ON CONFLICT (title) DO NOTHING;
    `);

    console.log('✅ Сидинг завершён успешно!');
  } catch (err) {
    console.error('Ошибка при сидинге:', err);
  } finally {
    await pool.end();
  }
}

seederDb();
