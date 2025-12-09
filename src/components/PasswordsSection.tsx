"use server";

import { PasswordData } from "@/lib";
import styles from "@/app/dashboard/dashboard.module.css";
import { FaPenToSquare, FaRegEye, FaTrash } from "react-icons/fa6";
import DeletePasswordButton from "@/components/DeletePasswordButton";
import Link from "next/link";

export default async function PasswordSection({ userPasswords } : { userPasswords: PasswordData[] }) {
    return (
        <section>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableRow}>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>Password</th>
                        <th className={styles.tableHeader}>URL</th>
			<th className={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    userPasswords.map((password) => (
                        <tr className={styles.tableRow} key={password.uuid}>
                            <td className={styles.tableData}>{password.name}</td>
                            <td className={styles.tableData}>{"*".repeat(password.password.length)}</td>
                            <td className={styles.tableData}>{password.url}</td>
			    <td className={styles.tableData}>
			   	<div className={styles.actionsDiv}>
					<div className={styles.action}>
                        			<Link href={`/dashboard/passwords/edit_password/${password.uuid}`}>
							<FaPenToSquare className={styles.actionIcon}/>
						<small className={styles.actionLabel}>Edit</small>
                        			</Link>
					</div>
					<div className={styles.action}>
                        			<Link href={`/dashboard/passwords/view_password/${password.uuid}`}>
							<FaRegEye className={styles.actionIcon}/>
						<small className={styles.actionLabel}>View</small>
						</Link>
					</div>
					<div className={styles.action}>
						<DeletePasswordButton name={password.name} uuid={password.uuid} />
					</div>
				</div> 
			    </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </section>
    )

}
