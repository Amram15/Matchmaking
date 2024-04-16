"use client";
import { initFirebase } from "@/firebase/firebaseapp";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
	const app = initFirebase();
	const auth = getAuth(app);
	const firestore = getFirestore(app);
	const router = useRouter();

	//data
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	//error control
	const [formSubmit, setFormSubmit] = useState(false);
	const [emailErr, setEmailErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [repasswordErr, setRePasswordErr] = useState("");

	const handleSignup = async (form) => {
		form.preventDefault();

		setFormSubmit(true);
		setEmailErr("");
		setPasswordErr("");
		setRePasswordErr("");

		if (!email || !password || !rePassword) {
			if (!email) setEmailErr("Enter email");
			if (!password) setPasswordErr("Enter password");
			if (!rePassword) setRePasswordErr("Retype password");

			return;
		}

		if (password != rePassword) {
			setPasswordErr("Passwords must match");
			setRePasswordErr("Passwords must match");

			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;
				sendEmailVerification(user);

				const userRef = doc(firestore, "Users", user.uid);
				await setDoc(userRef, {
					email: email,
				});

				router.push("/signup/setup");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				switch (errorCode) {
					case "auth/email-already-in-use":
						setEmailErr("Email aldrady in use");
						break;
					case "auth/invalid-email":
						setEmailErr("Please enter valid email");
						break;
					case "auth/weak-password":
						setPasswordErr("Password should be at least 6 characters");
						setRePasswordErr("Password should be at least 6 characters");
						break;
					default:
						setEmailErr(errorMessage);
						setPasswordErr(errorMessage);
						setRePasswordErr(errorMessage);
						break;
				}
				// ..
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
					onSubmit={handleSignup}
					noValidate
					autoComplete="off"
					sx={{
						height: "100%",
						width: "50%",
						display: "grid",
						gridTemplateColumns: "350px 350px",
						gridTemplateRows: "30px 10px 30px 60px 60px 60px",
						gridTemplateAreas:
							'"header header" "subtitle subtitle" "Switch Switch" "Email Email" "Password Password" "Confirm Confirm" "Submit Submit"',
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
						sx={{ gridArea: "Email" }}
						variant="outlined"
						label="Email"
						type="text"
						error={emailErr && formSubmit ? true : false}
						helperText={emailErr && formSubmit ? emailErr : ""}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextField
						sx={{ gridArea: "Password" }}
						variant="outlined"
						label="Password"
						type="password"
						error={passwordErr && formSubmit ? true : false}
						helperText={passwordErr && formSubmit ? passwordErr : ""}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						sx={{ gridArea: "Confirm" }}
						variant="outlined"
						label="Confirm Password"
						type="password"
						error={repasswordErr && formSubmit ? true : false}
						helperText={repasswordErr && formSubmit ? repasswordErr : ""}
						onChange={(e) => setRePassword(e.target.value)}
					/>

					<Button sx={{ gridArea: "Submit" }} type="submit" variant="contained">
						Signup
					</Button>
				</Box>
			</Box>
		</main>
	);
}
