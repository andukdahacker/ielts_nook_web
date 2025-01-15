import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./features/auth/sign_in/views/auth.layout";
import RegisterView from "./features/auth/sign_in/views/register.view";
import SignInView from "./features/auth/sign_in/views/sign_in.view";
import HomeView from "./features/home/home.view";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomeView />} />
        <Route element={<AuthLayout />}>
          <Route index path="register" element={<RegisterView />} />
          <Route path="signIn" element={<SignInView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
