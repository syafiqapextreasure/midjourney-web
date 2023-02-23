import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { sendPrompt, sendInteraction } from "../../logic/discord";
import { downloadAndConvert } from "../../logic/svg";
import { getMessages } from "../../logic/bot";
import { Options, OptionsType } from "./d";

export const exampleRouter = createTRPCRouter({
    hello: publicProcedure
    .input(z.string())
    .query(async ({input}) => {
        console.log(`[prompt] ${input}`);

        try {
            const res = await sendPrompt(input);

            return {
                greeting: `Prompt ${res}`,
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
    }),
    convert: publicProcedure
    .input(z.intersection(Options, z.object({
        url: z.string()
    })))
    .query(async ({input}) => {
        console.log("[convert] input: ", input);
        if (!input.url) return "";

        console.log(`[convert] ${input.url}`);
        try {
            return await downloadAndConvert(input.url, input as OptionsType);
        } catch (e) {
            console.log(e);
            return "";
        }
    })
});
