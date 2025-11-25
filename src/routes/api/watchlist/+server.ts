import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
	isInWatchlist,
} from "$lib/services/watchlist-service";
import type { WatchlistItem } from "$lib/types/stock";

export const GET: RequestHandler = async () => {
	try {
		const watchlist = getWatchlist();
		return json({ success: true, data: watchlist });
	} catch (error) {
		console.error("Error fetching watchlist:", error);
		return json({ success: false, error: "Failed to fetch watchlist" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = (await request.json()) as { symbol: string; name: string };
		addToWatchlist(body.symbol, body.name);
		return json({ success: true, data: getWatchlist() });
	} catch (error) {
		console.error("Error adding to watchlist:", error);
		return json({ success: false, error: "Failed to add to watchlist" }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	try {
		const body = (await request.json()) as { symbol: string };
		removeFromWatchlist(body.symbol);
		return json({ success: true, data: getWatchlist() });
	} catch (error) {
		console.error("Error removing from watchlist:", error);
		return json({ success: false, error: "Failed to remove from watchlist" }, { status: 500 });
	}
};

