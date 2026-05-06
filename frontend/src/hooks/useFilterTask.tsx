import { useLocation } from "react-router-dom";
import useTaskContext from "./useContext";

export function useFilterTasks(){
    const { tasks } = useTaskContext();
    const location = useLocation();
    
    const params = new URLSearchParams(location.search);
    const filter = (params.get("filter") as "all" | "pending" | "completed") || "all";
    const pendingTasks = tasks.filter((task) => task.status === "pending");
    const completedTasks = tasks.filter((task) => task.status === "completed");
    const orderedTasks = [...pendingTasks, ...completedTasks];
    const filtredTasks = orderedTasks.filter((task) => {
        if(filter === "all") return true;
        return task.status === filter;
    })
    const countAll = filtredTasks.length;
    const countPending = filtredTasks.filter((task) => task.status === "pending").length;
    const countCompleted = filtredTasks.filter((task) => task.status === "completed").length;

    let message = null;

        if(filtredTasks.length === 0) {
            if(filter === "all"){ message = "Você ainda não tem tarefas cadastradas" }
            else if(filter === "pending"){ message = "Você ainda não tem tarefas pendentes" }
            else if(filter === "completed"){ message = "Você ainda não tem tarefas concluídas" }
    }

    return {
        filter,
        filtredTasks,
        countAll,
        countPending,
        countCompleted,
        message
    }
}