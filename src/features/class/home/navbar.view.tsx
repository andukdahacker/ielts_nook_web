import { Box, NavLink } from "@mantine/core";
import {
  Icon,
  IconHome,
  IconProps,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserRole } from "../../../schema/types";
import AuthContext from "../../auth/auth.context";

const navs: {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  to: string;
  role: UserRole[];
}[] = [
  {
    icon: IconHome,
    label: "Home",
    to: "/",
    role: ["ADMIN", "STUDENT", "TEACHER"],
  },
  {
    icon: IconUsers,
    label: "Users",
    to: "/users",
    role: ["ADMIN"],
  },
  {
    icon: IconUsersGroup,
    label: "Classes",
    to: "/class",
    role: ["ADMIN", "TEACHER"],
  },
];

function NavBarView() {
  const location = useLocation();
  const navigate = useNavigate();

  const { role } = useContext(AuthContext);

  const [active, setActive] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActive(0);
        return;
      case "/users":
        setActive(1);
        return;
      case "/class":
        setActive(2);
        return;
    }
  }, [location]);

  const items = navs.map((nav, index) => {
    if (!nav.role.includes(role!)) {
      return <></>;
    }

    return (
      <NavLink
        // href="#required-for-focus"
        key={nav.label}
        active={index == active}
        label={nav.label}
        leftSection={<nav.icon size={16} stroke={1.5} />}
        onClick={() => navigate(nav.to)}
      />
    );
  });

  return <Box>{items}</Box>;
}

export default NavBarView;
