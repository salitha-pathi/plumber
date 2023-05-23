import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {applyEdgeChanges, Edge, EdgeChange} from "reactflow";

const initialState: Edge[] = []

const edgeSlice = createSlice({
      name: 'edges',
      initialState: initialState,
      reducers: {
          addOne: (state, action: PayloadAction<Edge>) => {
              console.log(action)
              state = state.filter(s => action.payload.target !== s.target);
              state.push(action.payload)
              return state
          },
          removeById: (state, action:PayloadAction<string>) => {
              return  state?.filter(s=>s?.id !== action.payload)
          },
          applyChanges: (state, action: PayloadAction<EdgeChange[]>) => {
              return applyEdgeChanges(action.payload, state);
          },
      },
  }
)

export const edgeReducer = edgeSlice.reducer;
export const edgeActions = edgeSlice.actions;
export const selectEdges = (state: RootState) => state.edges;