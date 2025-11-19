import styles from "@/app/login/page.module.css";
import LoginForm from "@/components/login/loginForm";

export default function LoginPage() {
	return (
    		<div className={styles.page}>
      			<main className={styles.main}>
      				<h1 className={`${styles.pageTitle} ${styles.formTitle}`}>Login</h1>
				<LoginForm/>
      			</main>
    		</div>
	);
};
