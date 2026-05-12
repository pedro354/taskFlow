const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`

export interface SubTask {
    taskId: number;
    subtaskId: number;
    id: number, 
    tittle: string,
    status: "pending" | "completed",
}

export const getSubTasks = async (taskId?: number) => {
    const res = await fetch(`${API_URL}/${taskId}/subtasks`);
    if(!res.ok){
        throw new Error('Erro ao carregar subtarefas');
    }
    return res.json();
}

export const createSubTask = async(taskId: number, title: string) =>{
    const res = await fetch(`${API_URL}/${taskId}/subtasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, status: "pending"})
    });
    if(!res.ok){
        throw new Error('Erro ao criar subtarefa');
    }
    return res.json();
}

export const updatedSubTask = async(taskId: number, subtaskId: number, title: string, status: string) => {
    const res = await fetch(`${API_URL}/${taskId}/subtasks/${subtaskId}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, status})
        }
    )
    if(!res.ok){
        throw new Error('Erro ao atualizar subtarefa');
    }
    console.log(res.body);
        const data = await res.json();
        return data;
        
    }

export const deleteSubTask = async(taskId: number, subtaskId: number) => {
    const res = await fetch(`${API_URL}/${taskId}/subtasks/${subtaskId}`,
        {
            method: 'DELETE',
        })
    if(!res.ok){
        throw new Error('Erro ao deletar subtarefa');
    }
    return true
}