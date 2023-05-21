import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {applyNodeChanges, Node, NodeChange} from "reactflow";

const startNode: Node = {
    id: 'start',
    type: 'startNode',
    data: {label: 'Start Node'},
    position: {x: window.innerWidth / 2, y: window.innerHeight / 5}
}

const nodeSlice = createSlice({
      name: 'nodes',
      initialState: [startNode],
      reducers: {
          addOne: (state, action: PayloadAction<Node>) => {
              state.push(action.payload)
              return state
          },
          applyChanges: (state, action: PayloadAction<NodeChange[]>) => {
              return applyNodeChanges(action.payload, state);
          },
      },
  }
)

export const nodeReducer = nodeSlice.reducer;
export const nodeActions = nodeSlice.actions;
export const selectNode = (state: RootState) => state.nodes;