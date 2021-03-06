import { render } from "solid-js/web";
import App from "./App";
import { SupabaseProvider } from "solid-supabase";
import supabase_client from "./supabase_client";
import { Router } from "solid-app-router";

import "./index.styl";
import "@fontsource/roboto";

render(() => (
    <SupabaseProvider client={supabase_client}>
        <Router>
            <App />
        </Router>
    </SupabaseProvider>
), document.getElementById("app") as HTMLElement);
