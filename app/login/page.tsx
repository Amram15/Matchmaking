"use client";
import { Box, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
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
						gridTemplateRows: "30px 10px 30px 50px 50px 20px 50px",
						gridTemplateAreas:
							'"header header" "subtitle subtitle" "Switch Switch" "Email Email" "Password Password" ". Forgot" "Submit Submit"',
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
						Match Making
					</Typography>

					<Typography
						gridArea={"subtitle"}
						justifySelf={"Center"}
						className="header"
						variant="subtitle1"
						component={"h1"}
						sx={{ paddingBottom: "50px" }}
					>
						Log in to manage your account
					</Typography>

					<Typography
						gridArea={"Switch"}
						justifySelf={"Center"}
						variant="subtitle1"
					>
						Don't have an account?{" "}
						<Link style={{ color: "#FFF" }} href="/signup">
							Sign up
						</Link>
					</Typography>

					<TextField
						sx={{ gridArea: "Email" }}
						variant="outlined"
						label="Email/Username"
						type="text"
					/>
					<TextField
						sx={{ gridArea: "Password" }}
						variant="outlined"
						label="Password"
						type="password"
					/>

					<Button
						variant="text"
						sx={{ gridArea: "Forgot", justifySelf: "end" }}
						onClick={() => {
							redirect("/forgot-password");
						}}
					>
						Forgot your password?
					</Button>

					<Button type="submit" variant="contained" sx={{ gridArea: "Submit" }}>
						Login
					</Button>
				</Box>
			</Box>
		</main>
	);
}
