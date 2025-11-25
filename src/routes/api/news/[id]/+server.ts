import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { fetchNewsDetail } from "$lib/services/news-service";

export const GET: RequestHandler = async ({ params }) => {
	try {
		const { id } = params;
		const detail = await fetchNewsDetail(id);

		if (!detail) {
			return json({ success: false, error: "News item not found" }, { status: 404 });
		}

		return json({ success: true, data: detail });
	} catch (error) {
		console.error("Error fetching news detail:", error);
		return json({ success: false, error: "Failed to fetch news detail" }, { status: 500 });
	}
};

