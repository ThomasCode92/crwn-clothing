import { User } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "@/utils/firebase";

interface IUserContext {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export enum USER_ACTION_TYPE {
  SET_CURRENT_USER = "SET_CURRENT_USER",
}

type Action = {
  type: USER_ACTION_TYPE;
  payload: User | null;
};

type State = {
  currentUser: User | null;
};

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const INITIAL_STATE: State = {
  currentUser: null,
};

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  function setCurrentUser(user: User | null) {
    dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user });
  }

  const value = { currentUser: state.currentUser, setCurrentUser };

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
