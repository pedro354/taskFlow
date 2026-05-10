import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import styles from './Home.module.css'
import { SubtaskItem } from "../components/SubtaskItem";
import useTaskContext from "../hooks/useContext";
import prancheta from "../assets/pracheta.png";

export default function SubTaskPage() {
    const { taskId } = useParams();
    const context = useContext(TaskContext);
    const { handleCreateSubTask, handleToggleSubTask, handleDeleteSubTask } = useTaskContext();
    const [input, setInput] = useState("");
    if (!context) {
        throw new Error("TaskContext não encontrado");
    }
    const { tasks } = context;


    if (tasks.length === 0) {
        return <div>Loading...</div>;
    }

    const task = tasks.find((t) => t.id === Number(taskId));

    if (!task) {
        return <div>Tarefa nao encontrada</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.subTitle}>Subtarefa de: { task.title }</h1>
            <div className={ styles.inputGroup }>
                <input className={ styles.input }
                    type="text"
                    placeholder="Digite sua tarefa..."
                    value={ input }
                    onChange={ (e) =>
                        setInput(e.target.value) }
                />
                <button className="button"
                    onClick={ () => {
                        handleCreateSubTask(task.id, input),
                        setInput("")
                    } }
                >
                    Criar
                </button>
            </div>
            <ul className={ styles.list }>
                { (task.subtasks ?? []).map((subtask) => (
                    <SubtaskItem
                        key={ subtask.id }
                        subtask={ subtask }
                        status={ subtask.status }
                        handleToggle={ (subtaskId) => handleToggleSubTask(task.id, subtaskId) }
                        handleDelete={ (subtaskId) => handleDeleteSubTask(task.id, subtaskId)}
                    />
                )) }
            </ul>
            
            { (task.subtasks ?? []).length === 0 && (
                <div className={styles.emptyContent}>
                                        <img
                        className={styles.prancheta}
                        src={prancheta}
                        alt="prancheta"
                    />

                    <h3 className={ styles.emptyTitle }>
                        Nenhuma subtarefa encontrada</h3>
                        <h4 className={styles.emptySTitle}>Comece criando a primeira subtarefa.</h4>
                </div>
            ) }
        </div>
    );
}
