"use client";
import { Inter } from "next/font/google";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";

const themeOptions: ThemeOptions = createTheme({
	palette: {
		mode: "dark",
	},
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<title>Match Making</title>
			</Head>
			<body>
				<ThemeProvider theme={themeOptions}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
