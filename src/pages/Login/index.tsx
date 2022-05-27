import { Component, Show } from "solid-js";
import { createOnAuthStateChange, createSupabaseAuth } from "solid-supabase";
import { Navigate, useNavigate } from "solid-app-router";
import getDeviceId from "../../helpers/getDeviceId";
import Box from "@suid/material/Box";

import Card from "@suid/material/Card";
import Typography from "@suid/material/Typography";
import CardHeader from "@suid/material/CardHeader";

import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemButton from "@suid/material/ListItemButton";
import ListItemIcon from "@suid/material/ListItemIcon";
import ListItemText from "@suid/material/ListItemText";
import SvgIcon from "@suid/material/SvgIcon";

const Login: Component = () => {
    const auth = createSupabaseAuth();
    const navigate = useNavigate();
    const signInWithGithub = async () => {
        await auth.signIn({
            provider: "github",
        });
    };
    createOnAuthStateChange((_, session) => {
        // Check again to force jump back.
        // The Show's fallback could not be rendered when jumping back from supabase.
        // TODO: allow jumping back to specific address.
        if (session) {
            getDeviceId(); // Ensure we have a device identity.
            if (session.user) {
                navigate("/");
            }
        }
    });
    return (<>

        <Show when={!auth.user()} fallback={<Navigate href="/" />}>
            <div class="viewpoint-centre">

                {/* <button className="loginbutton" onClick={signInWithGithub}><span>GitHub</span></button> */}

                <Card sx={{ minWidth: 300 }}>
                    <CardHeader title={<Typography variant="h6">使用第三方登录</Typography>}>
                    </CardHeader>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
                        <br />
                        <Box sx={{ width: "100%", minWidth: 360, bgcolor: "background.paper" }}>
                            <nav aria-label="main mailbox folders"></nav>
                            <List >
                                <ListItem disablePadding onClick={signInWithGithub}>
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <SvgIcon sx={{width: 32, height: 32}} viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                            </SvgIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="使用GitHub登录" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>



                    </Typography>
                </Card>
            </div>

        </Show>
        <style jsx>{`
        .viewpoint-centre {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        `}

        </style>
    </>);
};

export default Login;
