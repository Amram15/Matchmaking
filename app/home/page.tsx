import { Box, TextField } from "@mui/material";

export default function Home() {
	return (
		<main>
			<Box
				sx={{
					height: 300,
					width: "50%",
          margin: 'auto',
					padding: "10px",
				}}
			>
				<TextField
					sx={{ display: "flex" }}
					id="Search"
					label="Search Games"
					variant="standard"
          helperText="Search for games you want to find team mates for"
				/>
			</Box>

			<Box></Box>
		</main>
	);
}
