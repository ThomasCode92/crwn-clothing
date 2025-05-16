import { User } from "firebase/auth";

import { USER_ACTION_TYPE } from "@/store/user/user.types";

type Action = {
  type: USER_ACTION_TYPE;
  payload: User | null;
};

export type UserState = {
  currentUser: User | null;
};

const INITIAL_STATE: UserState = {
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
