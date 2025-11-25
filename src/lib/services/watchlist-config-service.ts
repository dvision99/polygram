import type { WatchlistTableConfig, WatchlistTableColumn } from "$lib/types/watchlist";

const WATCHLIST_CONFIG_STORAGE_KEY = "watchlist-table-config";

const DEFAULT_COLUMNS: WatchlistTableColumn[] = [
	"Current Price (CMP)",
	"Change",
	"Change %",
	"Market Cap",
	"P/E Ratio",
	"P/B Ratio",
	"EPS",
	"ROE",
	"ROCE",
];

export function getDefaultWatchlistConfig(): WatchlistTableConfig {
	return {
		selectedColumns: [...DEFAULT_COLUMNS],
	};
}

export function getWatchlistConfig(): WatchlistTableConfig {
	if (typeof window === "undefined") {
		return getDefaultWatchlistConfig();
	}

	try {
		const stored = localStorage.getItem(WATCHLIST_CONFIG_STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored) as WatchlistTableConfig;
			// Validate and merge with defaults
			return {
				selectedColumns: parsed.selectedColumns || DEFAULT_COLUMNS,
			};
		}
	} catch (error) {
		console.error("Error loading watchlist config from localStorage:", error);
	}

	return getDefaultWatchlistConfig();
}

export function saveWatchlistConfig(config: WatchlistTableConfig): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		localStorage.setItem(WATCHLIST_CONFIG_STORAGE_KEY, JSON.stringify(config));
	} catch (error) {
		console.error("Error saving watchlist config to localStorage:", error);
	}
}

