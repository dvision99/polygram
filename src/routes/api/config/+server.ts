import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getConfig, saveConfig, getDefaultConfig } from "$lib/services/config-service";
import type { TrackerConfig } from "$lib/types/news";

export const GET: RequestHandler = async () => {
	try {
		const config = getConfig();
		return json({ success: true, data: config });
	} catch (error) {
		console.error("Error fetching config:", error);
		return json({ success: false, error: "Failed to fetch config" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = (await request.json()) as TrackerConfig;
		saveConfig(body);
		return json({ success: true, data: body });
	} catch (error) {
		console.error("Error saving config:", error);
		return json({ success: false, error: "Failed to save config" }, { status: 500 });
	}
};

