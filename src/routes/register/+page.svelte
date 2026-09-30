<script lang="ts">
	import AuthShell from '$lib/components/AuthShell.svelte';
	import AuthField from '$lib/components/AuthField.svelte';
	import AuthButton from '$lib/components/AuthButton.svelte';
	import MagicLinkSent from '$lib/components/MagicLinkSent.svelte';
	import { authClient } from '$lib/auth-client';
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	const USERNAME_RE = /^[a-zA-Z0-9._-]{1,21}$/;

	let username = $state('');
	let email = $state(page.url.searchParams.get('email') ?? '');
	let sent = $state(false);
	let errorMsg = $state('');
	let magicUrl = $state<string | null>(null);
	let loading = $state(false);

	async function envoyer(e: SubmitEvent) {
		e.preventDefault();
		errorMsg = '';
		magicUrl = null;
		loading = true;

		const handle = username.trim();
		const mail = email.trim().toLowerCase();

		try {
			if (!USERNAME_RE.test(handle)) {
				errorMsg = 'Pseudo : 1–21 caractères (lettres, chiffres, . _ -)';
				return;
			}

			const check = await fetch(
				`/api/account/check?email=${encodeURIComponent(mail)}&username=${encodeURIComponent(handle)}`
			);
			if (!check.ok) {
				errorMsg = 'Impossible de vérifier ces infos';
				return;
			}
			const { emailTaken, usernameTaken } = (await check.json()) as {
				emailTaken: boolean;
				usernameTaken: boolean;
			};

			if (emailTaken) {
				errorMsg = 'Cet e-mail a déjà un compte — connecte-toi.';
				return;
			}
			if (usernameTaken) {
				errorMsg = 'Ce nom d’utilisateur est déjà pris.';
				return;
			}

			const { error } = await authClient.signIn.magicLink({
				email: mail,
				name: handle,
				callbackURL: '/',
				newUserCallbackURL: '/onboarding',
				errorCallbackURL: '/register'
			});

			if (error) {
				errorMsg = error.message ?? 'Erreur';
				return;
			}

			sent = true;

			if (browser && import.meta.env.DEV) {
				const res = await fetch(`/api/dev/last-magic-link?email=${encodeURIComponent(mail)}`);
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
	<title>Créer un compte · picore</title>
</svelte:head>

<AuthShell tagline={"Un seul endroit pour tout\nce que tu veux retrouver."} pose="repos">
	{#if sent}
		<MagicLinkSent {email} {magicUrl} />
	{:else}
		<div class="space-y-8">
			<header class="space-y-2">
				<h1 class="typo-t1 text-encre">Crée ton espace</h1>
				<p class="typo-corps text-brume">Fais le premier pas vers ton nouveau coffre-fort.</p>
			</header>

			<form class="space-y-5" onsubmit={envoyer}>
				<AuthField
					label="Nom d’utilisateur"
					type="text"
					name="username"
					autocomplete="username"
					placeholder="camille"
					maxlength={21}
					minlength={1}
					pattern={'[a-zA-Z0-9._-]{1,21}'}
					hint="1 à 21 caractères · lettres, chiffres, . _ -"
					bind:value={username}
				/>

				<AuthField
					label="Adresse e-mail"
					type="email"
					name="email"
					autocomplete="email"
					placeholder="toi@exemple.fr"
					bind:value={email}
				/>

				<p class="typo-corps text-brume">
					Pas de mot de passe — tu recevras un lien magique pour activer ton compte.
				</p>

				<AuthButton disabled={loading}>
					{loading ? 'Envoi…' : 'Créer mon compte'}
				</AuthButton>

				{#if errorMsg}
					<p class="typo-corps font-semibold text-danger">
						{errorMsg}
						{#if errorMsg.includes('connecte-toi')}
							<a class="text-braise underline" href="/login">Se connecter</a>
						{/if}
					</p>
				{/if}
			</form>

			<p class="typo-corps text-center text-brume">
				Déjà un compte ?
				<a class="font-semibold text-braise hover:underline" href="/login">Se connecter</a>
			</p>
		</div>
	{/if}
</AuthShell>
