<script lang="ts">
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import SEO from '@/components/seo.svelte';
	import Settings from '~icons/lucide/settings';

	function handleConfigure() {
		// Add your configuration logic here
		console.log('Configure clicked');
	}
</script>

<SEO
	title="Latest Financial News & AI Insights"
	description="Stay updated with the latest financial news, market trends, and AI-powered analysis. Polygram delivers expert coverage on stocks, investments, and global finance."
	image="/images/financial-news/ai-insights.webp" />

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar variant="inset" />
	<Sidebar.Inset>
		<!-- Header -->
		<header class="flex h-12 shrink-0 items-center justify-between border-b px-4">
			<h1 class="text-base font-semibold">News Tracker</h1>
			<Button variant="ghost" size="sm" class="gap-2">
				<Settings class="h-4 w-4" />
				Configure
			</Button>
		</header>

		<!-- Main Content -->
		<div class="flex flex-1 items-center justify-center bg-background">
			<div class="flex flex-col items-center gap-4 text-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted">
					<Settings class="h-6 w-6 text-muted-foreground" />
				</div>
				<div class="space-y-2">
					<h2 class="text-lg font-semibold">Configure Tracker to Get Started</h2>
					<p class="text-sm text-muted-foreground">
						Choose channels and markers to configure the source<br />and table properties
					</p>
				</div>
				<Button onclick={handleConfigure} class="gap-2">
					<Settings class="h-4 w-4" />
					Configure News Tracker
				</Button>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
