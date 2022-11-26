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

export const callback = (event: SlackEvent) => {
	console.log(event.type);
	const pattern = /http(.*):\/\/([a-zA-Z0-9/\-\_\.]*)/;
	try {
		const url = event.event.text.match(pattern)?.find((s) => s);
		console.log(url);

		// TODO request core server
	} catch (e) {
		console.warn(e);
		// 不要なリトライを防ぐため握りつぶす
		return;
	}
};
