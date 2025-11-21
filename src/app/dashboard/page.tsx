import { getSession } from "@/utils/session/sessionUtils";
import styles from "@/app/dashboard/dashboard.module.css";

export default async function Dashboard() {
	const session = await getSession();

	const firstUsernameLetter = session.username[0].toUpperCase();

	return (
		<div className={styles.page}>
			<section className={styles.topBar}>
				<div>
      					<h1 className={styles.pageTitle}>Dashboard</h1>
				</div>
				<div className={styles.userIcon}>
					<p>{firstUsernameLetter}</p>	
				</div>
			</section>
      			<main className={styles.main}>
				<section className={styles.mainBar}>
					<h2 className={styles.pageSubtitle}>My passwords: </h2>
					<button>Add a password</button>
				</section>
				<section>
				</section>
      			</main>
    		</div>
	);
};
