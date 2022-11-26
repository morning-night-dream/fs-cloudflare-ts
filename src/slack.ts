export type SlackEventType = "url_verification" | "event_callback";

export type SlackEvent = {
	token: string;
	challenge: string;
	type: SlackEventType;
	event: Event;
};

export type EventType = "message";

export type EventSubType = "message_changed";

export type Event = {
	type: EventType;
	subtype: EventSubType;
	text: string;
	user: string;
	ts: number;
};

export const verify = (token1: string, token2: string) => {
	if (token1 !== token2) {
		throw new Error("token mismatch");
	}
};

export const callback = async (event: SlackEvent, endpoint: string, key: string) => {
	console.log(event.type);
	const pattern = /http(.*):\/\/([a-zA-Z0-9/\-\_\.]*)/;
	try {
		const url = event.event.text.match(pattern)?.find((s) => s);
		console.log(url);

		const init = {
			body: JSON.stringify({ url: url }),
			method: "POST",
			headers: {
				"X-API-KEY": key,
				"Content-Type": "application/json",
			},
		};
		const res = await fetch(endpoint, init);

		console.debug(res);
	} catch (e) {
		console.warn(e);
		// 不要なリトライを防ぐため握りつぶす
		return;
	}
};
