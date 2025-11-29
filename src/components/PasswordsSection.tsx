import { PasswordData } from "@/lib";
import styles from "@/app/dashboard/dashboard.module.css";

export default function PasswordSection({ userPasswords } : { userPasswords: PasswordData[] }) {
    return (
        <section>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableRow}>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>Password</th>
                        <th className={styles.tableHeader}>URL</th>
                    </tr>
                </thead>
                <tbody>
                {
                    userPasswords.map((password, i) => (
                        <tr className={styles.tableRow} key={i}>
                            <td className={styles.tableData}>{password.name}</td>
                            <td className={styles.tableData}>{password.password}</td>
                            <td className={styles.tableData}>{password.url}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </section>
    )

}