"use client";
import { Box, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
	return (
		<main>
			<Box
				sx={{
					width: "100vw",
					height: "100vh",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				{/*Logo*/}
				<Box
					sx={{
						display: "flex",
						position: "relative",
						height: "100%",
						width: "50%",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					Hello
				</Box>

				<Box
					component="form"
					sx={{
						height: "100%",
						width: "50%",
						display: "grid",
						gridTemplateColumns: "350px 350px",
						gridTemplateRows: "30px 10px 30px 50px 50px 50px 50px",
						gridTemplateAreas:
							'"header header" "subtitle subtitle" "Switch Switch" "DisplayName DisplayName" "Email Email" "Password Password" "Confirm Confirm" "Submit Submit"',
						columnGap: "10px",
						rowGap: "20px",
						alignContent: "center",
					}}
				>
					<Typography
						gridArea={"header"}
						justifySelf={"Center"}
						className="header"
						variant="h4"
						component={"h4"}
						sx={{ paddingBottom: "50px" }}
					>
						Sign Up
					</Typography>

					<Typography
						gridArea={"subtitle"}
						justifySelf={"Center"}
						className="header"
						variant="subtitle1"
						component={"h1"}
						sx={{ paddingBottom: "50px" }}
					>
						Create A New Account
					</Typography>

					<Typography
						gridArea={"Switch"}
						justifySelf={"Center"}
						variant="subtitle1"
					>
						Already have a account?{" "}
						<Link style={{ color: "#FFF" }} href="/login">
							Login
						</Link>
					</Typography>

					<TextField
						sx={{ gridArea: "DisplayName" }}
						variant="outlined"
						label="Display Name"
						type="text"
					/>

					<TextField
						sx={{ gridArea: "Email" }}
						variant="outlined"
						label="Email"
						type="text"
					/>

					<TextField
						sx={{ gridArea: "Password" }}
						variant="outlined"
						label="Password"
						type="password"
					/>
					<TextField
						sx={{ gridArea: "Confirm" }}
						variant="outlined"
						label="Confirm Password"
						type="password"
					/>

					<Button
						sx={{ gridArea: "Submit" }}
						type="submit"
						variant="contained"
						href="/signup/setup"
					>
						Signup
					</Button>
				</Box>
			</Box>
		</main>
	);
}
