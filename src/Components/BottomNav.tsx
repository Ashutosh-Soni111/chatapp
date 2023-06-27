import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Stack,
    // Divider,
    Avatar,
    Typography,
    List,
    ListItem,
    ListSubheader,
} from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";


const contents = [
    {
        subHead: "contact us",
        item1: "B&B's Gems",
        item2: "contact@B&Bgems.fr",
    },
    {
        subHead: "products",
        item1: "Bracelet",
        item2: "Beads",
    },
    {
        subHead: "Shop",
        item1: "In regards to",
        item2: "",
    },
    {
        subHead: "client area",
        item1: "Orders",
        item2: "Coupons",
    },
];

export const BottomNav = () => {
    return (
        <Box sx={{ position: "static", width: "100%" }}>
            {/* <Divider sx={{ margin: "15px 0 15px 0", borderWidth: "1px" }} /> */}
            <AppBar position="static" sx={{ bgcolor: "#723c0a" }}>
                <Toolbar
                    sx={{
                        fontWeight: "500",
                        fontFamily: "Cursive",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{}}>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            sx={{
                                "& div": {
                                    bgcolor: "rgba(0,0,0,0)",
                                    border: "1px solid white",
                                },
                            }}
                        >
                            <Avatar variant="square">
                                <FacebookIcon sx={{ color: "white" }} />
                            </Avatar>
                            <Avatar variant="square">
                                <TwitterIcon sx={{ color: "white" }} />
                            </Avatar>
                            <Avatar variant="square">
                                <YouTubeIcon sx={{ color: "white" }} />
                            </Avatar>
                            <Avatar variant="square">
                                <PinterestIcon sx={{ color: "white" }} />
                            </Avatar>
                            <Avatar variant="square">
                                <InstagramIcon sx={{ color: "white" }} />
                            </Avatar>
                        </Stack>
                    </Box>
                </Toolbar>

                <Toolbar sx={{bgcolor: "white", color: "black" }}>
                    <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, margin: "0 10vw 0 10vw" }}>
                        {contents.map((content) => (
                            <List
                                sx={{ flexGrow: 1 }}
                                dense={true}
                                subheader={
                                    <ListSubheader
                                        sx={{
                                            fontWeight: "750",
                                            color: "black",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {content.subHead}
                                    </ListSubheader>
                                }
                            >
                                <ListItem>{content.item1}</ListItem>
                                <ListItem>{content.item2}</ListItem>
                            </List>
                        ))}
                    </Box>
                </Toolbar>

                <Toolbar sx={{ justifyContent: "center" }}>
                    <Box>
                        <Typography fontSize={"small"}>
                            {" "}
                            &copy; 2023 CopyRight
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
