import { Box, NavLink } from "@mantine/core";
import { IconHome, IconUsers } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
const navs = [
  { icon: IconHome, label: "Home", to: "/" },
  {
    icon: IconUsers,
    label: "Users",
    to: "/users",
  },
];

function NavBarView() {
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActive(0);
        return;
      case "/users":
        setActive(1);
        return;
    }
  }, [location]);

  const items = navs.map((nav, index) => (
    <NavLink
      href="#required-for-focus"
      key={nav.label}
      active={index == active}
      label={nav.label}
      leftSection={<nav.icon size={16} stroke={1.5} />}
      onClick={() => navigate(nav.to)}
    />
  ));

  return <Box>{items}</Box>;
}

export default NavBarView;
