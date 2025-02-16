"use client";
import styles from "./styles/searchCompany.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanyData } from "@/services/companyService";
import { useCompanyStore } from "@/store/useCompanyStore";

export default function SearchCompany() {
	const [ticker, setTicker] = useState(""); // Stocke le ticker entré par l’utilisateur
	const { setData } = useCompanyStore(); // Accès au store Zustand

	// Utilisation de React Query pour récupérer les données
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["company", ticker], // Clé unique pour le cache
		queryFn: () => fetchCompanyData(ticker),
		enabled: false, // Désactivé au début, on déclenche avec `refetch`
	});

	const handleSearch = async () => {
		if (ticker === "") {
			console.log("ticker is empty");
			return;
		}
		refetch().then((result) => {
			setData(result.data);
		});
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
