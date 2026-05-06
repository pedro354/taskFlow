const { query } = require("../database/db");
const SubTaskModel = require("./SubTaskModel");

class TaskModel {
    // Mapeia os dados da linha do banco para o objeto da classe
    constructor(taskRow) {
        this.id = taskRow.id;
        this.title = taskRow.title;
        this.status = taskRow.status;
        this.subtasks = [];
    }
    // Busca todas as tarefas da tabela (sem filtro por usuário)
static async findAll() {
    const result = await query(`
        SELECT
            tasks.*,
            subtasks.id AS "subtask.id",
            subtasks.title AS "subtask.title",
            subtasks.status AS "subtask.status",
            subtasks.task_id AS "subtask.task_id"
        FROM tasks
        LEFT JOIN subtasks ON subtasks.task_id = tasks.id
    `);

    const tasksMap = new Map();

    result.rows.forEach((row) => {

        // 🔹 cria a task uma vez
        if (!tasksMap.has(row.id)) {
            tasksMap.set(row.id, new TaskModel({
                id: row.id,
                title: row.title,
                status: row.status,
                subtasks: []
            }));
        }

        const task = tasksMap.get(row.id);

        // 🔹 se existir subtask, adiciona
        if (row["subtask.id"]) {
            const subtask = new SubTaskModel({
                id: row["subtask.id"],
                title: row["subtask.title"],
                status: row["subtask.status"],
                task_id: row["subtask.task_id"]
            });

            task.subtasks.push(subtask);
        }
    });

    return Array.from(tasksMap.values());
    

}
    // Busca uma tarefa pelo id
    static async findTaskById(id) {
        const result = await query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (!result.rows[0]) return null;
        return new TaskModel(result.rows[0]);
    }
    // Cria uma nova tarefa no banco de dados
    static async create({ title }) {
        const result = await query(
            `INSERT INTO tasks (title)
            VALUES ($1)
            RETURNING *`,
            [title]
        );
        
        console.error(result);
        return new TaskModel(result.rows[0]);
        
    }
    // Atualiza uma tarefa no banco de dados
    static async update(id, { title, status }) {
        const result = await query(`
        UPDATE tasks
        SET title = $1,
            status = $2
        WHERE id = $3
        RETURNING *
    `, [title, status, id]);

        if (!result.rows[0]) return null;

        return new TaskModel(result.rows[0]);
    }   
     // Deleta uma tarefa do banco de dados
    static async delete(id) {
        await query(`DELETE FROM tasks WHERE id = $1`, [id]);
    }
}

module.exports = TaskModel;