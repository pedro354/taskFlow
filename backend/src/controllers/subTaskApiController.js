const SubTaskModel = require("../models/SubTaskModel");

const subTaskApiController = {
    getSubTasks: async (req, res) => {
        try {
            const subtasks = await SubTaskModel.findAllByTaskId(req.params.taskId);
            res.status(200).json(subtasks);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar subtarefas!", error: error.message });
        }
    },
    createSubTask: async(req, res) => {
        try {
            const { title } = req.body;
            const { taskId } = req.params;
            const newSubTask = await SubTaskModel.create({taskId, title} )
            res.status(201).json(newSubTask);
        } catch (error) {
            console.error("erro:", error);
            res.status(500).json({ message: "Erro ao criar subtarefa" })
        }
    },
    updateSubTask: async(req, res) => {
        const { subtaskId } = req.params
        const { title, status } = req.body;
        if(!subtaskId) return res.status(400).json({ message:"ID da subtarefa não informado!"});
        if(!title && !status) {
            return res.status(400).json({ message: "Nada para atualizar" });
        }
        try {
            const updateSubTask = await SubTaskModel.update(subtaskId, { title, status })
            console.log('body', req.body);
            res.status(200).json(updateSubTask);
        } catch (error) {
            console.error("erro:", error);
            res.status(500).json({ message: "Erro ao atualizar subtarefa" });
        }
    },
    deleteSubTask: async(req, res) => {
        try {
            const { subtaskId } = req.params;
            await SubTaskModel.delete(subtaskId);
            res.status(200).json({ message: "Subtarefa deletada com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao deletar subtarefa" });
        }
    }
}

module.exports = subTaskApiController;