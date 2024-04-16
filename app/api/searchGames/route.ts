import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const twitchAuthRes = await fetch(
        "https://id.twitch.tv/oauth2/token?client_id=" +
            process.env.TwitchClientID +
            "&client_secret=" +
            process.env.TwitchClientSecret +
            "&grant_type=client_credentials",
        {
            method: "POST",
        }
    );

    

	const twichAuth = await twitchAuthRes.json();
	console.log(twichAuth);

	return NextResponse.json({
		Hello: "I am api masters"+twichAuth.access_token,
	});
}
