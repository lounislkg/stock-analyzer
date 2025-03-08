import { useState } from "react";
import styles from "./styles/swotCard.module.css";
export default function SwotCard({ color }: { color: string }) {
	const [firstInput, setFirstInput] = useState("");
	const [secondInput, setSecondInput] = useState("");
	const [thirdInput, setThirdInput] = useState("");

	return (
		<div className={styles.swotCard} style={{ backgroundColor: color }}>
			<input
				type="text"
				onChange={(e) => setFirstInput(e.target.value)}
				value={firstInput}
			/>
			<input
				type="text"
				onChange={(e) => setSecondInput(e.target.value)}
				value={secondInput}
			/>
			<input
				type="text"
				onChange={(e) => setThirdInput(e.target.value)}
				value={thirdInput}
			/>
		</div>
	);
}
