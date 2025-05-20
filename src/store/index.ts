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

import { rootReducer, type RootState } from "@/store/root-reducer";

// helper type for persist config
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const middlewares = [process.env.NODE_ENV !== "production" && logger].filter(
  (middleware): middleware is Middleware => Boolean(middleware),
);

// use redux devtools extension in development mode
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancer = composeEnhancer(applyMiddleware(...middlewares));

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancer);
export const persistor = persistStore(store);
