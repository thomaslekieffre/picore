<script lang="ts">
	import PicoContentAnimated from '$lib/components/PicoContentAnimated.svelte';

	let { data } = $props();
	let username = $derived(data.user.name || 'toi');
</script>

<svelte:head>
	<title>Bienvenue · picore</title>
</svelte:head>

<div class="min-h-dvh bg-papier">
	<header class="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
		<a href="/" class="font-display text-xl font-bold tracking-tight text-encre">picore</a>
		<a href="/" class="typo-corps font-semibold text-brume hover:text-encre">Sauter</a>
	</header>

	<main class="mx-auto max-w-5xl px-6 pb-16 pt-4">
		<div class="mx-auto mb-10 max-w-2xl text-center">
			<div class="mx-auto mb-6 w-36">
				<PicoContentAnimated class="w-full" />
			</div>
			<h1 class="typo-t1 text-encre">Salut @{username}, moi c’est Pico.</h1>
			<p class="typo-corps mx-auto mt-3 max-w-xl text-brume">
				Je picore les liens intéressants et je les garde au chaud. Voici quelques trucs à savoir :
			</p>
		</div>

		<div class="mb-12 grid gap-5 md:grid-cols-3">
			<section class="rounded-2xl border border-trait bg-carton p-6 text-left">
				<h2 class="typo-t3 mb-2 text-encre">Garde un lien</h2>
				<p class="typo-corps mb-4 text-brume">
					Colle une URL, Pico la range. Tu pourras la retrouver plus tard, taguée et lisible.
				</p>
				<div class="flex gap-2">
					<input
						class="typo-meta min-w-0 flex-1 rounded-lg border border-trait bg-papier px-3 py-2 outline-none focus:border-braise"
						placeholder="https://…"
						readonly
					/>
					<span
						class="typo-corps inline-flex items-center rounded-lg bg-braise px-3 py-2 font-semibold text-white"
					>
						Ajouter
					</span>
				</div>
			</section>

			<section class="rounded-2xl border border-trait bg-carton p-6 text-left">
				<h2 class="typo-t3 mb-2 text-encre">Garde le raccourci</h2>
				<p class="typo-corps mb-4 text-brume">
					Extension navigateur bientôt — un clic depuis n’importe quelle page pour picorer.
				</p>
				<button
					type="button"
					class="typo-corps rounded-lg bg-braise px-3 py-2 font-semibold text-white opacity-60"
					disabled
				>
					Bientôt
				</button>
			</section>

			<section class="rounded-2xl border border-trait bg-carton p-6 text-left">
				<h2 class="typo-t3 mb-2 text-encre">Organise tes favoris</h2>
				<p class="typo-corps mb-4 text-brume">
					Tags, couleurs, lus / non lus — Pico trie, toi tu retrouves.
				</p>
				<a
					href="/"
					class="typo-corps inline-flex rounded-lg bg-braise px-3 py-2 font-semibold text-white hover:bg-braise-hover"
				>
					Voir mon espace
				</a>
			</section>
		</div>

		<div class="mx-auto max-w-sm">
			<a
				href="/"
				class="typo-corps flex w-full items-center justify-center rounded-xl bg-braise px-4 py-3.5 font-semibold text-white transition hover:bg-braise-hover"
			>
				J’ajoute mon premier lien
			</a>
		</div>
	</main>
</div>
