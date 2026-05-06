import type { Task } from "../types/typeTask";
import styles from './TaskItem.module.css';
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
interface TaskItemProps {
    task: Task;
    handleDelete: (id: number) => void;
    handleToggle: (id: number) => void;
    status: string;
}


export function TaskItem({ task, handleDelete, handleToggle }: TaskItemProps) {

    return (
        <motion.li
         layout="position"
         initial="hidden"
         animate={{opacity: task.status === "completed" ? 0.6 : 1}}
         transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
         }}
         exit="exit"
         className={ `${styles.task} ${task.status === "completed" ? styles.completed : ""}` }>
            <div className={ styles.header }>
                <h2 className={`${styles.title}`}>
                <Link to={`/tasks/${task.id}/subtasks`} className={styles.link}>
                    { task.title } 
                </Link>
                </h2>
                <div className={ styles.actions }>
                    <button className="button" onClick={ () => handleDelete(task.id) }>Deletar</button>
                    <button className="button" onClick={ () => handleToggle(task.id) }>{task.status === "completed" ? "Desfazer" : "Completar"}</button>
                    
                    </div>
                    </div>
                    
        </motion.li>
    )
}
