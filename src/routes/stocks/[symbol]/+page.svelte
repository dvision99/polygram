<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import SEO from "@/components/seo.svelte";
	import StockChart from "$lib/components/stock-chart.svelte";
	import WatchlistButton from "$lib/components/watchlist-button.svelte";
	import ArrowLeft from "~icons/lucide/arrow-left";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import { BarChart, Bar, AreaChart, Area } from "layerchart";
	import { scaleUtc } from "d3-scale";
	import type { StockData } from "$lib/types/stock";

	const gradientBackground =
		"radial-gradient(circle at 25% 10%, rgba(255,255,255,0.08), rgba(8,8,8,0.9)), linear-gradient(135deg, #040404 0%, #0E0E0E 45%, #020202 100%)";

	let stockData = $state<StockData | null>(null);
	let loading = $state(true);
	let selectedPeriod = $state("1Y");

	const symbol = $derived($page.params.symbol?.toUpperCase() || "");

	const periods = [
		{ value: "1D", label: "1D" },
		{ value: "1W", label: "1W" },
		{ value: "1M", label: "1M" },
		{ value: "3M", label: "3M" },
		{ value: "YTD", label: "YTD" },
		{ value: "1Y", label: "1Y" },
		{ value: "5Y", label: "5Y" },
		{ value: "All", label: "All" },
	];

	const revenueChartData = $derived(
		stockData?.financialStatements
			.filter((f) => f.period === "Q1" || f.period === "Q2" || f.period === "Q3" || f.period === "Q4")
			.map((f) => ({
				period: `${f.period} ${f.year}`,
				revenue: f.revenue / 10000000, // Convert to crores
			})) || []
	);

	const revenueChartConfig = {
		revenue: {
			label: "Revenue",
			color: "#8CFF88",
		},
	} satisfies Chart.ChartConfig;

	async function fetchStockData() {
		loading = true;
		try {
			const response = await fetch(`/api/stocks/${symbol}`);
			const result = await response.json();

			if (result.success) {
				stockData = result.data;
			}
		} catch (error) {
			console.error("Error fetching stock data:", error);
		} finally {
			loading = false;
		}
	}

	function formatCurrency(value: number): string {
		if (value >= 10000000) {
			return `₹${(value / 10000000).toFixed(2)}Cr`;
		}
		if (value >= 100000) {
			return `₹${(value / 100000).toFixed(2)}L`;
		}
		return `₹${value.toLocaleString()}`;
	}

	function formatLargeNumber(value: number): string {
		if (value >= 1000000000000) {
			return `₹${(value / 1000000000000).toFixed(2)}L Cr`;
		}
		if (value >= 10000000) {
			return `₹${(value / 10000000).toFixed(2)}Cr`;
		}
		return `₹${value.toLocaleString()}`;
	}

	onMount(() => {
		fetchStockData();
	});
</script>

<SEO
	title="{stockData?.detail.name || 'Stock Details'} - Polygram"
	description="View comprehensive stock details, charts, and financial data for {stockData?.detail.name || 'this stock'}"
/>

