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
                "cookie": "__dcfduid=c5ad3d507bb711ed95c3236151ecfec7; __sdcfduid=c5ad3d517bb711ed95c3236151ecfec779d4b71bb2ab1ec7d5f3ffbd92560783b383ec63cb23be0972b28e1579a7aa88; locale=en-US; OptanonConsent=isIABGlobal=false&datestamp=Thu+Feb+02+2023+21%3A50%3A37+GMT%2B0700+(Indochina+Time)&version=6.33.0&hosts=&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1; __cf_bm=9zc2g5.Tg8AliAVaLyudC1CjrKcUwDd1aV_XTK48_7s-1675391521-0-AVZKH79eOx++AsZ2uECgk3iSoN3IUpFs/kmrOwXskr47sqZl7G/4TZmuA27ZD67QlJImPKLblcIepGfm7tH7oDj/OPwrDJRAw4AjV9j1WaDdOhQlqCrZJKcs0ewmfJgHSXNHqpMUfuhhknHjPrZVzH8=; __cfruid=7caafca2d2195f8d805a80d0503ac8db6505f9ab-1675391579",
                "Referer": "https://discord.com/channels/1070881778790834278/1070881780015566961",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `------WebKitFormBoundaryA3AL1QBnQVkzsfKc\r\nContent-Disposition: form-data; name=\"payload_json\"\r\n\r\n{\"type\":2,\"application_id\":\"936929561302675456\",\"guild_id\":\"1070881778790834278\",\"channel_id\":\"1070881780015566961\",\"session_id\":\"a25bab068cd883bf1adb2f542f89e505\",\"data\":{\"version\":\"994261739745050686\",\"id\":\"938956540159881230\",\"name\":\"imagine\",\"type\":1,\"options\":[{\"type\":3,\"name\":\"prompt\",\"value\":\"${prompt}\"}],\"application_command\":{\"id\":\"938956540159881230\",\"application_id\":\"936929561302675456\",\"version\":\"994261739745050686\",\"default_permission\":true,\"default_member_permissions\":null,\"type\":1,\"nsfw\":false,\"name\":\"imagine\",\"description\":\"There are endless possibilities...\",\"dm_permission\":true,\"options\":[{\"type\":3,\"name\":\"prompt\",\"description\":\"The prompt to imagine\",\"required\":true}]},\"attachments\":[]}}\r\n------WebKitFormBoundaryA3AL1QBnQVkzsfKc--\r\n`,
            "method": "POST"
        })
        .then(response => {
            if (response.ok) {
                res("Sent");
            } else {
                rej(response);
            }
        })
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