import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconLogout, IconMoon, IconSun } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router";

import { firebaseAuth } from "../../core/firebase";
import AuthProvider from "../auth/auth_provider";
import NavBarView from "./navbar.view";

function HomeLayout() {
  const navigate = useNavigate();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

  const handleSignOut = () => {
    modals.openConfirmModal({
      title: "Log out",
      centered: true,
      children: (
        <>
          <Text size="sm">Are you sure you want to log out?</Text>
        </>
      ),
      labels: { confirm: "Log out", cancel: "Cancel" },
      onConfirm: async () => {
        const id = notifications.show({
          message: "Logging out...",
          autoClose: false,
        });
        await firebaseAuth.signOut();
        localStorage.removeItem("token");
        notifications.hide(id);
        notifications.show({ message: "Logged out successfully" });
        navigate("/signIn");
      },
    });
  };

  return (
    <AuthProvider>
      <AppShell
        header={{ height: 65 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header p={"xs"}>
          <Flex justify={"center"} direction={"row"} w="100%">
            <Group w="100%" justify="start">
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="sm"
              />
            </Group>
            <Box>
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light",
                  )
                }
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                <Box darkHidden>
                  <IconSun stroke={1.5} />
                </Box>

                <Box lightHidden>
                  <IconMoon stroke={1.5} />
                </Box>
              </ActionIcon>
            </Box>
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AppShell.Section grow>
            <NavBarView />
          </AppShell.Section>
          <AppShell.Section>
            <ActionIcon
              variant="transparent"
              aria-label="logOut"
              onClick={handleSignOut}
            >
              <IconLogout />
            </ActionIcon>
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </AuthProvider>
  );
}

export default HomeLayout;
