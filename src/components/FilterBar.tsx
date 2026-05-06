import { useNavigate } from "react-router-dom";
import { useFilterTasks } from "../hooks/useFilterTask";
import styles from "../pages/Home.module.css";

export function FilterBar(){
    const {filter, countAll, countPending, countCompleted} = useFilterTasks();
    const navigate = useNavigate();

    function setFilter(newFilter: string){
        navigate(`/?filter=${newFilter}`);
    }

    return (
                <div className={styles.filterBar}>
                <div className={styles.filters}>
                <button className={filter === "all" ? styles.active : styles.inactive} onClick={() => setFilter("all")}>Todas</button>
                <button className={filter === "pending" ? styles.active : styles.inactive} onClick={() => setFilter("pending")}>Pendentes</button>
                <button className={filter === "completed" ? styles.active: styles.inactive} onClick={() => setFilter("completed")}>Concluídas</button>
                            </div>
                <div className={styles.summary}>
                <span className={filter === "all" ? styles.total : styles.total}  >Total: {countAll}</span>
                <span className={filter === "pending" ? styles.pending : styles.pending}>Pendentes: {countPending}</span>
                <span className={filter === "completed" ? styles.completed : styles.completed}>Concluidas: {countCompleted}</span>
                </div>
                </div>

    )
}