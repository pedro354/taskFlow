import type { SubTask } from "./typeSubTask"

export type TaskStatus = "pending" | "completed";

export type Task = {
    id: number;
    title: string;
    status: TaskStatus;
    subtasks: SubTask[];
}

