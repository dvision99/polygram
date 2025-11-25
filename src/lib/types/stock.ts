export interface StockPrice {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
}

export interface StockDetail {
	symbol: string;
	name: string;
	currentPrice: number;
	change: number;
	changePercent: number;
	previousClose: number;
	marketCap: number;
	sector: string;
	industry: string;
	exchange: string;
	currency: string;
}

export interface FundamentalData {
	peRatio: number;
	pbRatio: number;
	eps: number;
	dividendYield: number;
	beta: number;
	revenue: number;
	profit: number;
	profitMargin: number;
	grossMargin: number;
	operatingMargin: number;
	roe: number;
	roce: number;
	bookValue: number;
	faceValue: number;
	// Additional ratios
	debtToEquity?: number;
	currentRatio?: number;
	quickRatio?: number;
	priceToSales?: number;
	evEbitda?: number;
}

export interface FinancialStatement {
	period: string; // "Q1", "Q2", "Q3", "Q4", "FY"
	year: number;
	revenue: number;
	expenses: number;
	profit: number;
	profitMargin: number;
	eps: number;
}

export interface Shareholding {
	promoter: number;
	fii: number; // Foreign Institutional Investors
	dii: number; // Domestic Institutional Investors
	public: number;
	others: number;
}

export interface StockChartData {
	date: string;
	price: number;
	volume: number;
}

export interface StockData {
	detail: StockDetail;
	prices: StockPrice[];
	fundamentals: FundamentalData;
	financialStatements: FinancialStatement[];
	shareholding: Shareholding;
	chartData: StockChartData[];
}

export interface WatchlistItem {
	symbol: string;
	name: string;
	addedAt: string;
}

