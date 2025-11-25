import type {
	StockData,
	StockDetail,
	StockPrice,
	FundamentalData,
	FinancialStatement,
	Shareholding,
	StockChartData,
} from "$lib/types/stock";

// Mock stock data for Indian stocks
// Note: Stock symbols should match the codes from news items
const MOCK_STOCK_DATA: Record<string, StockData> = {
	TMPV: {
		detail: {
			symbol: "TMPV",
			name: "Tata Motors Passenger Vehicle",
			currentPrice: 450.25,
			change: 2.5,
			changePercent: 0.56,
			previousClose: 447.75,
			marketCap: 14950000000000, // ₹14.95 lakh crores
			sector: "Automotive",
			industry: "Passenger Vehicles",
			exchange: "BSE",
			currency: "INR",
		},
		prices: generateMockPrices(450, 365),
		fundamentals: {
			peRatio: 26.34,
			pbRatio: 3.2,
			eps: 17.08,
			dividendYield: 0.8,
			beta: 1.45,
			revenue: 350000000000, // ₹35,000 crores
			profit: 85000000000, // ₹8,500 crores
			profitMargin: 24.3,
			grossMargin: 28.5,
			operatingMargin: 18.2,
			roe: 15.8,
			roce: 22.4,
			bookValue: 140.75,
			faceValue: 2,
		},
		financialStatements: [
			{ period: "Q1", year: 2024, revenue: 85000000000, expenses: 65000000000, profit: 20000000000, profitMargin: 23.5, eps: 4.2 },
			{ period: "Q2", year: 2024, revenue: 92000000000, expenses: 70000000000, profit: 22000000000, profitMargin: 23.9, eps: 4.6 },
			{ period: "Q3", year: 2024, revenue: 88000000000, expenses: 68000000000, profit: 20000000000, profitMargin: 22.7, eps: 4.2 },
			{ period: "Q4", year: 2024, revenue: 95000000000, expenses: 72000000000, profit: 23000000000, profitMargin: 24.2, eps: 4.8 },
			{ period: "FY", year: 2024, revenue: 350000000000, expenses: 275000000000, profit: 85000000000, profitMargin: 24.3, eps: 17.8 },
		],
		shareholding: {
			promoter: 46.5,
			fii: 18.2,
			dii: 12.8,
			public: 20.5,
			others: 2.0,
		},
		chartData: generateChartData(450, 365),
	},
	"M&M": {
		detail: {
			symbol: "M&M",
			name: "Mahindra & Mahindra",
			currentPrice: 1250.50,
			change: -11.5,
			changePercent: -0.91,
			previousClose: 1262.00,
			marketCap: 15200000000000, // ₹15.2 lakh crores
			sector: "Automotive",
			industry: "Automotive & Farm Equipment",
			exchange: "BSE",
			currency: "INR",
		},
		prices: generateMockPrices(1250, 365),
		fundamentals: {
			peRatio: 28.5,
			pbRatio: 4.1,
			eps: 43.86,
			dividendYield: 1.2,
			beta: 1.32,
			revenue: 420000000000, // ₹42,000 crores
			profit: 102000000000, // ₹10,200 crores
			profitMargin: 24.3,
			grossMargin: 30.2,
			operatingMargin: 19.5,
			roe: 18.5,
			roce: 25.8,
			bookValue: 305.12,
			faceValue: 5,
		},
		financialStatements: [
			{ period: "Q1", year: 2024, revenue: 100000000000, expenses: 76000000000, profit: 24000000000, profitMargin: 24.0, eps: 10.5 },
			{ period: "Q2", year: 2024, revenue: 110000000000, expenses: 83000000000, profit: 27000000000, profitMargin: 24.5, eps: 11.8 },
			{ period: "Q3", year: 2024, revenue: 105000000000, expenses: 80000000000, profit: 25000000000, profitMargin: 23.8, eps: 10.9 },
			{ period: "Q4", year: 2024, revenue: 115000000000, expenses: 87000000000, profit: 28000000000, profitMargin: 24.3, eps: 12.2 },
			{ period: "FY", year: 2024, revenue: 430000000000, expenses: 326000000000, profit: 104000000000, profitMargin: 24.2, eps: 45.4 },
		],
		shareholding: {
			promoter: 19.3,
			fii: 22.5,
			dii: 15.2,
			public: 41.0,
			others: 2.0,
		},
		chartData: generateChartData(1250, 365),
	},
	RELIANCE: {
		detail: {
			symbol: "RELIANCE",
			name: "Reliance Industries",
			currentPrice: 2450.75,
			change: 3.2,
			changePercent: 0.13,
			previousClose: 2447.55,
			marketCap: 165800000000000, // ₹16.58 lakh crores
			sector: "Energy",
			industry: "Oil & Gas Refining",
			exchange: "BSE",
			currency: "INR",
		},
		prices: generateMockPrices(2450, 365),
		fundamentals: {
			peRatio: 28.5,
			pbRatio: 2.8,
			eps: 85.96,
			dividendYield: 0.4,
			beta: 1.15,
			revenue: 8500000000000, // ₹8.5 lakh crores
			profit: 850000000000, // ₹85,000 crores
			profitMargin: 10.0,
			grossMargin: 18.5,
			operatingMargin: 12.2,
			roe: 12.5,
			roce: 15.8,
			bookValue: 875.25,
			faceValue: 10,
		},
		financialStatements: [
			{ period: "Q1", year: 2024, revenue: 2100000000000, expenses: 1890000000000, profit: 210000000000, profitMargin: 10.0, eps: 21.0 },
			{ period: "Q2", year: 2024, revenue: 2200000000000, expenses: 1980000000000, profit: 220000000000, profitMargin: 10.0, eps: 22.0 },
			{ period: "Q3", year: 2024, revenue: 2150000000000, expenses: 1935000000000, profit: 215000000000, profitMargin: 10.0, eps: 21.5 },
			{ period: "Q4", year: 2024, revenue: 2250000000000, expenses: 2025000000000, profit: 225000000000, profitMargin: 10.0, eps: 22.5 },
			{ period: "FY", year: 2024, revenue: 8700000000000, expenses: 7830000000000, profit: 870000000000, profitMargin: 10.0, eps: 87.0 },
		],
		shareholding: {
			promoter: 50.1,
			fii: 24.8,
			dii: 8.5,
			public: 15.1,
			others: 1.5,
		},
		chartData: generateChartData(2450, 365),
	},
};

