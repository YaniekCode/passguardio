import overallStyles from "@/app/styles/overallStyles.module.css";
import SignupForm from "@/components/signup/signupForm";

export default function SignupPage() {
	return (
		<div className={overallStyles.page}>
      			<main className={overallStyles.main}>
      				<h1 className={`${overallStyles.pageTitle}`}>Sign up</h1>
				<SignupForm />
      			</main>
    		</div>
	);
}
