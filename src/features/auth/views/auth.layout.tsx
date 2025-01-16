import { Box, Flex, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router";

function AuthLayout() {
  const theme = useMantineTheme();
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
