import { config } from 'dotenv';
config();

import { Client, GatewayIntentBits } from 'discord.js';
import { Channel, TextChannel, MessageActionRowComponent, ButtonComponent } from 'discord.js';
export const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

export interface InteractionRes {
    id: string;
    label: string;
}

export interface MessageRes {
    url: string;
    interactions: InteractionRes[];
    id: string;
}

export async function getMessages(): Promise<MessageRes[]> {
    if (!process.env.CHANNEL_ID) return [];

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    if (!(channel instanceof TextChannel)) return []; 

    const messages = await channel.messages.fetch({ limit: 3 });

    // gets interaction buttons id and label
    const results: MessageRes[] = messages.map((message) => {
        const components = message.components;

        const interactions: InteractionRes[] = [];
        components.forEach((component) => {
            component.components.forEach((component) => {
                if (component instanceof ButtonComponent) {
                    interactions.push({ id: component.customId || "", label: component.label || ""});
                }
            });
        });

        return { url: message.attachments.map((attachment) => attachment.url).flat()[0] || "", interactions, id: message.id };
    });

    return results;
}