import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function dropAllTablesDb() {
  try {
    await pool.query(`
      DO
      $$
      DECLARE
          r RECORD;
      BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
      END
      $$;
    `);
    console.log('✅ Все таблицы успешно удалены!');
  } catch (error) {
    console.error('❌ Ошибка при удалении таблиц:', error);
  } finally {
    await pool.end();
  }
}

dropAllTablesDb();
