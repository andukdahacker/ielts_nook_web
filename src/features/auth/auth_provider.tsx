import { Center, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "./auth.context";
import useMe from "./hooks/use_me.hook";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useMe();

  useEffect(() => {
    if (error) {
      notifications.show({ message: error.message, color: "red" });
      navigate("/signIn");
    }
  }, [error, navigate]);

  return (
    <AuthContext.Provider
      value={{
        authenticated: data != undefined,
        center: data?.center,
        user: data?.user,
        role: data?.user?.role,
        isLoading,
      }}
    >
      {isLoading ? (
        <Center h={"100vh"}>
          <Loader />
        </Center>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
