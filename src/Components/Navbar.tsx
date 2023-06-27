import { AppBar, Box, Toolbar, Typography, Button, Stack, TextField, } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from '@mui/material/InputAdornment';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { NavLink } from "react-router-dom";
import logo from "../Assets/Images/Logo.jpg";
import { useTranslation } from "react-i18next";
const currencies = [
    {
        value: "english",
        label: "English",
    },
    {
        value: "franch",
        label: "French",
    },
];

export const Navbar = () => {
    const { t,i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log("language: ", lng)
    i18n.changeLanguage(lng);
  };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ bgcolor: "#723c0a", height: "120px" }}
            >
                <Toolbar sx={{ fontWeight: "500", fontFamily: "Cursive" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <img
                            alt="logo icon"
                            src={logo}
                            style={{ height: "80px", width: "80px" }}
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: "rgb(235, 252, 6)" }}
                    >
                        {t('MainHeader')}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ flexGrow: 1, "& a": { color: "white", ":hover": {borderBottom: '1px solid white'}, textTransform: 'none', textDecorationLine: 'none' } }}
                    >
                        <NavLink to='/'>{t("Navigation1")}</NavLink>
                        <NavLink to='/CustomPage'>{t("Navigation2")}</NavLink>
                        <NavLink to='/'>{t("Navigation3")}</NavLink>
                        <NavLink to='/'>{t("Navigation4")}</NavLink>
                        <NavLink to='/'>{t("Navigation5")}</NavLink>
                    </Stack>
                    <Stack direction="row" sx={{ flexGrow: 1 }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            defaultValue="english"
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start" sx={{color: 'white'}}>
                                    <GTranslateIcon />
                                  </InputAdornment>
                                ),
                                style: { color: "white" }
                              }}
                        >
                            {currencies.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    onClick={() => changeLanguage(option.value)}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button color="inherit"><PersonOutlineIcon/></Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            {/* <Divider sx={{margin: '15px 0 15px 0', borderWidth: '1px'}}/> */}
        </Box>
    );
};
