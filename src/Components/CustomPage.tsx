import React, { useState, ChangeEvent, useEffect, SetStateAction, useRef, } from "react";
import { Box, Paper, Typography, TextField, MenuItem, Divider, Avatar, Stack, Button, List, ListItem, ListItemAvatar, ListItemText, IconButton, ListItemSecondaryAction, } from "@mui/material";
import "../Css/Customstyle.css";
import DeleteIcon from "@mui/icons-material/Delete";
import bgimage from "../Assets/Images/bgimg.jpeg";
import BackgroundImg from "../Assets/Images/background.png";
import { BeadSize, wristSize } from "../Assets/Data/Data";
import { octokit } from "../Components/Octokit";
import { useCircleArrangement } from "./CircleArrange";
import { useTranslation } from "react-i18next";

type ButtonNameT = { name: string; value: string };
type customButton = { value: string; label: string };
type DropedStoneType = { Id: string; name: string; value: string };

export const CustomPage = () => {
    const {t} = useTranslation();
    const [ActiveBeadSize, setActiveBeadSize] = useState(BeadSize[2].value);
    const [ActiveWristSize, setActiveWristSize] = useState(wristSize[2].value);
    const circleRef = useRef<HTMLDivElement | null>(null);
    let circleItemLocation = useCircleArrangement(
        circleRef?.current!,
        ActiveBeadSize,
        ActiveWristSize
    );
    const [ButtonName, setButtonName] = useState<ButtonNameT[]>([]);
    const [activeButton, setActiveButton] = useState<ButtonNameT | undefined>();
    const [activeButtonData, setActiveButtonData] = useState<customButton[]>(
        []
    );
    const [dragOver, setDragOver] = useState(false);

    async function onLoad<T>(
        directory: React.PropsWithChildren<string>,
        setState: React.Dispatch<SetStateAction<T>>
    ) {
        await octokit
            .request(
                "/repos/{owner}/DataForBandb/contents/Assets/Dag/{directory}.json",
                { owner: "Ashutosh-Soni111", directory: directory }
            )
            .then((res) => {
                const content = JSON.parse(atob(res.data.content));
                setState(content);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        onLoad<ButtonNameT[]>("ButtonName", setButtonName);
        return () => {
            console.log("clean up code 1");
        };
    }, []);
    useEffect(() => {
        if (ButtonName.length > 0) {
            setActiveButton(ButtonName[0]);
            onLoad<customButton[]>(ButtonName[0].value, setActiveButtonData);
        }
        return () => {
            console.log("clean up code 2");
        };
    }, [ButtonName]);
    const ButtonHandler = (
        event: React.MouseEvent<HTMLButtonElement>,
        option: React.PropsWithChildren<ButtonNameT>
    ) => {
        event.preventDefault();
        setActiveButton(option);
        onLoad<customButton[]>(option.value, setActiveButtonData);
    };
    const StoneDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const currentId = event.currentTarget.id;
        setActiveDropStone((product) =>
            product.filter((option) => option.Id !== currentId)
        );
    };
    const handleWristSize = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setActiveWristSize(event.target.value);
    };
    const handleBeadSize = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setActiveBeadSize(event.target.value);
    };
    const [ActiveDropStone, setActiveDropStone] = useState<DropedStoneType[]>(
        []
    );
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);
    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        option: React.PropsWithChildren<customButton>
    ) => {
        // console.log("handleDragStart %s", event.currentTarget.id);
        event.dataTransfer.setData("value", option.value);
        event.dataTransfer.setData("label", option.label);
    };
    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const value = event.dataTransfer.getData("value");
        const label = event.dataTransfer.getData("label");

        const currentId = event.currentTarget.id;
        // console.log(currentId);
        const isFound = ActiveDropStone.some((element) => {
            return element.Id === currentId;
        });

        isFound
            ? setActiveDropStone(
                  ActiveDropStone.map((product) =>
                      product.Id === currentId
                          ? { ...product, name: label, value: value }
                          : product
                  )
              )
            : setActiveDropStone([
                  ...ActiveDropStone,
                  { Id: event.currentTarget.id, name: label, value },
              ]);
        setDragOver(false);
    };
    return (
        <Paper
            sx={{
                margin: "20px",
                padding: "25px",
                backgroundImage: `url(${BackgroundImg})`,
                boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
        >
            <Box sx={{ display: "flex", margin: "100px 0 100px 0" }}>
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: "15px",
                        "::after": { margin: "25px 0 25px 0" },
                    }}
                >
                    <Typography
                        variant={"h4"}
                        sx={{
                            fontFamily: "'Parisienne', cursive",
                            fontWeight: "700",
                            margin: "10px 0 10px 0",
                        }}
                    >
                        {t('HeaderOfBracelet')}
                    </Typography>
                    <Typography sx={{margin: "10px 0 10px 0", whiteSpace: 'pre-wrap', fontSize: '1.18em'}}>
                    {t("DetailsOfBracelet")}
                    </Typography>
                    <TextField
                        id="beadSize"
                        select
                        label="Bead Size"
                        defaultValue={BeadSize[2].value}
                        fullWidth
                        onChange={handleBeadSize}
                        sx={{ margin: "10px 0 10px 0" }}
                    >
                        {BeadSize.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="WristSize"
                        select
                        label="Wrist Size"
                        defaultValue={wristSize[2].value}
                        fullWidth
                        onChange={handleWristSize}
                        sx={{ margin: "10px 0 10px 0" }}
                    >
                        {wristSize.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        position: "relative",
                    }}
                >
                    <Box
                        ref={circleRef}
                        className="circle-container"
                        sx={{
                            position: "relative",
                            width: "22em",
                            height: "22em",
                            padding: "2.8em",
                            margin: "1em",
                        }}
                    >
                        {circleItemLocation?.map((degs, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: "absolute",
                                    top: `calc(50% + ${degs.y}px)`,
                                    left: `calc(50% + ${degs.x}px)`,
                                    transform: "translate(-50%, -50%)",
                                    width: "3em",
                                    height: "3em",
                                }}
                            >
                                <Avatar
                                    id={`${index}`}
                                    onDragOver={enableDropping}
                                    onDrop={handleDrop}
                                    onDragEnter={handleDragOverStart}
                                    onDragLeave={handleDragOverEnd}
                                    sx={{
                                        textAlign: "center",
                                        alignSelf: "center",
                                        display: "block",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    {ActiveDropStone.map(
                                        (dropStone: DropedStoneType) =>
                                            dropStone.Id === `${index}` ? (
                                                <>
                                                    {/* {console.log("dropStone",dropStone.value)} */}
                                                    <Avatar
                                                        key={dropStone.Id}
                                                        src={dropStone.value}
                                                        sx={{
                                                            height: "100%",
                                                            width: "100%",
                                                        }}
                                                        onDragStart={(e) =>
                                                            handleDragStart(e, {
                                                                value: dropStone.value,
                                                                label: dropStone.name,
                                                            })
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                ""
                                            )
                                    )}
                                </Avatar>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1, alignSelf: "center" }}>
                    <Box
                        sx={{
                            backgroundImage: `url(${bgimage})`,
                            backgroundSize: "100% 100%",
                            height: "250px",
                            width: "400px",
                            display: "flex",
                            alignSelf: `${
                                !ActiveDropStone.length ? "center" : ""
                            }`,
                            justifyContent: `${
                                !ActiveDropStone.length ? "center" : ""
                            }`,
                        }}
                    >
                        {!ActiveDropStone.length ? (
                            <>
                                <Typography
                                    sx={{
                                        alignSelf: "center",
                                        textAlign: "center",
                                    }}
                                >
                                   <pre style={{fontFamily: "none", margin: "0px"}}>{t("HeaderOfDrag&Drop")}</pre>
                                </Typography>
                            </>
                        ) : (
                            <List
                                sx={{
                                    maxHeight: "250px",
                                    width: "100%",
                                    overflow: "auto",
                                    padding: "0px",
                                    "& li": { border: "1px solid black" },
                                }}
                            >
                                {ActiveDropStone.map((option) => (
                                    <ListItem
                                        key={option.Id}
                                        secondaryAction={
                                            <ListItemSecondaryAction
                                                style={{
                                                    right: "11%",
                                                    left: "auto",
                                                }}
                                            >
                                                <IconButton
                                                    onClick={(event) =>
                                                        StoneDeleteHandler(
                                                            event
                                                        )
                                                    }
                                                    id={option.Id}
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={option.value}
                                                draggable="true"
                                                onDragStart={(e) =>
                                                    handleDragStart(e, {
                                                        value: option.value,
                                                        label: option.name,
                                                    })
                                                }
                                            />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {option.name}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Stack direction={"row"} spacing={0.2} sx={{ width: "80%" }}>
                    {ButtonName &&
                        ButtonName.map((BName) => (
                            <Button
                                id={BName.name}
                                key={BName.name}
                                name={BName.name}
                                value={BName.name}
                                variant="outlined"
                                sx={{
                                    border: "2px solid #723c0a",
                                    borderBottom: "none",
                                    width: "175px",
                                    height: "50px",
                                    color: "#ccc",
                                }}
                                onClick={(e) => ButtonHandler(e, BName)}
                            >
                                {BName.name}
                            </Button>
                        ))}
                </Stack>
            </Box>
            <Divider
                sx={{
                    border: "1px solid #fff",
                    width: "176px",
                    position: "absolute",
                    left: `${
                        activeButton?.name === "Beades"
                            ? "167px"
                            : activeButton?.name === "Gold"
                            ? "345px"
                            : activeButton?.name === "Silver"
                            ? "523px"
                            : activeButton?.name === "Stanles_Steel"
                            ? "701px"
                            : "0px"
                    }`,
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        borderTop: "2px solid black",
                        borderRight: "10px solid #ccc",
                        height: "250px",
                        width: "80%",
                    }}
                >
                    <Stack
                        direction={"row"}
                        spacing={2}
                        margin={"10px 10% 0 0"}
                    >
                        {/* activeButton?.value */}
                        {activeButtonData?.length > 0 &&
                            activeButtonData.map((option: customButton) => (
                                <Box sx={{ width: "11%" }} key={option.label}>
                                    <Typography
                                        sx={{
                                            width: "90%",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {option.label}
                                    </Typography>
                                    <Avatar
                                        id={option.label}
                                        src={`${process.env.REACT_APP_IMAGES_URL}${option.value}`}
                                        alt={option.label}
                                        draggable="true"
                                        onDragStart={(e) =>
                                            handleDragStart(e, {
                                                value: `${process.env.REACT_APP_IMAGES_URL}${option.value}`,
                                                label: option.label,
                                            })
                                        }
                                        sx={{
                                            width: "65px",
                                            height: "65px",
                                            margin: "10px 0 10px 0",
                                        }}
                                    />
                                </Box>
                            ))}
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
};
