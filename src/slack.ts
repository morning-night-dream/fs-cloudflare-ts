export type SlackEventType = "url_verification" | "event_callback";

export type SlackEvent = {
	token: string;
	challenge: string;
	type: SlackEventType;
	event: Event;
};

export type EventType = "message";

export type Event = {
	type: EventType;
	subtype: string;
	text: string;
	user: string;
	ts: number;
};

// export const verify = (header: string, body: string, secret: string) => {}
