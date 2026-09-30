<script lang="ts">
	let {
		label,
		type = 'text',
		name,
		autocomplete,
		required = true,
		placeholder = '',
		maxlength,
		minlength,
		pattern,
		hint,
		value = $bindable('')
	}: {
		label: string;
		type?: string;
		name: string;
		autocomplete?: string;
		required?: boolean;
		placeholder?: string;
		maxlength?: number;
		minlength?: number;
		pattern?: string;
		hint?: string;
		value?: string;
	} = $props();
</script>

<label class="block">
	<span class="typo-corps mb-1.5 block font-semibold text-encre">{label}</span>
	<input
		class="typo-corps w-full rounded-xl border border-trait bg-carton px-4 py-3 text-encre shadow-none outline-none transition focus:border-braise focus:ring-2 focus:ring-braise/20"
		{type}
		{name}
		{autocomplete}
		{required}
		{placeholder}
		{maxlength}
		{minlength}
		{pattern}
		bind:value
	/>
	{#if hint}
		<p class="typo-corps mt-1.5 text-brume">{hint}</p>
	{/if}
</label>
