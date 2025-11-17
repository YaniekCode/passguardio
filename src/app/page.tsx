import styles from "./page.module.css";
import SignupForm from "@/components/signupForm";

export default function SignUp() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      	<h1 className={`${styles.pageTitle} ${styles.formTitle}`}>Sign up</h1>
	<SignupForm />
      </main>
    </div>
  );
}
