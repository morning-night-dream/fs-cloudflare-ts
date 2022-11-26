import { challenge, SlackEvent } from "./slack";

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
			return challenge(event);
		}

		return new Response(JSON.stringify(""));
	},
};
