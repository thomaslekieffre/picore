<script lang="ts">
	import PicoBird, { type PicoPose } from './PicoBird.svelte';
	import logoMark from '$lib/assets/brand/logo-mark-sur-braise.svg';
	import type { Snippet } from 'svelte';

	let {
		tagline,
		pose = 'repos',
		children
	}: {
		tagline: string;
		pose?: PicoPose;
		children: Snippet;
	} = $props();
</script>

<div class="auth-shell min-h-dvh lg:grid lg:grid-cols-2">
	<aside
		class="relative flex flex-col gap-7 overflow-hidden bg-braise px-8 py-10 lg:min-h-dvh lg:px-14 lg:py-14"
	>
		<a href="/" class="relative z-10 inline-flex items-center gap-3 text-white">
			<img src={logoMark} alt="" class="size-11 rounded-[13px]" width="44" height="44" />
			<span class="font-display text-[34px] font-bold leading-none tracking-[-0.03em]">picore</span>
		</a>

		<p
			class="relative z-10 font-display text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] whitespace-nowrap text-white"
		>
			{#each tagline.split('\n') as line, i}
				{#if i > 0}<br />{/if}{line}
			{/each}
		</p>

		<div
			class="pointer-events-none absolute right-5 bottom-6 z-0 w-44 sm:w-52 lg:w-[280px] [&_svg]:h-auto [&_svg]:w-full"
		>
			<PicoBird {pose} onAccent class="h-auto w-full" />
		</div>
	</aside>

	<main class="flex items-center justify-center bg-papier px-6 py-12 lg:px-16">
		<div class="w-full max-w-md">
			{@render children()}
		</div>
	</main>
</div>
