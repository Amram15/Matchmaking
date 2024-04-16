"use client";
import {
	Box,
	Typography,
	TextField,
	Button,
	Divider,
	styled,
	Paper,
	Rating,
	ListItem,
	Chip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ShieldIcon from "@mui/icons-material/Shield";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { getAuth } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore";

interface ChipData {
	key: number;
	label: string;
}

export default function Home() {
	const router = useRouter();
	const app = initFirebase();
	const auth = getAuth(app);
	const firestore = getFirestore(app);
	const [user, loading] = useAuthState(auth);

	//Stats
	const [TeamStat, setTeamStat] = useState(0);
	const [CompetitiveStat, setCompetitiveStat] = useState(0);
	const [OffensiveStat, setOffensiveStat] = useState(0);
	const [CreativeStat, setCreativeStat] = useState(0);

	//Chips
	const [activeChips, setActiveChipData] = React.useState<readonly ChipData[]>(
		[]
	);

	const [storedChips, setStoredChipData] = React.useState<readonly ChipData[]>([
		{ key: 0, label: "Console" },
		{ key: 1, label: "Mobile" },
		{ key: 2, label: "PC" },
		{ key: 3, label: "Mic" },
	]);

	const handleRemove = (chipToMove: ChipData) => () => {
		setActiveChipData((chips) =>
			chips.filter((chip) => chip.key !== chipToMove.key)
		);

		chipToMove.key = uuidv4();
		const updatedChips = [...storedChips, chipToMove];
		setStoredChipData(updatedChips);
	};

	const handleAdd = (chipToMove: ChipData) => () => {
		setStoredChipData((chips) =>
			chips.filter((chip) => chip.key !== chipToMove.key)
		);

		chipToMove.key = uuidv4();
		const updatedChips = [...activeChips, chipToMove];
		setActiveChipData(updatedChips);
	};

	//Save Data
	const handleSaveData = async () => {
		let tags = [];
		activeChips.forEach((element) => {
			tags.push(element.label);
		});

		const userRef = doc(firestore, "Users", user.uid);
		await updateDoc(userRef, {
			Stats: {
				Team: TeamStat,
				Competitive: CompetitiveStat,
				Offensive: OffensiveStat,
				Creative: CreativeStat,
			},
			Tags: tags,
		});

		router.push("/home");
	};

	//login
	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		router.push("/login");
		return <div>Loading...</div>;
	}

	return (
		//Need to make this a grid
		<main>
			<Typography justifySelf={"Center"} variant="h2" component={"h2"}>
				Welcome Select your play style:
			</Typography>
			<Divider sx={{ paddingBottom: "10px" }} />

			<Box sx={{ flexGrow: 1 }}>
				<Typography justifySelf={"Center"} variant="h4" component={"h4"}>
					Stats:
				</Typography>
				<Divider sx={{ paddingBottom: "10px" }} />
				<Grid container spacing={2}>
					<Grid xs={8}>
						Solo/Team
						<Rating
							name="customized-color"
							defaultValue={0}
							getLabelText={(value: number) => ""}
							onChange={(event, newValue) => {
								setTeamStat(newValue);
							}}
							precision={1}
							icon={<EmojiEmotionsIcon fontSize="inherit" />}
							emptyIcon={<EmojiEmotionsOutlinedIcon fontSize="inherit" />}
						/>
					</Grid>
					<Grid xs={8}>
						Casual/Competitive
						<Rating
							name="customized-color"
							defaultValue={0}
							getLabelText={(value: number) => ""}
							onChange={(event, newValue) => {
								setCompetitiveStat(newValue);
							}}
							precision={1}
							icon={<SportsEsportsIcon fontSize="inherit" />}
							emptyIcon={<SportsEsportsOutlinedIcon fontSize="inherit" />}
						/>
					</Grid>
					<Grid xs={8}>
						Offensive/Defensive
						<Rating
							name="customized-color"
							defaultValue={0}
							getLabelText={(value: number) => ""}
							onChange={(event, newValue) => {
								setOffensiveStat(newValue);
							}}
							precision={1}
							icon={<ShieldIcon fontSize="inherit" />}
							emptyIcon={<ShieldOutlinedIcon fontSize="inherit" />}
						/>
					</Grid>
					<Grid xs={8}>
						Strategic/Creative
						<Rating
							name="customized-color"
							defaultValue={0}
							getLabelText={(value: number) => ""}
							onChange={(event, newValue) => {
								setCreativeStat(newValue);
							}}
							precision={1}
							icon={<EmojiObjectsIcon fontSize="inherit" />}
							emptyIcon={<EmojiObjectsOutlinedIcon fontSize="inherit" />}
						/>
					</Grid>
				</Grid>
				<Divider sx={{ paddingBottom: "10px" }} />
				<Typography justifySelf={"Center"} variant="h4" component={"h4"}>
					Tags:
				</Typography>
				<Divider />
				<Box
					sx={{
						flexGrow: 1,
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						listStyle: "none",
						p: 0.5,
						m: 0,
					}}
					component="ul"
				>
					{activeChips.map((data) => {
						let icon;

						return (
							<ListItem key={data.key}>
								<Chip
									icon={icon}
									label={data.label}
									onDelete={handleRemove(data)}
									onClick={handleRemove(data)}
								/>
							</ListItem>
						);
					})}
				</Box>
				<Divider />

				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						listStyle: "none",
						p: 0.5,
						m: 0,
					}}
					component="ul"
				>
					{storedChips.map((data) => {
						let icon;

						return (
							<ListItem key={data.key}>
								<Chip
									icon={icon}
									label={data.label}
									deleteIcon={<AddCircleIcon />}
									onDelete={handleAdd(data)}
									onClick={handleAdd(data)}
								/>
							</ListItem>
						);
					})}
				</Box>
				<Divider />

				<Button type="submit" variant="contained" onClick={handleSaveData}>
					Start Playing
				</Button>
			</Box>
		</main>
	);
}
