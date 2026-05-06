import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Header.module.css";
import { IoIosHome } from "react-icons/io";  
export default function Header() {
    return (
        <div className={styles.headerContent}>
            <header className={styles.header}>
                
                <NavLink to="/" className={styles.logoWrapper}>
                    <img
                        className={styles.logo}
                        src={logo}
                        alt="Logo"
                    />

                    <span className={styles.logoText}>
                        TaskFlow
                    </span>
                </NavLink>

                <div className={styles.divider}></div>

                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${styles.navItem} ${
                                isActive ? styles.active : ""
                            }`
                        }
                    >
                        <span className={styles.icon}>
                            <IoIosHome />
                        </span>
                        Início
                    </NavLink>
                </nav>

            </header>
        </div>
    );
}