export type SlackEvent = {
	token: string;
	challenge: string;
	type: SlackEventType;
};

export type SlackEventType = "url_verification" | "";

export const challenge = (event: SlackEvent) => {
	const init = {
		headers: {
			"content-type": "text",
		},
		body: event.challenge,
	};
	return new Response(JSON.stringify(event.challenge));
};

// export const verify = (header: string, body: string, secret: string) => {}
