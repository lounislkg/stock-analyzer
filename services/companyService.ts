export const fetchCompanyData = async (ticker: string) => {
	if (!ticker) throw new Error("The ticker is needed");
	const response = await fetch(`/api/financials/${ticker}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erreur lors de la récupération des données");
	}
	const data = await response.json();
	return data;
};

export const getRatios = async (ticker: string) => {
	if (!ticker) throw new Error("The ticker is needed");
	const response = await fetch(`/api/stock_ratios/${ticker}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erreur lors de la récupération des ratios");
	}
	const data = await response.json();
	return data;
};

export const getPrices = async (ticker: string) => {	
	if (!ticker) throw new Error("The ticker is needed");
	const response = await fetch(`/api/watchlist/${ticker}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erreur lors de la récupération des prix");
	}
	const data = await response.json();
	return data;
}