<main class="min-h-screen text-white" style={`background:${gradientBackground};`}>
	<div class="mx-auto flex min-h-screen max-w-[1512px] flex-col">
		<!-- Header -->
		<header class="flex items-center justify-between border-b border-white/7 px-4 py-4 md:px-8">
			<div class="flex items-center gap-4">
				<a
					href="/"
					class="flex size-10 items-center justify-center rounded-lg border border-white/7 bg-white/4 text-white/70 transition hover:bg-white/8"
					aria-label="Go back"
				>
					<ArrowLeft class="size-4" />
				</a>
				{#if stockData}
					<div class="flex items-center gap-3">
						<div class="flex size-10 items-center justify-center rounded border border-white/7 bg-white/4 text-lg font-semibold text-white">
							{stockData.detail.symbol.charAt(0)}
						</div>
						<div>
							<h1 class="text-xl font-semibold text-white">{stockData.detail.symbol}</h1>
							<p class="text-sm text-white/70">{stockData.detail.name}</p>
						</div>
					</div>
				{:else if loading}
					<div class="text-white/70">Loading...</div>
				{:else}
					<div class="text-white/70">Stock not found</div>
				{/if}
			</div>
			{#if stockData}
				<WatchlistButton symbol={stockData.detail.symbol} name={stockData.detail.name} />
			{/if}
		</header>

		{#if loading}
			<div class="flex flex-1 items-center justify-center">
				<p class="text-white/70">Loading stock data...</p>
			</div>
		{:else if !stockData}
			<div class="flex flex-1 items-center justify-center">
				<p class="text-white/70">Stock not found</p>
			</div>
		{:else}
			<div class="flex flex-1 flex-col gap-6 px-4 py-6 md:px-8">
				<!-- Price and Change -->
				<div class="flex items-baseline gap-4">
					<div>
						<p class="text-3xl font-semibold text-white">
							{formatCurrency(stockData.detail.currentPrice)}
						</p>
						<p class="text-sm text-white/50">
							{stockData.detail.exchange} • {stockData.detail.currency}
						</p>
					</div>
					<div
						class={`text-lg font-semibold ${
							stockData.detail.change >= 0 ? "text-[#8CFF88]" : "text-[#FFA8A8]"
						}`}
					>
						{stockData.detail.change >= 0 ? "+" : ""}
						{stockData.detail.change.toFixed(2)} ({stockData.detail.changePercent.toFixed(2)}%)
					</div>
					<div class="text-sm text-white/50">
						Previous Close: {formatCurrency(stockData.detail.previousClose)}
					</div>
				</div>

				<!-- Period Selector -->
				<div class="flex flex-wrap gap-2">
					{#each periods as period}
						<button
							type="button"
							onclick={() => (selectedPeriod = period.value)}
							class={`rounded border px-3 py-1.5 text-sm font-medium transition ${
								selectedPeriod === period.value
									? "border-white/7 bg-[rgba(0,143,29,0.18)] text-[rgba(140,255,136,0.7)]"
									: "border-white/7 bg-white/4 text-white/70 hover:bg-white/8"
							}`}
						>
							{period.label}
						</button>
					{/each}
				</div>

				<!-- Stock Chart -->
				<StockChart
					prices={stockData.prices}
					chartData={stockData.chartData}
					period={selectedPeriod}
				/>

				<!-- Key Metrics Grid -->
				<div class="flex flex-col gap-4">
					<div class="flex h-[30px] items-center px-2">
						<p class="text-xs font-medium leading-[12px] text-[#91918e]">Key Metrics</p>
					</div>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">Market Cap</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{formatLargeNumber(stockData.detail.marketCap)}
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">P/E Ratio</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.fundamentals.peRatio.toFixed(2)}
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">P/B Ratio</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.fundamentals.pbRatio.toFixed(2)}
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">EPS</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{formatCurrency(stockData.fundamentals.eps)}
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">Revenue</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{formatLargeNumber(stockData.fundamentals.revenue)}
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">Profit Margin</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.fundamentals.profitMargin.toFixed(2)}%
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">ROE</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.fundamentals.roe.toFixed(2)}%
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">ROCE</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.fundamentals.roce.toFixed(2)}%
							</p>
						</div>
					</div>
				</div>

				<!-- Revenue Chart -->
				<div class="flex flex-col gap-4">
					<div class="flex h-[30px] items-center px-2">
						<p class="text-xs font-medium leading-[12px] text-[#91918e]">Quarterly Revenue</p>
					</div>
					<div class="rounded-lg border border-white/7 bg-white/3 p-4">
						<Chart.Container config={revenueChartConfig} class="aspect-auto h-[250px] w-full">
							<BarChart
								data={revenueChartData}
								x="period"
								series={[
									{
										key: "revenue",
										label: "Revenue (Cr)",
										color: revenueChartConfig.revenue.color,
									},
								]}
								props={{
									bars: {
										motion: "tween",
									},
									xAxis: {
										format: (v) => v as string,
									},
									yAxis: {
										format: (v) => `₹${(v as number).toFixed(0)}Cr`,
									},
								}}
							>
								{#snippet tooltip()}
									<Chart.Tooltip
										labelFormatter={(v) => v as string}
									>
										{#snippet formatter({ value })}
											{`₹${((value as number) * 10).toFixed(2)}Cr`}
										{/snippet}
									</Chart.Tooltip>
								{/snippet}
							</BarChart>
						</Chart.Container>
					</div>
				</div>

				<!-- Financial Statements Table -->
				<div class="flex flex-col gap-4">
					<div class="flex h-[30px] items-center px-2">
						<p class="text-xs font-medium leading-[12px] text-[#91918e]">Financial Statements</p>
					</div>
					<div class="overflow-x-auto rounded-lg border border-white/7 bg-black/70">
						<table class="w-full min-w-[600px] border-separate border-spacing-0 text-sm">
							<thead class="text-xs uppercase tracking-[0.08em] text-white/50">
								<tr>
									<th class="border-b border-white/7 px-4 py-3 text-left font-medium">Period</th>
									<th class="border-b border-white/7 px-4 py-3 text-right font-medium">Revenue</th>
									<th class="border-b border-white/7 px-4 py-3 text-right font-medium">Expenses</th>
									<th class="border-b border-white/7 px-4 py-3 text-right font-medium">Profit</th>
									<th class="border-b border-white/7 px-4 py-3 text-right font-medium">Profit Margin</th>
									<th class="border-b border-white/7 px-4 py-3 text-right font-medium">EPS</th>
								</tr>
							</thead>
							<tbody>
								{#each stockData.financialStatements as statement}
									<tr class="border-b border-white/5 last:border-b-0">
										<td class="px-4 py-3 text-white">
											{statement.period} {statement.year}
										</td>
										<td class="px-4 py-3 text-right text-white/80">
											{formatLargeNumber(statement.revenue)}
										</td>
										<td class="px-4 py-3 text-right text-white/80">
											{formatLargeNumber(statement.expenses)}
										</td>
										<td class="px-4 py-3 text-right text-white/80">
											{formatLargeNumber(statement.profit)}
										</td>
										<td class="px-4 py-3 text-right text-white/80">
											{statement.profitMargin.toFixed(2)}%
										</td>
										<td class="px-4 py-3 text-right text-white/80">
											{formatCurrency(statement.eps)}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<!-- Shareholding -->
				<div class="flex flex-col gap-4">
					<div class="flex h-[30px] items-center px-2">
						<p class="text-xs font-medium leading-[12px] text-[#91918e]">Shareholding Pattern</p>
					</div>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-5">
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">Promoter</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.shareholding.promoter.toFixed(1)}%
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">FII</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.shareholding.fii.toFixed(1)}%
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">DII</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.shareholding.dii.toFixed(1)}%
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">Public</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.shareholding.public.toFixed(1)}%
							</p>
						</div>
						<div class="rounded border border-white/7 bg-white/4 p-4">
							<p class="text-xs text-white/50">Others</p>
							<p class="mt-1 text-lg font-semibold text-white">
								{stockData.shareholding.others.toFixed(1)}%
							</p>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>

