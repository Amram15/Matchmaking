import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const search: URLSearchParams = await request.nextUrl.searchParams;
	const gameName = search.get("gamename");

	const twitchAuthRes = await fetch(
		"https://id.twitch.tv/oauth2/token?client_id=" +
			process.env.TwitchClientID +
			"&client_secret=" +
			process.env.TwitchClientSecret +
			"&grant_type=client_credentials",
		{
			method: "POST",
			cache: "no-cache",
		}
	);
	const twichAuth = await twitchAuthRes.json();

	const myHeaders = new Headers();
	myHeaders.append("Client-ID", process.env.TwitchClientID);
	myHeaders.append("Content-Type", "text/plain");
	myHeaders.append("Authorization", "Bearer " + twichAuth.access_token);

	const raw = `fields name,cover.url; limit 100; where version_parent = null; where game_modes.name = "Multiplayer";search "${gameName}";`;

	const igdbDataRes = await fetch("https://api.igdb.com/v4/games/", {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
		cache: "no-cache",
	});

	const igdbData = await igdbDataRes.json();
	return NextResponse.json(igdbData);
}
