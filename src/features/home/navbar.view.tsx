import { NavLink, Stack } from "@mantine/core";
import {
  Icon,
  IconBooks,
  IconHome,
  IconLibrary,
  IconProps,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserRole } from "../../schema/types";
import AuthContext from "../auth/auth.context";

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
  {
    icon: IconBooks,
    label: "Exercises",
    to: "/exercise",
    role: ["ADMIN", "TEACHER"],
  },
  {
    icon: IconLibrary,
    label: "Assigments",
    to: "/assignment",
    role: ["STUDENT"],
  },
];

function NavBarView() {
  const location = useLocation();
  const navigate = useNavigate();

  const { role } = useContext(AuthContext);

  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const items = navs.map((nav) => {
    if (!nav.role.includes(role!)) {
      return <Fragment key={nav.label}></Fragment>;
    }

    return (
      <NavLink
        key={nav.label}
        active={nav.to == active}
        label={nav.label}
        leftSection={<nav.icon size={16} stroke={1.5} />}
        onClick={() => navigate(nav.to)}
      />
    );
  });

  return (
    <Stack justify="center" align="center">
      {items}
    </Stack>
  );
}

export default NavBarView;
