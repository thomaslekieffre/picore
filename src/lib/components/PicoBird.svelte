<script lang="ts">
	import picoReposUrl from '$lib/assets/pico/pico-repos.svg';
	import picoContentUrl from '$lib/assets/pico/pico-content.svg';
	import picoEndormiUrl from '$lib/assets/pico/pico-endormi.svg';
	import picoChercheUrl from '$lib/assets/pico/pico-cherche.svg';
	import picoPerplexeUrl from '$lib/assets/pico/pico-perplexe.svg';
	import picoFeteUrl from '$lib/assets/pico/pico-fete.svg';
	import picoReposSombreUrl from '$lib/assets/pico/pico-repos-sombre.svg';

	import picoReposRaw from '$lib/assets/pico/pico-repos.svg?raw';

	export type PicoPose =
		| 'repos'
		| 'content'
		| 'endormi'
		| 'cherche'
		| 'perplexe'
		| 'fete'
		| 'repos-sombre';

	const urlByPose: Record<PicoPose, string> = {
		repos: picoReposUrl,
		content: picoContentUrl,
		endormi: picoEndormiUrl,
		cherche: picoChercheUrl,
		perplexe: picoPerplexeUrl,
		fete: picoFeteUrl,
		'repos-sombre': picoReposSombreUrl
	};

	let {
		pose = 'repos',
		/** Sur fond braise (auth) : bec/pattes carton comme les maquettes Login */
		onAccent = false,
		class: className = '',
		title = 'Pico, la mascotte'
	}: {
		pose?: PicoPose;
		onAccent?: boolean;
		class?: string;
		title?: string;
	} = $props();

	const accentSvg = $derived(
		picoReposRaw
			.replaceAll('fill="#D2400C"', 'fill="#FBF9F4"')
			.replaceAll('stroke="#D2400C"', 'stroke="#FBF9F4"')
	);
</script>

{#if onAccent && pose === 'repos'}
	<span
		class="inline-flex {className}"
		role="img"
		aria-label={title}
	>
		{@html accentSvg}
	</span>
{:else}
	<img src={urlByPose[pose]} alt={title} class={className} width="200" height="200" />
{/if}
