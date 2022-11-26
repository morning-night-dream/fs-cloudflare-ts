import { SlackEvent } from "./slack";

export type Env = {
	API_KEY: string;
	SLACK_SIGNING_SECRET: string;
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.debug(JSON.stringify(ctx));
		// @ref https://developers.cloudflare.com/workers/examples/read-post/
		const req = await request.json();

		console.log(JSON.stringify(req));

		const event: SlackEvent = JSON.parse(JSON.stringify(req));

		if (event.type === "url_verification") {
			return new Response(JSON.stringify(event.challenge));
		}

		if (event.type === "event_callback") {
			console.log(event.type);
			const pattern = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/
			const url = event.event.text.match(pattern);
			console.log(url);
		}

		return new Response(JSON.stringify(""));
	},
};
