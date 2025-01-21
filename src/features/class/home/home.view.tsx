import { useContext } from "react";
import AuthContext from "../../auth/auth.context";

function HomeView() {
  const { center, role, user } = useContext(AuthContext);

  if (center) {
    return <>This is IELTS Center {center.name}</>;
  }

  if (user) {
    switch (role) {
      case "ADMIN":
        return <>Hello Admin ${user.username}</>;
      case "TEACHER":
        return <>Hello Teacher ${user.username}</>;
      case "STUDENT":
        return <>Hello Student ${user.username}</>;
    }
  }

  return <>Unsupported role</>;
}

export default HomeView;
