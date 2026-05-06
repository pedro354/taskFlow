const TaskModel = require("../models/TaskModel");

const taskApiController = {
    getTasks: async (req, res) => {
        try {
            const tasks = await TaskModel.findAll();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar tarefas!", error: error.message });
        }
    },
    createTask: async (req, res) => {
        try {
            const { title } = req.body
            console.log("BODY:", req.body);
            const newTask = await TaskModel.create({title})
            res.status(201).json(newTask)
        } catch (error) {
                        console.error("erro real:", error);

            res.status(500).json({ message: "Erro ao criar tarefa" })
        }
    },
    updateTask: async (req, res) => {
        const { id } = req.params
        const { title, status } = req.body;
        if (!id) return res.status(400).json({ message:"ID da tarefa não informado!"});
        if (!title && !status) {
            return res.status(400).json({ message: "Nada para atualizar" });
        }
        try {
            const updateTask = await TaskModel.update(id, { title, status })
            console.log('body', req.body);
            res.status(200).json(updateTask);
        } catch (error) {
            console.error("erro real:", error);
            res.status(500).json({ message: "Erro ao atualizar tarefa" })
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;
            await TaskModel.delete(id);
            res.status(200).json({ message: "Tarefa deletada com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao deletar tarefa" });
        }
    }
}

module.exports = taskApiController

