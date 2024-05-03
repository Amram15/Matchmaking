"use client";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Modal,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function createCard(name: string, slug: string, image: string) {
	return { name, slug, image };
}

export default function Home() {
	const [gameData, setGameData] = React.useState([]);
	const [currentGame, setCurrentGame] = React.useState(createCard("", "", ""));

	//Modal
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	//Selection Buttons
	const [soloAlignment, setSoloAlignment] = React.useState("");
	const handleSoloChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setSoloAlignment(newAlignment);
	};
	const [casualAlignment, setCasualAlignment] = React.useState("");
	const handleCasualChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setCasualAlignment(newAlignment);
	};
	const [offensiveAlignment, setOffensiveAlignment] = React.useState("");
	const handleOffensiveChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setOffensiveAlignment(newAlignment);
	};
	const [strategicAlignment, setStrategicAlignment] = React.useState("");
	const handleStrategicChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setStrategicAlignment(newAlignment);
	};

	const getGames = async (event) => {
		const gameName = event.target.value;

		const response = await fetch(`/api/searchGames?gamename=${gameName}`, {
			method: "GET",
			cache: "no-cache",
		});
		const data = await response.json();
		const configuredData = data.map((g) => {
			let url = "";

			try {
				url = g.cover.url;
			} catch (error) {}

			return createCard(g.name, g.slug, url);
		});

		setGameData(configuredData);
	};

	return (
		<main>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute" as "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "50vw",
						height: "50vh",
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
						borderRadius: "25px",
					}}
				>
					<Typography variant="h6" component="h2">
						{`Play ${currentGame.name}`}
					</Typography>
					<Divider />
					<Typography variant="h6" component="h2">
						What skills are you looking for?
					</Typography>

					<Stack direction="row" spacing={4}>
						<ToggleButtonGroup
							color="primary"
							exclusive
							value={soloAlignment}
							onChange={handleSoloChange}
							aria-label="Platform"
						>
							<ToggleButton value="Solo">Solo</ToggleButton>
							<ToggleButton value="Team">Team</ToggleButton>
						</ToggleButtonGroup>
						<ToggleButtonGroup
							color="primary"
							exclusive
							value={casualAlignment}
							onChange={handleCasualChange}
							aria-label="Platform"
						>
							<ToggleButton value="Casual">Casual</ToggleButton>
							<ToggleButton value="Competitive">Competitive</ToggleButton>
						</ToggleButtonGroup>
						<ToggleButtonGroup
							color="primary"
							exclusive
							value={offensiveAlignment}
							onChange={handleOffensiveChange}
							aria-label="Platform"
						>
							<ToggleButton value="Offensive">Offensive</ToggleButton>
							<ToggleButton value="Defensive">Defensive</ToggleButton>
						</ToggleButtonGroup>
						<ToggleButtonGroup
							color="primary"
							exclusive
							value={strategicAlignment}
							onChange={handleStrategicChange}
							aria-label="Platform"
						>
							<ToggleButton value="Strategic">Strategic</ToggleButton>
							<ToggleButton value="Creative">Creative</ToggleButton>
						</ToggleButtonGroup>
					</Stack>

					<Link
						href={{
							pathname: "/matchmake",
							query: {
								name: currentGame.name,
								solo: soloAlignment,
								casual: casualAlignment,
								offensive: offensiveAlignment,
								strategic: strategicAlignment,
							},
						}}
					>
						<Button
							style={{
								fontSize: "20px",
							}}
							variant="contained"
							size="medium"
						>
							Play
						</Button>
					</Link>
				</Box>
			</Modal>

			<Box
				sx={{
					height: 100,
					width: "50%",
					margin: "auto",
					padding: "10px",
				}}
			>
				<TextField
					sx={{ display: "flex" }}
					id="Search"
					label="Search Games"
					variant="standard"
					helperText="Search for games you want to find team mates for"
					onChange={getGames}
				/>
			</Box>

			<Box
				sx={{
					margin: "auto",
					width: "75%",
					borderRadius: "25px",
					mb: 2,
					minHeight: "75vh",
					maxHeight: "75vh",
					height: "20",
					overflow: "hidden",
					overflowY: "auto",
					backgroundColor: "DarkGray",
				}}
			>
				<Grid
					container
					spacing={0}
					direction="row"
					sx={{
						justifyContent: "space-evenly",
						justifyItems: "center",
						alignContent: "space-evenly",
						alignItems: "center",
					}}
				>
					{gameData.map((card) => (
						<Grid
							xs="auto"
							md="auto"
							sx={{
								justifyContent: "space-evenly",
								justifyItems: "center",
								alignContent: "space-evenly",
								alignItems: "center",
							}}
						>
							<Card
								sx={{
									m: 0.5,
									backgroundColor: "Gray",
								}}
							>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{card.name}
									</Typography>
									<img
										pointer-events="none"
										width="100%"
										height="100%"
										z-index={-1}
										srcSet={`${card.image}`}
										src={`${card.image}`}
										alt={card.name}
										loading="lazy"
									/>
								</CardContent>
								<CardActions>
									<Button
										style={{
											fontSize: "20px",
										}}
										variant="contained"
										size="medium"
										onClick={() => {
											setCurrentGame(card);
											handleOpen();
											setSoloAlignment("");
											setCasualAlignment("");
											setOffensiveAlignment("");
											setStrategicAlignment("");
										}}
									>
										Find Team
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		</main>
	);
}
