"use client";

import { initFirebase } from "@/firebase/firebaseapp";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	ReadonlyURLSearchParams,
	redirect,
	useSearchParams,
} from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { io } from "socket.io-client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import { socket } from "../../socket";

const socket = io();

export default function MatchMake() {
	const app = initFirebase();
	const auth = getAuth(app);
	const [user, loading] = useAuthState(auth);

	const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
	const [gameData, setGameData] = React.useState([]);

	const [isConnected, setIsConnected] = React.useState(false);
	const [transport, setTransport] = React.useState("N/A");
	const [data, setData] = React.useState({ game: "", users: [] });

	React.useEffect(() => {
		if (user) {
			let searchParamTable = {
				name: searchParams.get("name"),
				email: user.email,
				solo:
					searchParams.get("solo") == "Solo"
						? -1
						: searchParams.get("solo") == "Team"
						? 1
						: 0,
				casual:
					searchParams.get("casual") == "Casual"
						? -1
						: searchParams.get("casual") == "Competitive"
						? 1
						: 0,
				offensive:
					searchParams.get("offensive") == "Offensive"
						? -1
						: searchParams.get("offensive") == "Defensive"
						? 1
						: 0,
				strategic:
					searchParams.get("strategic") == "Strategic"
						? -1
						: searchParams.get("strategic") == "Creative"
						? 1
						: 0,
			};
			socket.emit("matchmake", searchParamTable);
		}

		onAuthStateChanged(auth, (user) => {
			if (user) {
				let searchParamTable = {
					name: searchParams.get("name"),
					email: user.email,
					solo:
						searchParams.get("solo") == "Solo"
							? -1
							: searchParams.get("solo") == "Team"
							? 1
							: 0,
					casual:
						searchParams.get("casual") == "Casual"
							? -1
							: searchParams.get("casual") == "Competitive"
							? 1
							: 0,
					offensive:
						searchParams.get("offensive") == "Offensive"
							? -1
							: searchParams.get("offensive") == "Defensive"
							? 1
							: 0,
					strategic:
						searchParams.get("strategic") == "Strategic"
							? -1
							: searchParams.get("strategic") == "Creative"
							? 1
							: 0,
				};
				socket.emit("matchmake", searchParamTable);
			}
		});

		if (socket.connected) {
			onConnect();
		}

		function onConnect() {
			setIsConnected(true);
			setTransport(socket.io.engine.transport.name);

			socket.io.engine.on("upgrade", (transport) => {
				setTransport(transport.name);
			});
		}

		function onDisconnect() {
			setIsConnected(false);
			setTransport("N/A");
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		socket.on("groupPlayers", (value) => {
			setData(value);
		});

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("groupPlayers");
		};
	}, []);

	if (loading) {
		return <div>Loading...</div>; //add skeleton
	}

	if (!user) {
		redirect("/login");
		return <div>Loading...</div>;
	}

	return (
		<main>
			<Typography variant="h1" gutterBottom>
				{data.game}
			</Typography>
			<p>Status: {isConnected ? "connected" : "disconnected"}</p>
			<Divider />
			<Typography variant="h4" gutterBottom>
				Players:
			</Typography>
			<List>
				{data.users.map((user) => (
					<ListItem>
						<ListItemIcon>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText primary={user.email} />
					</ListItem>
				))}
			</List>
		</main>
	);
}
