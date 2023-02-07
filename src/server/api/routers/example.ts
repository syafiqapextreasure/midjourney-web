import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { sendPrompt, sendInteraction } from "../../logic/discord";
import { getMessages } from "../../logic/bot";

export const exampleRouter = createTRPCRouter({
    hello: publicProcedure
    .input(z.string())
    .query(async ({input}) => {
        console.log(`[prompt] ${input}`);

        try {
            const res = await sendPrompt(input);

            return {
                greeting: `Hello ${res}`,
            };
        } catch (e) {
            console.log(e);
            return {
                greeting: `Error ${e}`
            };
        }
    }),
    messages: publicProcedure
    .query(async () => {
        return await getMessages();
    }),
    interact: publicProcedure
    .input(z.object({
        id: z.string(),
        msgId: z.string()
    }))
    .query(async ({input}) => {
        console.log(`[interact] ${input.id}`);
        return await sendInteraction(input.id, input.msgId);
    })
});
