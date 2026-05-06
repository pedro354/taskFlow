require('dotenv').config({
  path: require('path').join(__dirname, '../../.env')
});
console.log("DB URL:", process.env.DATABASE_URL);
const { query } = require("./db");

async function syncDatabase() {
  try {

    await query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending'
      );
    `);

    await query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'subtask_status'
        ) THEN
          CREATE TYPE subtask_status AS ENUM ('pending', 'completed');
        END IF;
      END
      $$;
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS subtasks (
        id SERIAL PRIMARY KEY,
        task_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        status subtask_status NOT NULL DEFAULT 'pending'
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS task_subtasks (
        task_id INT NOT NULL,
        subtask_id INT NOT NULL,
        PRIMARY KEY (task_id, subtask_id),
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (subtask_id) REFERENCES subtasks(id) ON DELETE CASCADE
      );
    `);

    console.log('✅ Banco pronto!');

  } catch (error) {
    console.error('❌ Erro ao sincronizar o banco:', error);
  }
}

syncDatabase();