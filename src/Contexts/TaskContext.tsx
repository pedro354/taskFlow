import { createContext, useEffect, useState } from "react";
import Proptypes from "prop-types";
import { createTask, deleteTask, getTasks, updatedTask } from "../service/task";
import type { Task } from "../types/typeTask";
import { createSubTask, deleteSubTask, updatedSubTask } from "../service/subtask";

interface TaskContextType {
    tasks: Task[];
    handleCreateTask: (input: string) => void;
    handleDeleteTask: (id: number) => void;
    handleToggleTask: (id: number) => void;
    handleCreateSubTask: (taskId: number, subtaskTitle: string) => void;
    handleToggleSubTask: (taskId: number, id: number) => void;
    handleDeleteSubTask: (taskId: number, id: number) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

TaskContextProvider.propTypes = {
    children: Proptypes.node
}



export function TaskContextProvider({ children }: { children: React.ReactNode }) {

    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        async function loadTasks() {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.log("Erro ao buscar tarefas: ", error);
            }
        }
        loadTasks();
    }, []);
    async function handleCreateTask(input: string) {
        if (input.trim() === "") return;
        try {
            const newTask = await createTask(input);
            setTasks((prev) => [...prev, newTask]);
        } catch (error) {
            console.log("Erro ao criar tarefa: ", error);

        }
    }

    async function handleToggleTask(id: number) {
        const task = tasks.find((task) => task.id === id);
        if (!task) return;
        const newStatus = task.status === "pending" ? "completed" : "pending";
        try {
            const updated = await updatedTask(id, task.title, newStatus);
            setTasks((prev) =>
                prev.map((task) => (task.id === id ? updated : task)));
        } catch (error) {
            console.log("Erro ao atualizar: ", error);
        }

    }
    async function handleDeleteTask(id: number) {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (error) {
            console.log("Erro ao deletar tarefa: ", error);
        }
    }


    // Subtask
    async function handleCreateSubTask(taskId: number, subtaskTitle: string) {
        try {
            const newSubTask = await createSubTask(taskId, subtaskTitle);
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId
                        ? { ...task, subtasks: [...task.subtasks, newSubTask] } : task))
        } catch (error) {
            console.log("Erro ao criar subtarefa: ", error);
        }
    }
    async function handleToggleSubTask(taskId: number, id: number) {
        const task = tasks.find((task) => task.id === taskId);
        const subtask = task?.subtasks.find((subtask) => subtask.id === id);
        if (!subtask) return;
        const newStatus = subtask.status === "pending" ? "completed" : "pending";
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        subtasks:
                            task.subtasks.map((subtask) =>
                                subtask.id === id ? { ...subtask, status: newStatus } : subtask
                            )
                    };
                }
                return task
            })
        );
        try {
            await updatedSubTask(taskId, id, subtask.title, newStatus);
        } catch (error) {
            console.log("Erro ao atualizar subtarefa: ", error);
        }
    }
    async function handleDeleteSubTask(taskId: number, id: number) {
        setTasks((prev) => 
            prev.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        subtasks: task.subtasks.filter((subtask) => subtask.id !== id)
                    }
                }
                return task
            })
        );
        try {
            await deleteSubTask(taskId, id);
        } catch (error) {
            console.log("Erro ao deletar subtarefa: ", error);
        }
    }


    return (
        <TaskContext.Provider value={ {
            tasks,
            handleCreateTask,
            handleDeleteTask,
            handleToggleTask,
            handleCreateSubTask,
            handleToggleSubTask,
            handleDeleteSubTask
        } }>
            { children }
        </TaskContext.Provider>
    )
}

