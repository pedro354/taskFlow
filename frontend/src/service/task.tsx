
const API_URL = "/api/tasks";

export interface Task {
    id: string;
    title: string;
    status: "pending" | "completed";
}

export const getTasks = async () => {
            console.log("Entrou na rota");
    const res = await fetch(API_URL);
    if(!res.ok){
        throw new Error('Erro ao carregar tarefas');
    }

    return res.json();
}

export const createTask = async(title: string) =>{
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, status: "pending"})
    });
    if(!res.ok){
        throw new Error('Erro ao criar tarefa');
    }
    return res.json();
}

export const updatedTask = async(id: number, title: string, status: string) => {
    const res = await fetch(`${API_URL}/${id}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, status})
        })
        
        if(!res.ok){
            throw new Error('Erro ao atualizar tarefa');
        }
        const data = await res.json();
        return data;

    }

export const deleteTask = async(id: number) => {
    const res = await fetch(`${API_URL}/${id}`,
        {
            method: 'DELETE',
        })
    if(!res.ok){
        throw new Error('Erro ao deletar tarefa');
    }
    return res.json();
}