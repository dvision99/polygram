<script lang="ts">
	import { onMount } from "svelte";
	import Bookmark from "~icons/lucide/bookmark";
	import BookmarkCheck from "~icons/lucide/bookmark-check";
	import { isInWatchlist, addToWatchlist, removeFromWatchlist } from "$lib/services/watchlist-service";

	let { symbol, name }: { symbol: string; name: string } = $props();

	let inWatchlist = $state(false);
	let loading = $state(false);

	onMount(() => {
		inWatchlist = isInWatchlist(symbol);
	});

	async function toggleWatchlist() {
		loading = true;
		try {
			if (inWatchlist) {
				removeFromWatchlist(symbol);
				await fetch("/api/watchlist", {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ symbol }),
				});
				inWatchlist = false;
			} else {
				addToWatchlist(symbol, name);
				await fetch("/api/watchlist", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ symbol, name }),
				});
				inWatchlist = true;
			}
			// Trigger watchlist update event
			window.dispatchEvent(new CustomEvent("watchlist-updated"));
		} catch (error) {
			console.error("Error updating watchlist:", error);
		} finally {
			loading = false;
		}
	}
</script>

<button
	type="button"
	onclick={toggleWatchlist}
	disabled={loading}
	class={`flex items-center gap-2 rounded border px-3 py-2 text-sm font-medium transition ${
		inWatchlist
			? "border-white/7 bg-[rgba(0,143,29,0.18)] text-[rgba(140,255,136,0.7)]"
			: "border-white/7 bg-white/4 text-white/70 hover:bg-white/8"
	} disabled:opacity-50`}
	aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
>
	{#if inWatchlist}
		<BookmarkCheck class="size-4" />
		<span>In Watchlist</span>
	{:else}
		<Bookmark class="size-4" />
		<span>Add to Watchlist</span>
	{/if}
</button>

