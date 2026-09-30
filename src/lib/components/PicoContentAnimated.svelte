<script lang="ts">
	let {
		class: className = '',
		title = 'Pico, content'
	}: {
		class?: string;
		title?: string;
	} = $props();

	let hopping = $state(false);

	function hop() {
		if (hopping) return;
		hopping = true;
		setTimeout(() => (hopping = false), 600);
	}
</script>

<button type="button" class="pico {className}" class:hopping onclick={hop} aria-label={title}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-hidden="true">
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
				<path d="M154 60L184 70L154 80Z" fill="#D2400C" />
				<path
					d="M128 65Q136 54 145 65"
					fill="none"
					stroke="#FFFFFF"
					stroke-width="4.5"
					stroke-linecap="round"
				/>
			</g>
		</g>
		<path
			d="M92 166v14M86 180h12M112 166v14M106 180h12"
			stroke="#D2400C"
			stroke-width="4"
			stroke-linecap="round"
			fill="none"
		/>
		<path class="spark spark-a" d="M174 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#D2400C" />
		<path class="spark spark-b" d="M150 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#1F8A8A" />
	</svg>
</button>

<style>
	.pico {
		display: inline-block;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
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
		animation: bob 2.4s ease-in-out infinite;
	}

	.head {
		transform-origin: 118px 96px;
		animation: nod 2.4s ease-in-out infinite;
	}

	.tail {
		transform-origin: 76px 138px;
		animation: wag 1.2s ease-in-out infinite;
	}

	.wing {
		transform-origin: 84px 104px;
		animation: flutter 2.4s ease-in-out infinite;
	}

	.spark {
		animation: twinkle 1.8s ease-in-out infinite;
	}
	.spark-a {
		transform-origin: 174px 41px;
	}
	.spark-b {
		transform-origin: 150px 21px;
		animation-delay: 0.9s;
	}

	.hopping .bird {
		animation: hop 0.6s cubic-bezier(0.3, 0.7, 0.4, 1);
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0) scale(1, 1);
		}
		50% {
			transform: translateY(-3px) scale(1.01, 0.99);
		}
	}

	@keyframes nod {
		0%,
		100% {
			transform: rotate(0deg);
		}
		30% {
			transform: rotate(-5deg);
		}
		60% {
			transform: rotate(3deg);
		}
	}

	@keyframes wag {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-7deg);
		}
	}

	@keyframes flutter {
		0%,
		70%,
		100% {
			transform: rotate(0deg);
		}
		78% {
			transform: rotate(-10deg);
		}
		86% {
			transform: rotate(2deg);
		}
		92% {
			transform: rotate(-6deg);
		}
	}

	@keyframes twinkle {
		0%,
		100% {
			transform: scale(1) rotate(0deg);
			opacity: 1;
		}
		50% {
			transform: scale(0.55) rotate(45deg);
			opacity: 0.5;
		}
	}

	@keyframes hop {
		0% {
			transform: translateY(0) scale(1, 1);
		}
		20% {
			transform: translateY(2px) scale(1.06, 0.92);
		}
		50% {
			transform: translateY(-22px) scale(0.96, 1.05);
		}
		80% {
			transform: translateY(1px) scale(1.04, 0.95);
		}
		100% {
			transform: translateY(0) scale(1, 1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bird,
		.head,
		.tail,
		.wing,
		.spark,
		.hopping .bird {
			animation: none;
		}
	}
</style>
