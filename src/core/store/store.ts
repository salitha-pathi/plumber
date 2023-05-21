import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {edgeReducer} from "./slices/edge.slice.ts";
import {nodeReducer} from "./slices/node.slice.ts";

export const store = configureStore({
  reducer: {
    edges: edgeReducer,
    nodes: nodeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
