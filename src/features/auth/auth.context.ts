import { createContext } from "react";
import { Center, User, UserRole } from "../../schema/types";

interface IAuthContext {
  authenticated: boolean;
  isLoading: boolean;
  role?: UserRole;
  center?: Center;
  user?: User;
  centerId?: string;
}

const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  isLoading: false,
});

export default AuthContext;
