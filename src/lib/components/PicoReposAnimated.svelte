<script lang="ts">
	let {
		onAccent = false,
		class: className = '',
		title = 'Pico, la mascotte'
	}: {
		/** Sur fond braise : bec/pattes carton */
		onAccent?: boolean;
		class?: string;
		title?: string;
	} = $props();

	const accent = $derived(onAccent ? '#FBF9F4' : '#D2400C');
</script>

<div class="pico {className}" role="img" aria-label={title}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" aria-hidden="true">
		<g class="bird">
			<g class="tail">
				<path d="M66 120L12 168Q10 176 20 176L84 152Z" fill="#17150F" />
				<path d="M12 168Q10 176 20 176L46 166L30 156Z" fill="#1F8A8A" />
			</g>
			<ellipse cx="100" cy="122" rx="54" ry="46" fill="#17150F" />
			<ellipse cx="110" cy="134" rx="32" ry="30" fill="#F4F0E8" />
			<path
				class="wing"
				d="M52 108C48 146 80 164 118 154C92 146 82 128 84 100C72 96 60 98 52 108Z"
				fill="#1F8A8A"
			/>
			<g class="head">
				<circle cx="124" cy="68" r="34" fill="#17150F" />
				<path d="M154 60L184 70L154 80Z" fill={accent} />
				<g class="eye">
					<circle cx="136" cy="62" r="9" fill="#FFFFFF" />
					<g class="pupil">
						<circle cx="138" cy="63" r="4.5" fill="#17150F" />
						<circle cx="139.6" cy="61.4" r="1.5" fill="#FFFFFF" />
					</g>
				</g>
			</g>
		</g>
		<path
			d="M92 166v14M86 180h12M112 166v14M106 180h12"
			stroke={accent}
			stroke-width="4"
			stroke-linecap="round"
			fill="none"
		/>
	</svg>
</div>

<style>
	.pico {
		display: inline-block;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	svg * {
		transform-box: view-box;
	}

	.bird {
		transform-origin: 100px 168px;
		animation: breathe 3.6s ease-in-out infinite;
	}

	.head {
		transform-origin: 118px 96px;
		animation: look 9s ease-in-out infinite;
	}

	.eye {
		transform-origin: 136px 62px;
		animation: blink 4.8s ease-in-out infinite;
	}

	.pupil {
		animation: glance 9s ease-in-out infinite;
	}

	.tail {
		transform-origin: 76px 138px;
		animation: sway 3.6s ease-in-out infinite;
	}

	.wing {
		transform-origin: 84px 104px;
		animation: ruffle 9s ease-in-out infinite;
	}

	@keyframes breathe {
		0%,
		100% {
			transform: scale(1, 1);
		}
		50% {
			transform: scale(1.015, 0.985);
		}
	}

	/* regarde devant, un coup en haut, un coup vers le bas, revient */
	@keyframes look {
		0%,
		20%,
		100% {
			transform: rotate(0deg);
		}
		26%,
		40% {
			transform: rotate(-8deg);
		}
		48%,
		62% {
			transform: rotate(5deg);
		}
		70% {
			transform: rotate(0deg);
		}
	}

	@keyframes glance {
		0%,
		20%,
		70%,
		100% {
			transform: translate(0, 0);
		}
		26%,
		40% {
			transform: translate(1.5px, -2px);
		}
		48%,
		62% {
			transform: translate(1px, 2px);
		}
	}

	@keyframes blink {
		0%,
		90%,
		100% {
			transform: scaleY(1);
		}
		93% {
			transform: scaleY(0.1);
		}
		96% {
			transform: scaleY(1);
		}
	}

	@keyframes sway {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-3deg);
		}
	}

	@keyframes ruffle {
		0%,
		80%,
		100% {
			transform: rotate(0deg);
		}
		84% {
			transform: rotate(-6deg);
		}
		88% {
			transform: rotate(1deg);
		}
		91% {
			transform: rotate(-3deg);
		}
		94% {
			transform: rotate(0deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bird,
		.head,
		.eye,
		.pupil,
		.tail,
		.wing {
			animation: none;
		}
	}
</style>
