import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IUserContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
