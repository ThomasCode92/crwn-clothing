import { User } from "firebase/auth";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "@/utils/firebase";

interface IUserContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
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

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      console.log(user);
      if (user) createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
