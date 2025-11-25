import type { NewsItem, NewsDetail, Citation } from "$lib/types/news";

// Channel name mapping: config channel name -> mock data source name
const CHANNEL_MAPPING: Record<string, string> = {
	"CNBC News": "CNBC",
	"Twitter": "x.com",
	"Reddit Community": "Reddit",
	"Live Mint": "Live Mint",
	"Money Control": "Money Control",
	"Times Prime": "Times Prime",
	"Google Finance": "Google Finance",
};

// Mock news items with realistic Indian stock data
const MOCK_NEWS_ITEMS: NewsItem[] = [
	{
		id: "1",
		code: "TMPV",
		name: "Tata motors passenger vehicle",
		headline:
			"Company has spent 1.16% of its operating revenues towards interest expenses and 10.86% towards employee cost in the year",
		source: "x.com",
		cmp: 450,
		pe: 26.34,
		change: 2.5,
		changeTone: "positive",
		sector: "Automotive",
		confidence: "High",
		date: "2025-01-25",
	},
	{
		id: "2",
		code: "M&M",
		name: "Mahindra & Mahindra",
		headline:
			"Company has spent 1.16% of its operating revenues towards interest expenses and 10.86% towards employee cost in the year",
		source: "CNBC",
		cmp: 1250,
		pe: 26.34,
		change: -11.5,
		changeTone: "negative",
		sector: "Automotive",
		confidence: "High",
		date: "2025-01-25",
	},
	{
		id: "3",
		code: "RELIANCE",
		name: "Reliance Industries",
		headline: "Reliance announces major expansion in renewable energy sector with ₹50,000 crore investment",
		source: "Money Control",
		cmp: 2450,
		pe: 28.5,
		change: 3.2,
		changeTone: "positive",
		sector: "Energy",
		confidence: "High",
		date: "2025-01-25",
	},
	{
		id: "4",
		code: "TCS",
		name: "Tata Consultancy Services",
		headline: "TCS reports strong Q3 results with 12% YoY growth in revenue",
		source: "Live Mint",
		cmp: 3850,
		pe: 32.1,
		change: 1.8,
		changeTone: "positive",
		sector: "IT Services",
		confidence: "Medium",
		date: "2025-01-25",
	},
	{
		id: "5",
		code: "INFY",
		name: "Infosys",
		headline: "Infosys signs multi-year deal worth $500M with European client",
		source: "Times Prime",
		cmp: 1520,
		pe: 25.8,
		change: -2.1,
		changeTone: "negative",
		sector: "IT Services",
		confidence: "High",
		date: "2025-01-25",
	},
	{
		id: "6",
		code: "HDFCBANK",
		name: "HDFC Bank",
		headline: "HDFC Bank announces dividend of ₹19 per share for Q3",
		source: "Google Finance",
		cmp: 1650,
		pe: 18.5,
		change: 0.5,
		changeTone: "positive",
		sector: "Banking",
		confidence: "High",
		date: "2025-01-25",
	},
	{
		id: "7",
		code: "ICICIBANK",
		name: "ICICI Bank",
		headline: "ICICI Bank reports 15% growth in net profit, beats analyst expectations",
		source: "CNBC",
		cmp: 1120,
		pe: 16.8,
		change: 4.2,
		changeTone: "positive",
		sector: "Banking",
		confidence: "High",
		date: "2025-01-25",
	},
	{
		id: "8",
		code: "BAJFINANCE",
		name: "Bajaj Finance",
		headline: "Bajaj Finance expands digital lending portfolio with new fintech partnerships",
		source: "Money Control",
		cmp: 7250,
		pe: 35.2,
		change: -1.8,
		changeTone: "negative",
		sector: "Financial Services",
		confidence: "Medium",
		date: "2025-01-25",
	},
	{
		id: "9",
		code: "WIPRO",
		name: "Wipro",
		headline: "Wipro secures $200M cloud transformation deal from US healthcare client",
		source: "Live Mint",
		cmp: 485,
		pe: 22.4,
		change: 2.8,
		changeTone: "positive",
		sector: "IT Services",
		confidence: "High",
		date: "2025-01-25",
	},
];

