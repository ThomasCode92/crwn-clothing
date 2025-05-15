import { User } from "firebase/auth";

import { USER_ACTION_TYPE } from "@/store/user/user.types";
import { createAction } from "@/utils/reducer";

export function setCurrentUser(user: User | null) {
  return createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
}
