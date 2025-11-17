import styles from "@/components/FormMessageBox.module.css";

export default function FormMessageBox({ message } : { message: string }) {
	return (
		<div className={`${styles.formMessageBox}`}>
			<p>{message}</p>
		</div>
	);
};
