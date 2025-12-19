import overallStyles from "@/app/styles/overallStyles.module.css";
import LoginForm from "@/components/login/loginForm";

export default function LoginPage() {
	return (
    		<div className={overallStyles.page}>
      			<main>
      				<h1 className={overallStyles.pageTitle}>Login</h1>
				<LoginForm/>
      			</main>
    		</div>
	);
};
