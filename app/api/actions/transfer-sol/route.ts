import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./transaction";

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        title: "Test your luck! and win amazing prizes",
        icon: "https://w0.peakpx.com/wallpaper/288/839/HD-wallpaper-world-cup-trophy-art-yellow-art-world-cup-trophy.jpg",
        description: "Get a chance to get amazing rewards by only 0.0001 SOL!",
        label: "Register"
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();
    const transaction = await transferSolTransaction({ from: body.account, amount: 0.0001})

    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: `Send 0.0001 SOL`,
        },
    });
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}