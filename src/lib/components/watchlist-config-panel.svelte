<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import Settings from "~icons/lucide/settings";
	import CheckCircle from "~icons/lucide/check-circle-2";
	import PlusCircle from "~icons/lucide/plus-circle";
	import Search from "~icons/lucide/search";
	import type { WatchlistTableConfig, WatchlistTableColumn } from "$lib/types/watchlist";
	import { getDefaultWatchlistConfig, saveWatchlistConfig } from "$lib/services/watchlist-config-service";

	let { open = $bindable(false), config = $bindable<WatchlistTableConfig>() }: {
		open?: boolean;
		config: WatchlistTableConfig;
	} = $props();

	const allColumns: WatchlistTableColumn[] = [
		"Current Price (CMP)",
		"Change",
		"Change %",
		"Market Cap",
		"P/E Ratio",
		"P/B Ratio",
		"EPS",
		"ROE",
		"ROCE",
		"Revenue",
		"Profit Margin",
		"Promoter %",
		"FII %",
		"DII %",
		"Public %",
		"Sector",
		"Industry",
		"Book Value",
		"Face Value",
		"Dividend Yield",
		"Beta",
		"52W High",
		"52W Low",
		"Volume",
		"Debt-to-Equity Ratio",
		"Current Ratio",
		"Quick Ratio",
		"Price-to-Sales Ratio",
		"EV/EBITDA",
	];

	let searchQuery = $state("");

	const filteredColumns = $derived(
		searchQuery
			? allColumns.filter((col) =>
					col.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: allColumns
	);

	function toggleColumn(column: WatchlistTableColumn) {
		const index = config.selectedColumns.indexOf(column);
		if (index > -1) {
			config.selectedColumns = config.selectedColumns.filter((c) => c !== column);
		} else {
			config.selectedColumns = [...config.selectedColumns, column];
		}
	}

	async function handleSave() {
		try {
			// Save to localStorage first (this ensures it's saved immediately)
			saveWatchlistConfig(config);
			
			// Then save via API (for server-side persistence if needed)
			const response = await fetch("/api/watchlist-config", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(config),
			});

			if (response.ok) {
				open = false;
				// Trigger a custom event to refresh watchlist table
				// The config is already updated via $bindable, but we dispatch event to ensure reactivity
				window.dispatchEvent(new CustomEvent("watchlist-config-updated"));
			}
		} catch (error) {
			console.error("Error saving watchlist config:", error);
		}
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Content
		side="right"
		class="w-full max-w-lg border border-white/7 bg-[#171717] text-white sm:max-w-lg [&>button]:!hidden"
	>
		<!-- Header -->
		<Sheet.Header class="flex items-start justify-between border-b border-white/7 px-4 pb-4 pt-4">
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-2">
					<Settings class="size-[18px] text-white" />
					<Sheet.Title class="text-base font-medium leading-normal text-white">
						Configure Watchlist
					</Sheet.Title>
				</div>
				<Sheet.Description class="text-sm leading-normal text-[#b5b5b5]">
					Choose columns to display in the watchlist table
				</Sheet.Description>
			</div>
		</Sheet.Header>

		<!-- Content -->
		<div class="flex max-h-[calc(100vh-200px)] flex-col gap-9 overflow-y-auto px-4 py-0">
			<!-- Table Configurations Section -->
			<div class="flex flex-col gap-4">
				<div class="flex h-[30px] items-center px-2">
					<p class="text-xs font-medium leading-[12px] text-[#91918e]">Table Configurations</p>
				</div>
				<div class="flex flex-col gap-4">
					<!-- Search Input -->
					<div class="flex items-center rounded-[6px] bg-white/3 px-2 py-1.5">
						<Search class="size-[10.667px] text-white" />
						<input
							bind:value={searchQuery}
							placeholder="Search"
							class="flex-1 border-0 bg-transparent px-2 text-sm font-medium text-white placeholder:text-white/70 focus:outline-none"
						/>
					</div>
					<!-- Column Buttons -->
					<div class="flex flex-wrap gap-[13px]">
						{#each filteredColumns as column}
							{@const isSelected = config.selectedColumns.includes(column)}
							<button
								type="button"
								onclick={() => toggleColumn(column)}
								class={`flex cursor-pointer items-center gap-1 rounded border px-[10px] py-2 ${
									isSelected
										? "border-white/7 bg-[rgba(0,143,29,0.18)] text-[rgba(140,255,136,0.7)]"
										: "border-white/7 bg-white/4 text-white/70"
								}`}
							>
								{#if isSelected}
									<CheckCircle class="size-[10.667px] text-[#8CFF88]" />
								{:else}
									<PlusCircle class="size-[10.667px] text-white" />
								{/if}
								<span class="text-sm font-medium leading-normal">{column}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<Sheet.Footer class="flex flex-1 flex-col items-start justify-end gap-2.5 border-t border-white/7 px-4 pt-4">
			<Button
				onclick={handleSave}
				class="w-full bg-white text-[#171717] hover:bg-white/90"
			>
				<span class="text-sm font-medium leading-normal">Save & Update</span>
			</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>

