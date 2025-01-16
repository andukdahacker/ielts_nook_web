import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import AuthLayout from "./features/auth/views/auth.layout";
import RegisterView from "./features/auth/views/register.view";
import SignInView from "./features/auth/views/sign_in.view";
import HomeView from "./features/home/home.view";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ fontFamily: "Montserrat, sans-serif" }}>
        <Notifications />
        <ModalsProvider>
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<HomeView />} />
              <Route element={<AuthLayout />}>
                <Route index path="register" element={<RegisterView />} />
                <Route path="signIn" element={<SignInView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