function generateMockPrices(basePrice: number, days: number): StockPrice[] {
	const prices: StockPrice[] = [];
	const today = new Date();
	
	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(date.getDate() - i);
		
		// Generate realistic price variations
		const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
		const price = basePrice * (1 + variation);
		const high = price * (1 + Math.random() * 0.01);
		const low = price * (1 - Math.random() * 0.01);
		const open = price * (1 + (Math.random() - 0.5) * 0.005);
		const close = price;
		const volume = Math.floor(Math.random() * 5000000 + 1000000);
		
		prices.push({
			date: date.toISOString().split("T")[0],
			open: Math.round(open * 100) / 100,
			high: Math.round(high * 100) / 100,
			low: Math.round(low * 100) / 100,
			close: Math.round(close * 100) / 100,
			volume,
		});
	}
	
	return prices;
}

function generateChartData(basePrice: number, days: number): StockChartData[] {
	const data: StockChartData[] = [];
	const today = new Date();
	
	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(date.getDate() - i);
		
		const variation = (Math.random() - 0.5) * 0.02;
		const price = basePrice * (1 + variation);
		const volume = Math.floor(Math.random() * 5000000 + 1000000);
		
		data.push({
			date: date.toISOString().split("T")[0],
			price: Math.round(price * 100) / 100,
			volume,
		});
	}
	
	return data;
}

function calculate52WHighLow(prices: StockPrice[]): { high52W: number; low52W: number } {
	if (prices.length === 0) {
		return { high52W: 0, low52W: 0 };
	}
	
	// Get last 365 days of prices (52 weeks)
	const lastYearPrices = prices.slice(-365);
	
	const highs = lastYearPrices.map((p) => p.high);
	const lows = lastYearPrices.map((p) => p.low);
	
	return {
		high52W: Math.max(...highs),
		low52W: Math.min(...lows),
	};
}

function calculateAdditionalRatios(
	stockData: StockData
): {
	debtToEquity: number;
	currentRatio: number;
	quickRatio: number;
	priceToSales: number;
	evEbitda: number;
} {
	const { detail, fundamentals } = stockData;
	
	// Mock calculations - in real app, these would come from balance sheet data
	const marketCap = detail.marketCap;
	const revenue = fundamentals.revenue;
	const profit = fundamentals.profit;
	
	// Debt-to-Equity: Mock value based on industry average
	const debtToEquity = detail.sector === "Energy" ? 0.8 : 0.5;
	
	// Current Ratio: Mock value (typically 1.5-3.0 for healthy companies)
	const currentRatio = 2.1;
	
	// Quick Ratio: Mock value (typically 1.0-2.0)
	const quickRatio = 1.5;
	
	// Price-to-Sales: Market Cap / Revenue
	const priceToSales = revenue > 0 ? marketCap / revenue : 0;
	
	// EV/EBITDA: Mock value (typically 8-15 for Indian stocks)
	const evEbitda = 12.5;
	
	return {
		debtToEquity,
		currentRatio,
		quickRatio,
		priceToSales,
		evEbitda,
	};
}

export async function fetchStockData(symbol: string): Promise<StockData | null> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	const stockData = MOCK_STOCK_DATA[symbol.toUpperCase()];
	if (stockData) {
		// Calculate 52W high/low
		const { high52W, low52W } = calculate52WHighLow(stockData.prices);
		
		// Calculate additional ratios
		const additionalRatios = calculateAdditionalRatios(stockData);
		
		// Add calculated values to fundamentals
		const enrichedData: StockData = {
			...stockData,
			fundamentals: {
				...stockData.fundamentals,
				...additionalRatios,
			},
		};
		
		// Store 52W high/low in a way that can be accessed
		// We'll add them as properties on the detail object for easy access
		(enrichedData.detail as StockDetail & { high52W?: number; low52W?: number }).high52W = high52W;
		(enrichedData.detail as StockDetail & { high52W?: number; low52W?: number }).low52W = low52W;
		
		return enrichedData;
	}
	
	// Return default data if not found
	return null;
}

export async function fetchStockPrices(
	symbol: string,
	period: string = "1Y"
): Promise<StockPrice[]> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	
	const stockData = MOCK_STOCK_DATA[symbol.toUpperCase()];
	if (!stockData) {
		return [];
	}
	
	// Filter prices based on period
	const today = new Date();
	let days = 365; // Default to 1 year
	
	switch (period) {
		case "1D":
			days = 1;
			break;
		case "1W":
			days = 7;
			break;
		case "1M":
			days = 30;
			break;
		case "3M":
			days = 90;
			break;
		case "YTD":
			days = today.getDay() + (today.getMonth() * 30);
			break;
		case "1Y":
			days = 365;
			break;
		case "5Y":
			days = 1825;
			break;
		case "All":
			days = 3650; // 10 years
			break;
	}
	
	return stockData.prices.slice(-days);
}

