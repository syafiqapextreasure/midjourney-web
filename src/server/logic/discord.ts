import { client } from './bot';
client.login(process.env.BOT_TOKEN);

export async function sendPrompt(prompt: string): Promise<string> {
    console.log(`[sendPrompt] ${prompt}`);

    return new Promise((res, rej) => 
        fetch("https://discord.com/api/v9/interactions", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,vi;q=0.8",
                "authorization": !!(process.env.AUTH)?process.env.AUTH:"",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryA3AL1QBnQVkzsfKc",
                "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-US",
                "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwOS4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMDkuMC4xNTE4LjcwIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA5LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL2dwdC5jaGF0YXBpLmFydC8iLCJyZWZlcnJpbmdfZG9tYWluIjoiZ3B0LmNoYXRhcGkuYXJ0IiwicmVmZXJyZXJfY3VycmVudCI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50Ijoid3d3Lmdvb2dsZS5jb20iLCJzZWFyY2hfZW5naW5lX2N1cnJlbnQiOiJnb29nbGUiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxNzE2MjEsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
                "cookie": "__dcfduid=4815d000a7bd11ed95d27d5906e7ecbd; __sdcfduid=4815d001a7bd11ed95d27d5906e7ecbd8f7c537439fa6ec9d6361c8ebb1bfb51e2f39ad84efec29f0593d535a1048762; _gcl_au=1.1.795301378.1675869336; OptanonConsent=isIABGlobal=false&datestamp=Tue+Feb+21+2023+21%3A05%3A57+GMT%2B0700+(Indochina+Time)&version=6.33.0&hosts=&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1; _ga=GA1.1.2084863290.1675869336; _ga_Q149DFWHT7=GS1.1.1676988358.5.0.1676988361.0.0.0; __cfruid=967d3217c28a861d1f85dd6dfd2b367512d7b995-1677166076; __cf_bm=04erxy3PAHioBqYr_MFiiVpVuQUZDP4xQUSdZ1t0iMk-1677166089-0-AXAMlR4QTMr6NN7Rl4ZLWDKO4ift97nm9ZWetnPLZkXsT6+M41Gc6U32aq6tDY/9fkj3BNbwCdEOi/3iwTJbyww=",
                "Referer": "https://discord.com/channels/1070881778790834278/1070881780015566961",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `------WebKitFormBoundaryA3AL1QBnQVkzsfKc\r\nContent-Disposition: form-data; name=\"payload_json\"\r\n\r\n{\"type\":2,\"application_id\":\"936929561302675456\",\"guild_id\":\"1070881778790834278\",\"channel_id\":\"1070881780015566961\",\"session_id\":\"3838164d5ed7ed216f780fb52b5a9bed\",\"data\":{\"version\":\"${process.env.MIDJOURNEY_VERSION}\",\"id\":\"938956540159881230\",\"name\":\"imagine\",\"type\":1,\"options\":[{\"type\":3,\"name\":\"prompt\",\"value\":\"${prompt}\"}],\"application_command\":{\"id\":\"938956540159881230\",\"application_id\":\"936929561302675456\",\"version\":\"994261739745050686\",\"default_permission\":true,\"default_member_permissions\":null,\"type\":1,\"nsfw\":false,\"name\":\"imagine\",\"description\":\"There are endless possibilities...\",\"dm_permission\":true,\"options\":[{\"type\":3,\"name\":\"prompt\",\"description\":\"The prompt to imagine\",\"required\":true}]},\"attachments\":[]}}\r\n------WebKitFormBoundaryA3AL1QBnQVkzsfKc--\r\n`,
            "method": "POST"
        })
        .then(response => {
            if (response.ok) {
                res("Sent");
            } else {
                console.log("send prompt failed", response)
                rej(response.statusText);
            }
        })

    //     fetch("https://discord.com/api/v9/interactions", {
    //         "headers": {
    //             "accept": "*/*",
    //             "accept-language": "en-US,en;q=0.9",
    //             "authorization": "Njg1NTI4NDkxMzYxNDM1NzEz.G6skr8.QEzmXdzv983yYdne1jgQkzs4ynLpqR1IHkLXDM",
    //             "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryeEAwx1ppdRhmCy8M",
    //             "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
    //             "sec-ch-ua-mobile": "?0",
    //             "sec-ch-ua-platform": "\"Windows\"",
    //             "sec-fetch-dest": "empty",
    //             "sec-fetch-mode": "cors",
    //             "sec-fetch-site": "same-origin",
    //             "x-debug-options": "bugReporterEnabled",
    //             "x-discord-locale": "en-US",
    //             "x-kl-ajax-request": "Ajax_Request",
    //             "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExMC4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMTAuMC4xNTg3LjUwIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTEwLjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6Imh0dHBzOi8vZGlzY29yZC5jb20vIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiZGlzY29yZC5jb20iLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxNzIzOTQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
    //             "cookie": "__dcfduid=4815d000a7bd11ed95d27d5906e7ecbd; __sdcfduid=4815d001a7bd11ed95d27d5906e7ecbd8f7c537439fa6ec9d6361c8ebb1bfb51e2f39ad84efec29f0593d535a1048762; _gcl_au=1.1.795301378.1675869336; OptanonConsent=isIABGlobal=false&datestamp=Tue+Feb+21+2023+21%3A05%3A57+GMT%2B0700+(Indochina+Time)&version=6.33.0&hosts=&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1; _ga=GA1.1.2084863290.1675869336; _ga_Q149DFWHT7=GS1.1.1676988358.5.0.1676988361.0.0.0; __cfruid=967d3217c28a861d1f85dd6dfd2b367512d7b995-1677166076; __cf_bm=04erxy3PAHioBqYr_MFiiVpVuQUZDP4xQUSdZ1t0iMk-1677166089-0-AXAMlR4QTMr6NN7Rl4ZLWDKO4ift97nm9ZWetnPLZkXsT6+M41Gc6U32aq6tDY/9fkj3BNbwCdEOi/3iwTJbyww=",
    //             "Referer": "https://discord.com/channels/1070881778790834278/1070881780015566961",
    //             "Referrer-Policy": "strict-origin-when-cross-origin"
    //         },
    //         "body": "------WebKitFormBoundaryeEAwx1ppdRhmCy8M\r\nContent-Disposition: form-data; name=\"payload_json\"\r\n\r\n{\"type\":2,\"application_id\":\"936929561302675456\",\"guild_id\":\"1070881778790834278\",\"channel_id\":\"1070881780015566961\",\"session_id\":\"3838164d5ed7ed216f780fb52b5a9bed\",\"data\":{\"version\":\"1077969938624553050\",\"id\":\"938956540159881230\",\"name\":\"imagine\",\"type\":1,\"options\":[{\"type\":3,\"name\":\"prompt\",\"value\":\"a cat\"}],\"application_command\":{\"id\":\"938956540159881230\",\"application_id\":\"936929561302675456\",\"version\":\"1077969938624553050\",\"default_permission\":true,\"default_member_permissions\":null,\"type\":1,\"nsfw\":false,\"name\":\"imagine\",\"description\":\"Create images with Midjourney\",\"dm_permission\":true,\"options\":[{\"type\":3,\"name\":\"prompt\",\"description\":\"The prompt to imagine\",\"required\":true}]},\"attachments\":[]},\"nonce\":\"1078340956589129728\"}\r\n------WebKitFormBoundaryeEAwx1ppdRhmCy8M--\r\n",
    //         "method": "POST"
    //         });
    );
}

