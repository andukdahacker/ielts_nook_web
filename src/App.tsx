import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import AuthLayout from "./features/auth/views/auth.layout";
import RegisterView from "./features/auth/views/register.view";
import SignInView from "./features/auth/views/sign_in.view";
import ClassView from "./features/class/class.view";
import ClassDetailView from "./features/class/class_detail.view";
import ExerciseView from "./features/exercise/exercise.view";
import ExerciseComposerView from "./features/exercise/exercise_composer.view";
import ExerciseDetailView from "./features/exercise/exercise_detail.view";
import HomeLayout from "./features/home/home.layout";
import HomeView from "./features/home/home.view";
import EditUserModal from "./features/users/edit_user.modal";
import UserDetailView from "./features/users/user_detail.view";
import UsersView from "./features/users/users.view";

const modals = {
  editUser: EditUserModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ fontFamily: "Montserrat, sans-serif" }}>
        <Notifications />
        <ModalsProvider modals={modals}>
          <BrowserRouter>
            <Routes>
              <Route element={<HomeLayout />}>
                <Route index path="/" element={<HomeView />} />
                <Route path="/users" element={<UsersView />} />
                <Route path="/users/:id" element={<UserDetailView />} />
                <Route path="/class" element={<ClassView />} />
                <Route path="/class/:id" element={<ClassDetailView />} />
                <Route path="/exercise" element={<ExerciseView />} />
                <Route path="/exercise/:id" element={<ExerciseDetailView />} />
                <Route
                  path="/exercise/composer"
                  element={<ExerciseComposerView />}
                />
              </Route>

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
