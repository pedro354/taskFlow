
export type SubTaskStatus = 'pending' | 'completed';

export type SubTask = {
    id: number;
    taskId?: number;
    title: string;
    status: SubTaskStatus;
}