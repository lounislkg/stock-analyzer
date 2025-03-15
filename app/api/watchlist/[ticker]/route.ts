type Params = {
	ticker: string;
};

export async function GET(request: Request, context: { params: Params }) {
	const params = await context.params;
	if (params.ticker === undefined) {
		return Response.json({ error: "Please provide a ticker" });
	}
	const ticker = params.ticker || "";
	const finnhub_api_key = process.env.API_KEY_FINNHUB;
	const urls = [
		`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhub_api_key}`,
		`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${finnhub_api_key}`,
	];

	const responses = await Promise.all(urls.map((url) => fetch(url)));
	const data = await Promise.all(responses.map((response) => response.json()));
    for (const d of data) {
        if (d.error) {
            return Response.json(d);
        }
    }
	if (data.length === 0) {
		return Response.json({ error: "No data" });
	}
	return Response.json(data);
}

