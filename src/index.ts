import { callback, SlackEvent } from "./slack";
import { verifySlackRequest } from "@slack/bolt";
import { SlackRequestVerificationOptions } from "@slack/bolt/dist/receivers/verify-request";

export type Env = {
	API_KEY: string;
	SLACK_SIGNING_SECRET: string;
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.debug(JSON.stringify(ctx));
		// @ref https://developers.cloudflare.com/workers/examples/read-post/
		const req = await request.json();

		request.headers.get("x-slack-signature");

		const option: SlackRequestVerificationOptions = {
			signingSecret: env.SLACK_SIGNING_SECRET,
			body: "",
			headers: {
				"x-slack-signature": request.headers.get("x-slack-signature")!,
				"x-slack-request-timestamp": request.headers.get("x-slack-request-timestamp")! as unknown as number,
			},
		};

		verifySlackRequest(option);

		console.log(JSON.stringify(req));

		const event: SlackEvent = JSON.parse(JSON.stringify(req));

		console.log(`received event type: ${event.type}, sub type: ${event.event.subtype}`);

		if (event.type === "url_verification") {
			return new Response(JSON.stringify(event.challenge));
		}

		if (event.type === "event_callback" && event.event.subtype === "message_changed") {
			return new Response(JSON.stringify(""));
		}

		if (event.type === "event_callback") {
			callback(event);
		}

		return new Response(JSON.stringify(""));
	},
};
