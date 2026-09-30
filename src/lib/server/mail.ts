type SendMagicLinkParams = {
	email: string;
	url: string;
};

export async function sendMagicLinkEmail({ email, url }: SendMagicLinkParams) {
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.EMAIL_FROM ?? 'Picore <onboarding@resend.dev>';

	if (!apiKey) {
		console.log(`[mail] RESEND_API_KEY manquant — lien pour ${email} : ${url}`);
		return;
	}

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from,
			to: [email],
			subject: 'Ton lien Picore',
			html: `
				<p>Salut,</p>
				<p>Clique pour te connecter à Picore (valable quelques minutes) :</p>
				<p><a href="${url}">Ouvrir Picore</a></p>
				<p style="color:#666;font-size:12px;">Si tu n’as rien demandé, ignore ce mail.</p>
			`
		})
	});

	if (!res.ok) {
		const body = await res.text();
		console.error(`[mail] Resend ${res.status}: ${body}`);
		throw new Error(`Envoi mail échoué (${res.status})`);
	}
}
