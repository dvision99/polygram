export type WatchlistTableColumn =
	| "Current Price (CMP)"
	| "Change"
	| "Change %"
	| "Market Cap"
	| "P/E Ratio"
	| "P/B Ratio"
	| "EPS"
	| "ROE"
	| "ROCE"
	| "Revenue"
	| "Profit Margin"
	| "Promoter %"
	| "FII %"
	| "DII %"
	| "Public %"
	| "Sector"
	| "Industry"
	| "Book Value"
	| "Face Value"
	| "Dividend Yield"
	| "Beta"
	| "52W High"
	| "52W Low"
	| "Volume"
	| "Debt-to-Equity Ratio"
	| "Current Ratio"
	| "Quick Ratio"
	| "Price-to-Sales Ratio"
	| "EV/EBITDA";

export interface WatchlistTableConfig {
	selectedColumns: WatchlistTableColumn[];
}

