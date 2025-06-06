import type { Middleware, UnknownAction } from "redux";

import type { RootState } from "@/store/root-reducer";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const loggerMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    if (isUnknownAction(action)) {
      if (!action.type) next(action);

      console.log("type: ", action.type);
      console.log("payload: ", action.payload);
      console.log("current state: ", store.getState());

      next(action);

      console.log("next state: ", store.getState());
    }
  };

function isUnknownAction(action: unknown): action is UnknownAction {
  return typeof action === "object" && action !== null && "type" in action;
}
