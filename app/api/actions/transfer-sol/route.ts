import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./transaction";

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        title: "Join Kyle's Giveaway",
        icon: "https://i.imgur.com/grf925K.jpeg",
        description: "It's your lucky day today! 🏆",
        label: "Enter Giveaway"
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    try {
        const body: ActionPostRequest = await req.json();

        // Log the user's wallet/public key
        console.log("User's wallet/public key:", body.account);

        const amountInLamports = Math.floor(0.0001 * 1_000_000_000); // Convert SOL to Lamports
        
        if (amountInLamports <= 0) {
            throw new Error("Amount must be greater than zero");
        }
    
        const transaction = await transferSolTransaction({ from: body.account, amount: amountInLamports });
    
        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: `Enter the giveaway`,
            },
        });
        
        return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
        });
    } catch (error) {
        console.error("Error processing POST request:", error);
        return Response.json({ error: (error as Error).message }, {
            status: 400,
            headers: ACTIONS_CORS_HEADERS,
        });
    }    
}