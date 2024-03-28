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
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ShieldIcon from "@mui/icons-material/Shield";

export default function Home() {
	return (
		<main>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid xs={8}>
						Solo/Team
						<Rating
							name="customized-color"
							defaultValue={0}
							getLabelText={(value: number) => ""}
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
							precision={1}
							icon={<ShieldIcon fontSize="inherit" />}
							emptyIcon={<ShieldOutlinedIcon fontSize="inherit" />}
						/>
					</Grid>
				</Grid>
				<Divider />
				<Grid container spacing={2}>
					<Grid xs={8}>
						Offensive/Defensive
						<Rating
							name="customized-color"
							defaultValue={0}
							getLabelText={(value: number) => ""}
							precision={1}
							icon={<ShieldIcon fontSize="inherit" />}
							emptyIcon={<ShieldOutlinedIcon fontSize="inherit" />}
						/>
					</Grid>
				</Grid>
			</Box>
		</main>
	);
}
