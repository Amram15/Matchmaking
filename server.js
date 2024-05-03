import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { list } from "firebase/storage";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let lobbies = [];
let activeUsers = [];

function oldFindCompatibleLobby(game, playerCount, userStats, userWants) {
	let bestLobby = -1;
	let compatibility = -1;

	lobbies.forEach((item, index) => {
		if (item.game != game) return;
		if (item.playerCount != playerCount) return;

		//Get Compatibility
		let lobbyCompatibility = 0;
		const lobbyStats = {};
		const lobbyWants = {};

		//Get Stat Info
		item.users.forEach((user) => {
			for (const key in user.stats) {
				if (
					typeof user.stats[key] === "number" &&
					typeof lobbyStats[key] === "number"
				) {
					lobbyStats[key] = user.stats[key] + lobbyStats[key];
				} else {
					lobbyStats[key] = user.stats[key];
				}
			}
		});

		//Average Stats
		for (const key in lobbyStats) {
			lobbyStats[key] = lobbyStats[key] / item.users.length;
		}

		//Get want Info
		item.users.forEach((user) => {
			for (const key in user.wants) {
				if (
					typeof user.wants[key] === "number" &&
					typeof lobbyWants[key] === "number"
				) {
					lobbyWants[key] = user.wants[key] + lobbyWants[key];
				} else {
					lobbyWants[key] = user.wants[key];
				}
			}
		});

		//Average wants
		for (const key in lobbyWants) {
			lobbyWants[key] = lobbyWants[key] / item.users.length;
		}

		//get compatibility ratio
		for (const key in userStats) {
			lobbyCompatibility += userStats[key] * lobbyWants[key];
		}
		for (const key in userWants) {
			lobbyCompatibility += userWants[key] * lobbyStats[key];
		}

		//Update Best Lobby
		if (lobbyCompatibility > compatibility) {
			bestLobby = index;
		}
	});

	return compatibility >= 0 ? bestLobby : -1;
}

app.prepare().then(() => {
	const httpServer = createServer(handler);
	const io = new Server(httpServer);

	function createLobby(game, playerCount) {
		return lobbies.push({
			game: game,
			playerCount: playerCount,
			users: [],
		});
	}

	function createUser(lobby, id, email) {
		lobbies[lobby].users.push({
			id: id,
			email: email,
		});

		lobbies[lobby].users.forEach((item, index) => {
			io.to(item.id).emit("groupPlayers", lobbies[lobby]);
		});
	}

	function removeUser(id) {
		lobbies.forEach((item, index) => {
			const result = item.users.findIndex(({ ID }) => ID === id);
			if (result) {
				item.users.splice(result, 1);
				item.users.forEach((user, index) => {
					io.to(user.id).emit("groupPlayers", item);
				});
			}
		});
	}

	function findCompatibleLobby(game, playerCount) {
		let lobbyID = false;

		lobbies.forEach((item, index) => {
			if (item.game != game) return;
			if (item.playerCount != playerCount) return;

			lobbyID = index;
		});

		return lobbyID !== false ? lobbyID : createLobby(game, playerCount) - 1;
	}

	io.on("connection", (socket) => {
		socket.on("matchmake", (matchmakeInfo) => {
			console.log(socket.id + " Email: " + matchmakeInfo.email + " Connected");

			if (activeUsers.find((element) => element === socket.id)) {
				return;
			}
			activeUsers.push(socket.id);
			console.log(activeUsers);

			let lobby = findCompatibleLobby(matchmakeInfo.name, 5);
			createUser(lobby, socket.id, matchmakeInfo.email);
			console.log(lobbies);
		});
		socket.on("disconnect", (reason) => {
			console.log(socket.id + " Disconnected");
			activeUsers.splice(
				activeUsers.findIndex((element) => element === socket.id),
				1
			);
			removeUser(socket.id);
		});
	});

	httpServer
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log("\x1b[36m%s\x1b[0m", `> Ready on http://${hostname}:${port}`);
		});
});
