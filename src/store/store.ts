import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
  type Middleware,
} from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import type { PersistConfig } from "redux-persist/lib/types";

import { rootReducer } from "@/store/root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [process.env.NODE_ENV !== "production" && logger].filter(
  (middleware): middleware is Middleware => Boolean(middleware),
);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers,
);

export const persistor = persistStore(store);