const MOCK_CITATIONS: Record<string, Citation[]> = {
	"1": [
		{
			id: "c1-1",
			header: "Tata rolls out self-driving tech in China after BYD offers it for free",
			summary:
				"Tesla is rolling out self-driving features to some cars in China, per a software update log. It's not being called Full Self-Driving and Tesla is not offering all the FSD features as in the US.",
			channel: "x.com",
			date: "25th Nov 2025",
			time: "8:00 AM",
			sentiment: "Positive",
		},
		{
			id: "c1-2",
			header: "Tata Motors reports strong sales growth in passenger vehicle segment",
			summary:
				"Tata Motors has seen a significant increase in passenger vehicle sales, driven by strong demand for SUVs and electric vehicles in the Indian market.",
			channel: "CNBC",
			date: "24th Jan 2025",
			time: "2:30 PM",
			sentiment: "Positive",
		},
		{
			id: "c1-3",
			header: "Tata Motors announces new manufacturing facility",
			summary:
				"The company plans to invest ₹3,000 crore in a new state-of-the-art manufacturing facility to meet growing demand.",
			channel: "Money Control",
			date: "23rd Jan 2025",
			time: "10:15 AM",
			sentiment: "Positive",
		},
	],
	"2": [
		{
			id: "c2-1",
			header: "Mahindra & Mahindra faces supply chain challenges",
			summary:
				"The company is experiencing delays in component supplies, affecting production schedules for key models.",
			channel: "CNBC",
			date: "25th Jan 2025",
			time: "11:00 AM",
			sentiment: "Negative",
		},
		{
			id: "c2-2",
			header: "M&M stock drops on weak quarterly results",
			summary:
				"Shares fell after the company reported lower-than-expected margins due to increased raw material costs.",
			channel: "Live Mint",
			date: "24th Jan 2025",
			time: "4:45 PM",
			sentiment: "Negative",
		},
	],
	"7": [
		{
			id: "c7-1",
			header: "ICICI Bank Q3 results: Net profit jumps 15% to ₹10,272 crore",
			summary:
				"ICICI Bank reported a strong quarter with net profit rising 15% year-on-year, driven by robust loan growth and improved asset quality.",
			channel: "CNBC",
			date: "25th Jan 2025",
			time: "9:30 AM",
			sentiment: "Positive",
		},
		{
			id: "c7-2",
			header: "ICICI Bank announces expansion of branch network in rural areas",
			summary:
				"The bank plans to open 200 new branches in rural and semi-urban areas to expand its reach and support financial inclusion.",
			channel: "Money Control",
			date: "24th Jan 2025",
			time: "3:15 PM",
			sentiment: "Positive",
		},
	],
	"8": [
		{
			id: "c8-1",
			header: "Bajaj Finance partners with leading fintech startups",
			summary:
				"Bajaj Finance has entered into strategic partnerships with three fintech startups to expand its digital lending capabilities and reach new customer segments.",
			channel: "Money Control",
			date: "25th Jan 2025",
			time: "1:20 PM",
			sentiment: "Neutral",
		},
		{
			id: "c8-2",
			header: "Bajaj Finance stock under pressure amid rising competition",
			summary:
				"Shares declined as investors worry about increasing competition in the digital lending space and potential margin compression.",
			channel: "x.com",
			date: "24th Jan 2025",
			time: "5:00 PM",
			sentiment: "Negative",
		},
	],
	"9": [
		{
			id: "c9-1",
			header: "Wipro wins $200M cloud transformation contract",
			summary:
				"Wipro has secured a multi-year cloud transformation deal worth $200 million from a major US healthcare provider, marking one of its largest deals this quarter.",
			channel: "Live Mint",
			date: "25th Jan 2025",
			time: "10:45 AM",
			sentiment: "Positive",
		},
		{
			id: "c9-2",
			header: "Wipro strengthens AI capabilities with new acquisitions",
			summary:
				"The company announced plans to acquire two AI-focused startups to enhance its artificial intelligence and machine learning offerings.",
			channel: "Times Prime",
			date: "24th Jan 2025",
			time: "2:00 PM",
			sentiment: "Positive",
		},
	],
};

