<script lang="ts">
	import * as Chart from "$lib/components/ui/chart/index.js";
	import { LineChart, Line, BarChart, Bar } from "layerchart";
	import { scaleUtc } from "d3-scale";
	import type { StockChartData, StockPrice } from "$lib/types/stock";

	let {
		prices,
		chartData,
		period = "1Y",
	}: {
		prices: StockPrice[];
		chartData: StockChartData[];
		period?: string;
	} = $props();

	const priceChartData = $derived(
		chartData.map((d) => ({
			date: new Date(d.date),
			price: d.price,
		}))
	);

	const volumeChartData = $derived(
		prices.map((p) => ({
			date: new Date(p.date),
			volume: p.volume,
		}))
	);

	const priceChartConfig = {
		price: {
			label: "Price",
			color: "#8CFF88",
		},
	} satisfies Chart.ChartConfig;

	const volumeChartConfig = {
		volume: {
			label: "Volume",
			color: "rgba(255, 255, 255, 0.3)",
		},
	} satisfies Chart.ChartConfig;

	function formatCurrency(value: number): string {
		return `₹${value.toFixed(2)}`;
	}

	function formatDate(date: Date): string {
		if (period === "1D") {
			return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
		}
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	}
</script>

<div class="flex flex-col gap-4">
	<!-- Price Chart -->
	<div class="rounded-lg border border-white/7 bg-white/3 p-4">
		<Chart.Container config={priceChartConfig} class="aspect-auto h-[300px] w-full">
			<LineChart
				data={priceChartData}
				x="date"
				xScale={scaleUtc()}
				series={[
					{
						key: "price",
						label: "Price",
						color: priceChartConfig.price.color,
					},
				]}
				props={{
					xAxis: {
						format: formatDate,
					},
					yAxis: {
						format: formatCurrency,
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={formatDate}
					>
						{#snippet formatter({ value })}
							{formatCurrency(value as number)}
						{/snippet}
					</Chart.Tooltip>
				{/snippet}
			</LineChart>
		</Chart.Container>
	</div>

	<!-- Volume Chart -->
	<div class="rounded-lg border border-white/7 bg-white/3 p-4">
		<Chart.Container config={volumeChartConfig} class="aspect-auto h-[150px] w-full">
			<BarChart
				data={volumeChartData}
				x="date"
				xScale={scaleUtc()}
				series={[
					{
						key: "volume",
						label: "Volume",
						color: volumeChartConfig.volume.color,
					},
				]}
				props={{
					bars: {
						motion: "tween",
					},
					xAxis: {
						format: formatDate,
					},
					yAxis: {
						format: (v) => {
							if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
							if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
							return v.toString();
						},
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={formatDate}
					>
						{#snippet formatter({ value })}
							{(() => {
								const vol = value as number;
								if (vol >= 1000000) return `${(vol / 1000000).toFixed(2)}M`;
								if (vol >= 1000) return `${(vol / 1000).toFixed(2)}K`;
								return vol.toString();
							})()}
						{/snippet}
					</Chart.Tooltip>
				{/snippet}
			</BarChart>
		</Chart.Container>
	</div>
</div>

