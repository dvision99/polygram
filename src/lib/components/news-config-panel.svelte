<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
	import Settings from "~icons/lucide/settings";
	import CheckCircle from "~icons/lucide/check-circle-2";
	import PlusCircle from "~icons/lucide/plus-circle";
	import Search from "~icons/lucide/search";
	import type { TrackerConfig, TableColumn, UpdateFrequency } from "$lib/types/news";
	import { getDefaultConfig } from "$lib/services/config-service";

	let { open = $bindable(false), config = $bindable<TrackerConfig>() }: {
		open?: boolean;
		config: TrackerConfig;
	} = $props();

	const allChannels = [
		"CNBC News",
		"Twitter",
		"Reddit Community",
		"Live Mint",
		"Money Control",
		"Times Prime",
		"Google Finance",
	];

	const allColumns: TableColumn[] = [
		"52W all time low",
		"Market Cap",
		"Rational for News",
		"PE",
		"Source of News",
		"CMP",
		"1D change",
		"News Headlines",
		"ROCE",
		"ROE",
		"1W change",
		"1M change",
		"6M change",
		"1Y change",
		"Industry/Sector",
		"News Impression",
		"Confidence Level",
	];

	let searchQuery = $state("");

	const filteredColumns = $derived(
		searchQuery
			? allColumns.filter((col) =>
					col.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: allColumns
	);

	function toggleChannel(channelName: string) {
		const channel = config.channels.find((c) => c.name === channelName);
		if (channel) {
			channel.enabled = !channel.enabled;
		}
	}

	function toggleColumn(column: TableColumn) {
		const index = config.tableConfig.selectedColumns.indexOf(column);
		if (index > -1) {
			config.tableConfig.selectedColumns = config.tableConfig.selectedColumns.filter(
				(c) => c !== column
			);
		} else {
			config.tableConfig.selectedColumns = [...config.tableConfig.selectedColumns, column];
		}
	}

	async function handleSave() {
		try {
			const response = await fetch("/api/config", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(config),
			});

			if (response.ok) {
				open = false;
				// Trigger a custom event to refresh news
				window.dispatchEvent(new CustomEvent("config-updated"));
			}
		} catch (error) {
			console.error("Error saving config:", error);
		}
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Content
		side="right"
		class="w-full max-w-lg border border-white/7 bg-[#171717] text-white sm:max-w-lg"
	>
		<!-- Header -->
		<Sheet.Header class="flex items-start justify-between border-b border-white/7 px-4 pb-4 pt-4">
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-2">
					<Settings class="size-[18px] text-white" />
					<Sheet.Title class="text-base font-medium leading-normal text-white">
						Configure News Tracker
					</Sheet.Title>
				</div>
				<Sheet.Description class="text-sm leading-normal text-[#b5b5b5]">
					Choose channels and markers to configure the source and table properties
				</Sheet.Description>
			</div>
		</Sheet.Header>

		<!-- Content -->
		<div class="flex max-h-[calc(100vh-200px)] flex-col gap-9 overflow-y-auto px-4 py-0">
			<!-- Channels Section -->
			<div class="flex flex-col gap-4">
				<div class="flex h-[30px] items-center px-2">
					<p class="text-xs font-medium leading-[12px] text-[#91918e]">Channels</p>
				</div>
				<div class="flex flex-wrap gap-[13px]">
					{#each allChannels as channelName}
						{@const channel = config.channels.find((c) => c.name === channelName)}
						{@const isEnabled = channel?.enabled ?? false}
						<button
							type="button"
							onclick={() => toggleChannel(channelName)}
							class={`flex cursor-pointer items-center gap-1 rounded border px-[10px] py-2 ${
								isEnabled
									? "border-white/7 bg-[rgba(0,143,29,0.18)] text-[rgba(140,255,136,0.7)]"
									: "border-white/7 bg-white/4 text-white/70"
							}`}
						>
							{#if isEnabled}
								<CheckCircle class="size-[10.667px] text-[#8CFF88]" />
							{:else}
								<PlusCircle class="size-[10.667px] text-white" />
							{/if}
							<span class="text-sm font-medium leading-normal">{channelName}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Table Configurations Section -->
			<div class="flex flex-col gap-4">
				<div class="flex h-[30px] items-center px-2">
					<p class="text-xs font-medium leading-[12px] text-[#91918e]">Table Configurations</p>
				</div>
				<div class="flex flex-col gap-4">
					<!-- Search Input -->
					<div class="flex items-center rounded-[6px] bg-white/3 px-2 py-1.5">
						<div class="flex h-[22px] w-7 items-center gap-2.5 pl-0 pr-2">
							<Search class="size-[10.667px] text-white" />
						</div>
						<div class="flex flex-1 items-center min-w-0 pl-0 pr-1.5">
							<input
								bind:value={searchQuery}
								type="text"
								placeholder="Search"
								class="w-full min-w-0 border-0 bg-transparent text-sm font-medium tracking-[-0.56px] text-white placeholder:text-white/70 focus:outline-none"
							/>
						</div>
						<div class="flex h-[22px] w-7 items-center justify-end"></div>
					</div>
					<!-- Column Buttons -->
					<div class="flex flex-wrap gap-[13px]">
						{#each filteredColumns as column}
							{@const isSelected = config.tableConfig.selectedColumns.includes(column)}
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

			<!-- Update Frequency Section -->
			<div class="flex flex-col gap-4">
				<div class="flex h-[30px] items-center px-2">
					<p class="text-xs font-medium leading-[12px] text-[#91918e]">Update Frequency</p>
				</div>
				<RadioGroup.Root
					bind:value={config.updateFrequency}
					class="flex flex-col gap-6"
				>
					<div class="flex gap-6">
						<label
							for="freq-30min"
							class="flex cursor-pointer items-center gap-2"
						>
							<RadioGroup.Item value="Every 30 min" id="freq-30min" />
							<span class="text-sm font-medium text-white">Every 30 min</span>
						</label>
						<label
							for="freq-daily"
							class="flex cursor-pointer items-center gap-2"
						>
							<RadioGroup.Item value="Daily 8 am" id="freq-daily" />
							<span class="text-sm font-medium text-white">Daily 8 am</span>
						</label>
					</div>
					<div class="flex items-center gap-2">
						<label
							for="freq-5min"
							class="flex cursor-pointer items-center gap-2"
						>
							<RadioGroup.Item value="Every 5 min" id="freq-5min" />
							<span class="text-sm font-medium text-white">Every 5 min</span>
						</label>
						<span class="rounded-md bg-[#db6e00] px-[9px] py-0 text-sm font-medium leading-[1.2] text-white tracking-[-0.56px]">
							Pro
						</span>
					</div>
				</RadioGroup.Root>
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
