import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
	getWatchlistConfig,
	saveWatchlistConfig,
} from "$lib/services/watchlist-config-service";
import type { WatchlistTableConfig } from "$lib/types/watchlist";

export const GET: RequestHandler = async () => {
	try {
		const config = getWatchlistConfig();
		return json({ success: true, data: config });
	} catch (error) {
		console.error("Error fetching watchlist config:", error);
		return json({ success: false, error: "Failed to fetch config" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = (await request.json()) as WatchlistTableConfig;
		saveWatchlistConfig(body);
		return json({ success: true, data: getWatchlistConfig() });
	} catch (error) {
		console.error("Error saving watchlist config:", error);
		return json({ success: false, error: "Failed to save config" }, { status: 500 });
	}
};

