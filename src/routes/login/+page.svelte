<script lang="ts">
	import AuthShell from '$lib/components/AuthShell.svelte';
	import AuthField from '$lib/components/AuthField.svelte';
	import AuthButton from '$lib/components/AuthButton.svelte';
	import MagicLinkSent from '$lib/components/MagicLinkSent.svelte';
	import { authClient } from '$lib/auth-client';
	import { browser } from '$app/environment';

	let email = $state('');
	let sent = $state(false);
	let errorMsg = $state('');
	let unknownEmail = $state(false);
	let magicUrl = $state<string | null>(null);
	let loading = $state(false);

	async function envoyer(e: SubmitEvent) {
		e.preventDefault();
		errorMsg = '';
		unknownEmail = false;
		magicUrl = null;
		loading = true;

		try {
			const check = await fetch(`/api/auth/check?email=${encodeURIComponent(email.trim().toLowerCase())}`);
			if (!check.ok) {
				errorMsg = 'Impossible de vérifier cet e-mail';
				return;
			}
			const { emailTaken } = (await check.json()) as { emailTaken: boolean };

			if (!emailTaken) {
				unknownEmail = true;
				return;
			}

			const { error } = await authClient.signIn.magicLink({
				email: email.trim().toLowerCase(),
				callbackURL: '/',
				errorCallbackURL: '/login'
			});

			if (error) {
				errorMsg = error.message ?? 'Erreur';
				return;
			}

			sent = true;

			if (browser && import.meta.env.DEV) {
				const res = await fetch(
					`/api/dev/last-magic-link?email=${encodeURIComponent(email.trim().toLowerCase())}`
				);
				if (res.ok) {
					const data = (await res.json()) as { url: string | null };
					magicUrl = data.url;
				}
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Connexion · picore</title>
</svelte:head>

<AuthShell tagline={"Ce que tu picores,\nPico le garde."} pose="repos">
	{#if sent}
		<MagicLinkSent {email} {magicUrl} />
	{:else}
		<div class="space-y-8">
			<header class="space-y-2">
				<h1 class="typo-t1 text-encre">Content de te revoir</h1>
				<p class="typo-corps text-brume">Connecte-toi pour retrouver tes liens.</p>
			</header>

			<form class="space-y-5" onsubmit={envoyer}>
				<AuthField
					label="Adresse e-mail"
					type="email"
					name="email"
					autocomplete="email"
					placeholder="toi@exemple.fr"
					bind:value={email}
				/>

				<p class="typo-corps text-brume">Pas de mot de passe — on t’envoie un lien magique.</p>

				<AuthButton disabled={loading}>
					{loading ? 'Envoi…' : 'Recevoir mon lien'}
				</AuthButton>

				{#if unknownEmail}
					<p class="typo-corps text-encre">
						Aucun compte avec cet e-mail.
						<a
							class="font-semibold text-braise hover:underline"
							href="/register?email={encodeURIComponent(email.trim().toLowerCase())}"
						>
							Créer un compte
						</a>
					</p>
				{:else if errorMsg}
					<p class="typo-corps font-semibold text-danger">{errorMsg}</p>
				{/if}
			</form>

			<p class="typo-corps text-center text-brume">
				Nouveau ici ?
				<a class="font-semibold text-braise hover:underline" href="/register">Créer un compte</a>
			</p>
		</div>
	{/if}
</AuthShell>
