<script lang="ts">
	import { authClient } from '$lib/auth-client';

	const session = authClient.useSession();
</script>

<main class="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16">
	{#if $session.isPending}
		<p class="typo-corps text-brume">Chargement…</p>
	{:else if $session.data}
		<p class="typo-meta mb-2 font-medium text-braise">Connecté</p>
		<h1 class="typo-t1 mb-4 text-encre">Salut {$session.data.user.name}</h1>
		<p class="typo-meta mb-8 text-brume">{$session.data.user.email}</p>
		<div class="flex flex-wrap gap-3">
			<a
				href="/onboarding"
				class="typo-corps rounded-xl bg-braise px-4 py-3 font-semibold text-white hover:bg-braise-hover"
			>
				Revoir l’onboarding
			</a>
			<button
				type="button"
				class="typo-corps rounded-xl border border-trait bg-carton px-4 py-3 font-semibold text-encre"
				onclick={() => authClient.signOut()}
			>
				Se déconnecter
			</button>
		</div>
	{:else}
		<a href="/" class="font-display mb-6 text-3xl font-bold tracking-tight text-encre">picore</a>
		<p class="typo-corps mb-8 max-w-md text-lg text-brume">Ce que tu picores, Pico le garde.</p>
		<div class="flex flex-wrap gap-3">
			<a
				href="/login"
				class="typo-corps rounded-xl bg-braise px-5 py-3 font-semibold text-white hover:bg-braise-hover"
			>
				Se connecter
			</a>
			<a
				href="/register"
				class="typo-corps rounded-xl border border-trait bg-carton px-5 py-3 font-semibold text-encre"
			>
				Créer un compte
			</a>
		</div>
	{/if}
</main>
