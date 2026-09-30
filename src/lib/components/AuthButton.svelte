<script lang="ts">
	let {
		children,
		disabled = false,
		type = 'submit'
	}: {
		children: import('svelte').Snippet;
		disabled?: boolean;
		type?: 'submit' | 'button';
	} = $props();
</script>

<button
	{type}
	{disabled}
	class="typo-corps w-full rounded-xl bg-braise px-4 py-3.5 font-semibold text-white transition hover:bg-braise-hover disabled:cursor-not-allowed disabled:opacity-60"
>
	{@render children()}
</button>
