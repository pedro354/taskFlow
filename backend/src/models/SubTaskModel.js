const { query } = require("../database/db");

class SubTaskModel {
    constructor(subtaskRow) {
        if(!subtaskRow){
            throw new Error("Subtarefa não encontrada!");
        }
        this.id = subtaskRow.id;
        this.taskId = subtaskRow.task_id;
        this.title = subtaskRow.title;
        this.status = subtaskRow.status;
    }

    
    static async findAllByTaskId(taskId) {
        const result = await query(`
            SELECT * FROM subtasks WHERE task_id = $1 `, [taskId]);
            if(!result.rows[0]) return [];
            
        return result.rows.map(row => new SubTaskModel(row));
    }
    static async create({ taskId, title }) {
        const result = await query(
            `INSERT INTO subtasks (task_id, title)
            VALUES ($1, $2)
            RETURNING *`,
            [taskId, title]
        );

        return new SubTaskModel(result.rows[0]);
        
    }
    
    static async update(id, {title, status}) {
        const result = await query(`
            UPDATE subtasks
            SET title = $1,
                status = $2
            WHERE id = $3
            RETURNING *
            `, [ title, status, id]);
            if (!result.rows[0]) {
                throw new Error("Subtarefa não encontrada!");
            }
            return new SubTaskModel(result.rows[0])
        }
        static async delete(id) {
        await query(`DELETE FROM subtasks WHERE id = $1`, [id]);
    }
}

module.exports = SubTaskModel;