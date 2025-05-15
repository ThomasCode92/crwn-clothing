import { User } from "firebase/auth";

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

const INITIAL_STATE: State = {
  currentUser: null,
};

export default function userReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
