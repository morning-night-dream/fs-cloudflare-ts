import { SlackChallengeRequest } from "./slack";

export interface Env {
	API_KEY: string;
	SLACK_SIGNING_SECRET: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.debug(JSON.stringify(ctx));
		// @ref https://developers.cloudflare.com/workers/examples/read-post/
		const req = await request.json();
		console.log(JSON.stringify(req));
		const event: SlackChallengeRequest = JSON.parse(JSON.stringify(req));
		const init = {
			headers: {
				"content-type": "text",
			},
			body: event.challenge,
		};
		return new Response(JSON.stringify(init));
	},
};