export async function sendInteraction(id: string, msgId: string): Promise<string> {
    console.log(`[sendInteraction] Sending interaction ${id}...`);

    return new Promise((res, rej) => 
        fetch("https://discord.com/api/v9/interactions", {
            "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": !!(process.env.AUTH)?process.env.AUTH:"",
            "content-type": "application/json",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-debug-options": "bugReporterEnabled",
            "x-discord-locale": "en-US",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwOS4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMDkuMC4xNTE4LjcwIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA5LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjE3MTYyMSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=",
            "cookie": "__dcfduid=1934b760a38011edbced31def522fd07; __sdcfduid=1934b761a38011edbced31def522fd07a21fcb703daf2f4588de73005a0148f06a3fa94ae9b4cdb7aabb978484e8b375; __cf_bm=OWn5l0N8AG2hO_JLIF9aa7jNCwuoopWC6aZboK7ZriU-1675418548-0-AdkvS7NY/dP8oogMfqksVhqhU2jjIACF1SzqtjZ7vWpaL6Q87+1U30HnqPjNRo13wONCaDaxo69xZZ75vu21KaVsDYLMOEOQ6+mt1zZxxK61mHRdaCYaGMMgdpQhKV2G5X8jHgKkQXJoqx73sQLWTy4=; __cfruid=89e6c816ea3f04c5ea870c400f603962bf8c2a91-1675418621",
            "Referer": "https://discord.com/channels/1070881778790834278/1070881780015566961",
            "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"type\":3,\"guild_id\":\"1070881778790834278\",\"channel_id\":\"1070881780015566961\",\"message_flags\":0,\"message_id\":\"${msgId}\",\"application_id\":\"936929561302675456\",\"session_id\":\"0604aaae862343f1e54069dece723084\",\"data\":{\"component_type\":2,\"custom_id\":\"${id}\"}}`,
            "method": "POST"
        })
        .then(response => {
            if (response.ok) {
                console.log(`[sendInteraction] Interaction ${id} sent!`);
                res("Sent");
            } else {
                console.log(`[sendInteraction] Interaction ${id} failed!`);
                rej(response);
            }
        })
    );
}