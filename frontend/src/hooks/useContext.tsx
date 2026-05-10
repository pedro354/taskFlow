import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export default function useTaskContext() {
        const context = useContext(TaskContext);
        if(!context) {
            throw new Error("TaskContext não encontrado");
        }
        return context;
}