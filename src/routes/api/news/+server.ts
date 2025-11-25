import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { fetchNews } from "$lib/services/news-service";

export const GET: RequestHandler = async ({ url }) => {
	try {
		const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];
		const channelsParam = url.searchParams.get("channels");
		const channels = channelsParam ? channelsParam.split(",") : [];

		const news = await fetchNews(channels, date);

		return json({ success: true, data: news });
	} catch (error) {
		console.error("Error fetching news:", error);
		return json({ success: false, error: "Failed to fetch news" }, { status: 500 });
	}
};

