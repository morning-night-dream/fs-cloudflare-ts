import { callback, SlackEvent, verify } from "./slack";

export type Env = {
	API_KEY: string;
	VERIFICATION_TOKEN: string;
	CORE_APP_ENDPOINT_V1_ARTICLE_SHARE: string;
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.debug(JSON.stringify(ctx));
		// @ref https://developers.cloudflare.com/workers/examples/read-post/
		const req = await request.json();

		console.log(JSON.stringify(req));

		const event: SlackEvent = JSON.parse(JSON.stringify(req));

		console.info(`received event type: ${event.type}, sub type: ${event.event.subtype}`);

		verify(event.token, env.VERIFICATION_TOKEN);

		if (event.type === "url_verification") {
			return new Response(JSON.stringify(event.challenge));
		}

		if (event.type === "event_callback" && event.event.subtype === "message_changed") {
			return new Response(JSON.stringify(""));
		}

		if (event.type === "event_callback") {
			callback(event, env.CORE_APP_ENDPOINT_V1_ARTICLE_SHARE, env.API_KEY);
		}

		return new Response(JSON.stringify(""));
	},
};
