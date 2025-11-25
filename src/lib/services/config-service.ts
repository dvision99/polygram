import type { TrackerConfig, ChannelConfig, TableColumn, UpdateFrequency } from "$lib/types/news";

const CONFIG_STORAGE_KEY = "news-tracker-config";

const DEFAULT_CHANNELS: ChannelConfig[] = [
	{ name: "CNBC News", enabled: true },
	{ name: "Twitter", enabled: true },
	{ name: "Reddit Community", enabled: false },
	{ name: "Live Mint", enabled: false },
	{ name: "Money Control", enabled: false },
	{ name: "Times Prime", enabled: false },
	{ name: "Google Finance", enabled: false },
];

const DEFAULT_COLUMNS: TableColumn[] = [
	"52W all time low",
	"Market Cap",
	"Rational for News",
	"PE",
	"Source of News",
	"CMP",
	"1D change",
	"News Headlines",
	"Confidence Level",
];

export function getDefaultConfig(): TrackerConfig {
	return {
		channels: [...DEFAULT_CHANNELS],
		tableConfig: {
			selectedColumns: [...DEFAULT_COLUMNS],
		},
		updateFrequency: "Every 30 min",
	};
}

export function getConfig(): TrackerConfig {
	if (typeof window === "undefined") {
		return getDefaultConfig();
	}

	try {
		const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored) as TrackerConfig;
			// Validate and merge with defaults
			return {
				channels: parsed.channels || DEFAULT_CHANNELS,
				tableConfig: {
					selectedColumns: parsed.tableConfig?.selectedColumns || DEFAULT_COLUMNS,
				},
				updateFrequency: parsed.updateFrequency || "Every 30 min",
			};
		}
	} catch (error) {
		console.error("Error loading config from localStorage:", error);
	}

	return getDefaultConfig();
}

export function saveConfig(config: TrackerConfig): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
	} catch (error) {
		console.error("Error saving config to localStorage:", error);
	}
}

