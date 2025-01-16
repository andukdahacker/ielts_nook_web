import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconLogout } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { firebaseAuth } from "../../core/firebase";

function HomeView() {
  const navigate = useNavigate();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signIn");
    }
  }, [navigate]);

  const handleSignOut = () => {
    modals.openConfirmModal({
      title: "Log out",
      children: (
        <>
          <Text size="sm">Are you sure you want to log out?</Text>
        </>
      ),
      labels: { confirm: "Log out", cancel: "Cancel" },
      onCancel: () => modals.closeAll(),
      onConfirm: async () => {
        await firebaseAuth.signOut();
        localStorage.removeItem("token");
        notifications.show({ message: "Logged out successfully" });
        navigate("/signIn");
      },
    });
  };

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group px={"md"} h="100%">
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
            <img src={"/src/assets/nook_logo_naked.png"} width={"60"} />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AppShell.Section>Navbar header</AppShell.Section>
          <AppShell.Section grow component={ScrollArea}>
            Scroll
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

        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    </>
  );
}

export default HomeView;
