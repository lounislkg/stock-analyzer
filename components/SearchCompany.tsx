"use client";
import styles from "./styles/searchCompany.module.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanyData } from "@/services/companyService";
import { useCompanyStore } from "@/store/useCompanyStore";

export default function SearchCompany() {
	const [ticker, setTicker] = useState(""); // Stocke le ticker entré par l’utilisateur
	const [finalTicker, setfinalTicker] = useState<string>(); // Stocke le ticker entré par l’utilisateur
	const { setData } = useCompanyStore(); // Accès au store Zustand

	// Utilisation de React Query pour récupérer les données
	const { data, isLoading, error, refetch } = useQuery(
		{
			queryKey: ['company', finalTicker],
			queryFn: () => fetchCompanyData(finalTicker ? finalTicker : ""),
			enabled: !!finalTicker,
		}
	);

	useEffect(() => {
		if (data) {
			setData(data);
		}
	}, [data]);

	const handleSearch = async () => {
		if (ticker === "") {
			console.log("ticker is empty");
			return;
		}
		setfinalTicker(ticker);
		/* refetch().then((result) => {
			setData(result.data);
		}); */
	};

	return (
		<div className={styles.searchDiv}>
			<input
				type="text"
				value={ticker}
				onChange={(e) => setTicker(e.target.value)}
				placeholder="Entrez un ticker"
				className={styles.searchInput}
			/>
			<button
				className={styles.searchButton}
				onClick={handleSearch}
				disabled={isLoading}
			>
				{isLoading ? "🤖" : "🔍"}
			</button>
			{error && <p>Erreur: {error.message}</p>}
		</div>
	);
}
