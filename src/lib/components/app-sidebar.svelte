<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import ChartLineIcon from '~icons/lucide/chart-line';
	import NewspaperIcon from '~icons/lucide/newspaper';

	const data = {
		navMain: [
			 
			{
				title: "News tracker",
				url: "/dashboard",
				icon: NewspaperIcon,
				isActive: true,
			},
		],
	};

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:p-1.5!">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<ChartLineIcon class="size-5!" />
							<span class="text-base font-semibold">Polygram</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each data.navMain as item (item.title)}
						{@const Icon = item.icon}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton 
								isActive={item.isActive}
								tooltipContent={item.title}
							>
								{#snippet child({ props })}
									<a {...props} href={item.url}>
										<Icon class="h-4 w-4" />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
