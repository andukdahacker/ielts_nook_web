import { Center, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import client from "../../core/client";
import AuthContext from "./auth.context";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const result = await client.GET("/api/me/");

      if (result.error) {
        throw new Error(result.error.error);
      }

      return result.data.data;
    },
  });

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
