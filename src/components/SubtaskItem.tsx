import { taskVariants } from "../animations/taskAnimation";
import type { SubTask } from "../types/typeSubTask";
import {motion} from "framer-motion"

import styles from "./SubtaskItem.module.css";
interface SubtaskItemProps {
    subtask: SubTask;
    handleToggle: (id: number) => void;
    handleDelete: (id: number) => void;
    status: string;
}

export function SubtaskItem({ subtask, handleToggle, handleDelete }: SubtaskItemProps) {
    console.log("subtask item: ", subtask);
    console.log("id que vai pro handler", subtask.id);
    
    return (
        <motion.li
                 layout
                 variants={taskVariants}
                 initial="hidden"
         animate={{opacity: subtask.status === "completed" ? 0.6 : 1}}
                 exit="exit"
         transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
         }}
                 className={ `${styles.subtask} ${subtask.status === "completed" ? styles.status : ""}`}>
        <div className={ styles.header }>
                <h2 className={`${styles.title}`}>
            { subtask.title }
            </h2>
                            <div className={ styles.actions }>

            <button className="button" onClick={ () => handleDelete(subtask.id) }>Deletar</button>
            <button className="button" onClick={ () => handleToggle(subtask.id) }>{ subtask.status === "completed" ? "Desfazer" : "Feito" }</button>
            </div>
            </div>
        </motion.li>
    )
}

