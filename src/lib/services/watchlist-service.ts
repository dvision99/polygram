import type { WatchlistItem } from "$lib/types/stock";

const WATCHLIST_STORAGE_KEY = "stock-watchlist";

const DEFAULT_WATCHLIST_ITEMS: WatchlistItem[] = [
	{
		symbol: "TMPV",
		name: "Tata Motors Passenger Vehicle",
		addedAt: new Date().toISOString(),
	},
	{
		symbol: "M&M",
		name: "Mahindra & Mahindra",
		addedAt: new Date().toISOString(),
	},
	{
		symbol: "RELIANCE",
		name: "Reliance Industries",
		addedAt: new Date().toISOString(),
	},
];

function initializeDefaultWatchlist(): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(DEFAULT_WATCHLIST_ITEMS));
	} catch (error) {
		console.error("Error initializing default watchlist:", error);
	}
}

export function getWatchlist(): WatchlistItem[] {
	if (typeof window === "undefined") {
		return [];
	}

	try {
		const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored) as WatchlistItem[];
			// If watchlist exists but is empty, initialize with default data
			if (parsed.length === 0) {
				initializeDefaultWatchlist();
				return DEFAULT_WATCHLIST_ITEMS;
			}
			return parsed;
		} else {
			// Initialize with default data if watchlist doesn't exist
			initializeDefaultWatchlist();
			return DEFAULT_WATCHLIST_ITEMS;
		}
	} catch (error) {
		console.error("Error loading watchlist from localStorage:", error);
		// If there's an error, try to initialize with defaults
		try {
			initializeDefaultWatchlist();
			return DEFAULT_WATCHLIST_ITEMS;
		} catch (initError) {
			console.error("Error initializing default watchlist:", initError);
			return [];
		}
	}
}

export function addToWatchlist(symbol: string, name: string): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		const watchlist = getWatchlist();
		
		// Check if already in watchlist
		if (watchlist.some((item) => item.symbol === symbol)) {
			return;
		}

		const newItem: WatchlistItem = {
			symbol,
			name,
			addedAt: new Date().toISOString(),
		};

		watchlist.push(newItem);
		localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
	} catch (error) {
		console.error("Error adding to watchlist:", error);
	}
}

export function removeFromWatchlist(symbol: string): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		const watchlist = getWatchlist();
		const filtered = watchlist.filter((item) => item.symbol !== symbol);
		localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(filtered));
	} catch (error) {
		console.error("Error removing from watchlist:", error);
	}
}

export function isInWatchlist(symbol: string): boolean {
	if (typeof window === "undefined") {
		return false;
	}

	const watchlist = getWatchlist();
	return watchlist.some((item) => item.symbol === symbol);
}

