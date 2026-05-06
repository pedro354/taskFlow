import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

export default function useTaskContext() {
        const context = useContext(TaskContext);
        if(!context) {
            throw new Error("TaskContext não encontrado");
        }
        return context;
}