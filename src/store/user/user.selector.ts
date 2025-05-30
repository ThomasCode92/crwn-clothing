import { UserState } from "@/store/user/user.reducer";

export const selectCurrentUser = (state: { user: UserState }) =>
  state.user.currentUser;
