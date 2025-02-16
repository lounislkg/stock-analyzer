import { useCompanyStore } from "@/store/useCompanyStore";
import Image from "next/image";
import styles from "./styles/BasicInfos.module.css";

export default function BasicInfos() {
	const { data } = useCompanyStore();

	return (
		<div className={styles.main}>
			<h1>{data ? data[4].name : "Basic Infos"}</h1>
			<p>{data && data[3].c.toString() + " " + data[4].currency}</p>
			{data && data[4].logo && (
				<Image
					className={styles.logoImage}
					src={data[4].logo}
					alt="logo-company"
					width={100}
					height={100}
				></Image>
			)}
		</div>
	);
}
