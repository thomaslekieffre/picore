<script lang="ts">
	let { email, magicUrl = null }: { email: string; magicUrl?: string | null } = $props();
</script>

<div class="space-y-4">
	<h1 class="typo-t1 text-encre">Vérifie ta boîte mail</h1>
	<p class="typo-corps text-brume">
		On t’a envoyé un lien magique à <strong class="typo-meta text-encre">{email}</strong>. Il est
		valable environ 5 minutes — un clic et tu es connecté.
	</p>

	{#if magicUrl}
		<div class="rounded-xl border border-dashed border-braise/40 bg-carton p-4">
			<p class="typo-meta mb-2 font-medium text-braise">Dev — pas de mailer</p>
			<a class="typo-meta break-all font-medium text-braise underline" href={magicUrl}>{magicUrl}</a>
		</div>
	{/if}
</div>
