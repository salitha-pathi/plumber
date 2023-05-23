import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";

export interface NodeData {
    id: string;
    finalValue: any;
    data: any
}

const initialState: NodeData[] = []

const nodeDataSlice = createSlice({
      name: 'edges',
      initialState: initialState,
      reducers: {
          upsert: (state, action: PayloadAction<NodeData>) => {
              state = state.filter(s => action.payload.id !== s.id);
              state.push(action.payload)
              return state
          }
      },
  }
)

export const nodeDataReducer = nodeDataSlice.reducer;
export const nodeDataActions = nodeDataSlice.actions;
export const selectAllNodeData = (state: RootState) => state.nodeData;
export const selectOneNodeData = (id: string) => (state: RootState) => state.nodeData.find(n => n.id === id);