import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { fetchStockData } from "$lib/services/stock-service";

export const GET: RequestHandler = async ({ params }) => {
	try {
		const { symbol } = params;
		const stockData = await fetchStockData(symbol);

		if (!stockData) {
			return json({ success: false, error: "Stock not found" }, { status: 404 });
		}

		return json({ success: true, data: stockData });
	} catch (error) {
		console.error("Error fetching stock data:", error);
		return json({ success: false, error: "Failed to fetch stock data" }, { status: 500 });
	}
};

