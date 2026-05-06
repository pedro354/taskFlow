import { useState } from "react";
import { TaskItem } from "../components/TaskItem";
import styles from "./Home.module.css";
import useTaskContext from "../hooks/useContext";
import { FilterBar } from "../components/FilterBar";
import { useFilterTasks } from "../hooks/useFilterTask";
import prancheta from "../assets/pracheta.png";

export function Home() {

    const [input, setInput] = useState("");
    const { handleCreateTask, handleDeleteTask, handleToggleTask } = useTaskContext();
    
    const { filtredTasks, message } = useFilterTasks();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Minhas tarefas</h1>
            <div className={styles.inputGroup}>
            <input className={styles.input} type="text" placeholder="Digite sua tarefa..." value={ input } onChange={ (e) => setInput(e.target.value) } />
            <button className="button"
            onClick={() => {handleCreateTask(input), setInput("")}} 
            >Criar</button>
            </div>
                <FilterBar />
            <ul className={styles.list}>
                
                { filtredTasks.map((task) => 
                <TaskItem  
                key={ task.id } 
                task={task}
                status={task.status}
                handleDelete={handleDeleteTask} 
                handleToggle={handleToggleTask}

                /> 
                )
            }
            </ul>
                                {message && (

                            <div className={styles.emptyContent}>
                                        <img
                        className={styles.prancheta}
                        src={prancheta}
                        alt="prancheta"
                    />

                    <h3 className={ styles.emptyTitle }>
                <p className={styles.empty}>{message}</p>
            </h3>
                        <h4 className={styles.emptySTitle}>Comece criando a primeira tarefa.</h4>
                </div>
                )}
        </div>
    )
}
 