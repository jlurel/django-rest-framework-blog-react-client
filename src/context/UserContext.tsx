import { Context, createContext, useState } from "react";
import {
  AuthUserType,
  UserContextType,
  UserContextProviderPropsType,
} from "../types";

const UserContext: Context<UserContextType | null> =
  createContext<UserContextType | null>(null);

export const UserContextProvider = ({
  children,
}: UserContextProviderPropsType) => {
  const [user, setUser] = useState<AuthUserType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