const MOCK_DETAILS: Record<string, NewsDetail> = {
	"1": {
		id: "1",
		code: "TMPV",
		name: "Tata motors passenger vehicle",
		summary:
			"Feb 25, 2025. U.S. carmaker Tesla will acquire parts of the insolvent German high-tech parts maker Manz AG, including more than 300 employees at its site in Reutlingen city in the southwest, the German company said on Tuesday.",
		marketImpact: {
			level: "Very Positive",
			percentage: 85,
		},
		expertReview: "Positive",
		changes: {
			"1D": 2.5,
			"1W": 5.2,
			"1M": 12.8,
			"1Y": 28.5,
		},
		investorMood: {
			bullish: 42,
			neutral: 32,
			bearish: 22,
		},
		dominantPhrase: "Buy quality large-caps on dips",
		citations: MOCK_CITATIONS["1"] || [],
	},
	"2": {
		id: "2",
		code: "M&M",
		name: "Mahindra & Mahindra",
		summary:
			"Mahindra & Mahindra reported weaker-than-expected quarterly results, with margins under pressure due to rising input costs and supply chain disruptions affecting production volumes.",
		marketImpact: {
			level: "Very Negative",
			percentage: 75,
		},
		expertReview: "Negative",
		changes: {
			"1D": -11.5,
			"1W": -8.2,
			"1M": -15.3,
			"1Y": -5.8,
		},
		investorMood: {
			bullish: 18,
			neutral: 25,
			bearish: 57,
		},
		dominantPhrase: "Caution advised on automotive stocks",
		citations: MOCK_CITATIONS["2"] || [],
	},
	"7": {
		id: "7",
		code: "ICICIBANK",
		name: "ICICI Bank",
		summary:
			"ICICI Bank reported exceptional Q3 results with net profit surging 15% year-on-year to ₹10,272 crore, driven by strong loan growth across retail and corporate segments. The bank's asset quality improved significantly with gross NPA ratio declining to 2.8%.",
		marketImpact: {
			level: "Very Positive",
			percentage: 80,
		},
		expertReview: "Positive",
		changes: {
			"1D": 4.2,
			"1W": 6.5,
			"1M": 11.2,
			"1Y": 22.8,
		},
		investorMood: {
			bullish: 55,
			neutral: 28,
			bearish: 17,
		},
		dominantPhrase: "Banking sector shows strong fundamentals",
		citations: MOCK_CITATIONS["7"] || [],
	},
	"8": {
		id: "8",
		code: "BAJFINANCE",
		name: "Bajaj Finance",
		summary:
			"Bajaj Finance announced strategic partnerships with leading fintech startups to expand its digital lending portfolio. However, concerns about increasing competition and potential margin compression have led to some investor caution.",
		marketImpact: {
			level: "Negative",
			percentage: 45,
		},
		expertReview: "Neutral",
		changes: {
			"1D": -1.8,
			"1W": -3.2,
			"1M": 2.5,
			"1Y": 18.5,
		},
		investorMood: {
			bullish: 32,
			neutral: 38,
			bearish: 30,
		},
		dominantPhrase: "Digital lending space getting competitive",
		citations: MOCK_CITATIONS["8"] || [],
	},
	"9": {
		id: "9",
		code: "WIPRO",
		name: "Wipro",
		summary:
			"Wipro secured a major $200 million cloud transformation contract from a US healthcare provider, marking one of its largest deals this quarter. The company also announced plans to strengthen its AI capabilities through strategic acquisitions.",
		marketImpact: {
			level: "Positive",
			percentage: 65,
		},
		expertReview: "Positive",
		changes: {
			"1D": 2.8,
			"1W": 4.5,
			"1M": 8.2,
			"1Y": 15.6,
		},
		investorMood: {
			bullish: 48,
			neutral: 35,
			bearish: 17,
		},
		dominantPhrase: "IT services sector continues to grow",
		citations: MOCK_CITATIONS["9"] || [],
	},
};

export async function fetchNews(
	channels: string[],
	date: string = new Date().toISOString().split("T")[0]
): Promise<NewsItem[]> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	// For mock data, return items with the selected date (ignore the hardcoded date)
	// In a real implementation, this would filter by the actual date from the database
	const itemsWithSelectedDate = MOCK_NEWS_ITEMS.map((item) => ({
		...item,
		date: date, // Use the requested date
	}));

	// Filter by enabled channels if provided
	if (channels.length > 0) {
		// Map config channel names to mock data source names
		const mappedSources = channels.map((channel) => CHANNEL_MAPPING[channel] || channel);
		return itemsWithSelectedDate.filter((item) => mappedSources.includes(item.source));
	}

	return itemsWithSelectedDate;
}

export async function fetchNewsDetail(id: string): Promise<NewsDetail | null> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	const detail = MOCK_DETAILS[id];
	if (detail) {
		return detail;
	}

	// Generate a default detail if not found
	const newsItem = MOCK_NEWS_ITEMS.find((item) => item.id === id);
	if (!newsItem) {
		return null;
	}

	return {
		id: newsItem.id,
		code: newsItem.code,
		name: newsItem.name,
		summary: newsItem.headline,
		marketImpact: {
			level: newsItem.changeTone === "positive" ? "Positive" : "Negative",
			percentage: Math.abs(newsItem.change) * 10,
		},
		expertReview: newsItem.changeTone === "positive" ? "Positive" : "Negative",
		changes: {
			"1D": newsItem.change,
			"1W": newsItem.change * 2,
			"1M": newsItem.change * 4,
			"1Y": newsItem.change * 10,
		},
		investorMood: {
			bullish: newsItem.changeTone === "positive" ? 45 : 20,
			neutral: 30,
			bearish: newsItem.changeTone === "negative" ? 50 : 25,
		},
		dominantPhrase: "Market sentiment reflects current trends",
		citations: MOCK_CITATIONS[id] || [],
	};
}

