<script lang="ts">
	const modules = import.meta.glob('$lib/assets/icons/*.svg', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const byName = Object.fromEntries(
		Object.entries(modules).map(([path, raw]) => {
			const name = path.split('/').pop()!.replace('.svg', '');
			return [name, raw];
		})
	);

	let {
		name,
		class: className = 'size-5',
		title
	}: {
		name: string;
		class?: string;
		title?: string;
	} = $props();

	const raw = $derived(byName[name]);
</script>

{#if raw}
	<span
		class="inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full {className}"
		role={title ? 'img' : undefined}
		aria-label={title}
		aria-hidden={title ? undefined : true}
	>
		{@html raw}
	</span>
{:else if import.meta.env.DEV}
	<span class="typo-meta text-danger">?{name}</span>
{/if}
