// HACK: redux-persist types are not compatible with the latest redux types
// see Github issue: https://github.com/rt2zz/redux-persist/issues/1459

declare module "redux-persist" {
  export function persistReducer<S, A extends Action = Action, P = S>(
    config: PersistConfig<S>,
    baseReducer: Reducer<S, A, P>,
  ): Reducer<
    S & { _persist: PersistState },
    A,
    P & { _persist?: PersistState }
  >;
}
