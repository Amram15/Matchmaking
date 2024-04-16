"use client";
import { Box, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseapp";

export default function Login() {
	const app = initFirebase();
	const auth = getAuth(app);
	const router = useRouter();

	//data
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//error control
	const [emailErr, setEmailErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");

	const handleLogin = async (form) => {
		form.preventDefault();

		setEmailErr("");
		setPasswordErr("");

		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;
				router.push("/home");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				switch (errorCode) {
					case "auth/invalid-email":
						setEmailErr("Please enter valid email");
						break;
					case "auth/wrong-password":
						setPasswordErr("Incorrect password");
						break;
					case "auth/user-disabled":
						setEmailErr("Account not enabled");
						break;
					case "auth/user-not-found":
						setEmailErr("Account not found");
						break;
					default:
						setEmailErr(errorMessage);
						setPasswordErr(errorCode);
						break;
				}
			});
	};

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
					onSubmit={handleLogin}
					noValidate
					autoComplete="off"
					sx={{
						height: "100%",
						width: "50%",
						display: "grid",
						gridTemplateColumns: "350px 350px",
						gridTemplateRows: "30px 10px 30px 65px 65px 20px 50px",
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
						error={emailErr != ""}
						helperText={emailErr}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						sx={{ gridArea: "Password" }}
						variant="outlined"
						label="Password"
						type="password"
						error={passwordErr != ""}
						helperText={passwordErr}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						variant="text"
						sx={{ gridArea: "Forgot", justifySelf: "end" }}
						onClick={() => {
							router.push("/forgot-password");
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
