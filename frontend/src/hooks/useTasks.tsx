
import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

export default function useTasks() {

    return useContext( TaskContext);

}