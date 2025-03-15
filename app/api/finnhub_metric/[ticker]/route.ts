import { type Ratios } from "@/utils/dataDescription";
type Params = {
	ticker: string;
};

export async function GET(request: Request, context: { params: Params }) {
	const params = await context.params;
	if (params.ticker === undefined) {
		return Response.json({ error: "Please provide a ticker" });
	}
	const ticker = params.ticker || "";
	const api_key = process.env.API_KEY_FINNHUB;
	const response = await fetch(
		`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${api_key}`,
	);
	const data = await response.json();
	if (data.length === 0) {
		return Response.json({ error: "No data" });
	}
	return Response.json(data);
}

