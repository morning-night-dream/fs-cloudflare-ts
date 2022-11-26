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
			const pattern = /http(.*):\/\/([a-zA-Z0-9/\-\_\.]*)/;
			const url = event.event.text.match(pattern)?.find((s) => s);
			console.log(url);
		}

		return new Response(JSON.stringify(""));
	},
};
