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

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useContext } from "react";
import { firebaseAuth } from "../../core/firebase";
import AuthProvider from "../auth/auth_provider";
import HomeContext from "./home.context";
import NavBarView from "./navbar.view";

dayjs.extend(duration);

function HomeLayout() {
  const navigate = useNavigate();

  const { showTimer, timer } = useContext(HomeContext);

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
        layout="alt"
        header={{ height: 65 }}
        navbar={{
          width: 240,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <AppShell.Header>
          <Flex
            justify={"center"}
            direction={"row"}
            align={"center"}
            w="100%"
            h={"100%"}
            p={"xs"}
          >
            <Group w="100%" justify="start" align="center">
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
              {showTimer && (
                <Text>
                  {dayjs
                    .duration(timer, "seconds")
                    .format("mm [minutes] ss [seconds remaining]")}
                </Text>
              )}
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
            <Group>
              <ActionIcon
                variant="transparent"
                aria-label="logOut"
                onClick={handleSignOut}
              >
                <IconLogout />
              </ActionIcon>
            </Group>
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
