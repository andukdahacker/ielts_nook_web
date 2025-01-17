import { Box, Flex, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function AuthLayout() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Flex direction="row" h={"100vh"}>
        <Box flex={1} p={"md"}>
          <Outlet />
        </Box>

        <Box flex={2} visibleFrom="md" color={theme.colors.orange[9]}></Box>
      </Flex>
    </>
  );
}

export default AuthLayout;
