import React from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, {Background, Controls, Edge, EdgeChange, MiniMap, Node, NodeChange, Panel} from 'reactflow';
import {BackgroundVariant} from "@reactflow/background";
import {Connection} from "@reactflow/core";
import {useDispatch, useSelector} from "react-redux";

import {Core} from './core/core'
import {FieldMapperCard, RestApiCallCard, StartCard} from "./cards";
import {nodeActions, selectNode} from "./core/store/slices/node.slice.ts";
import {edgeActions, selectEdges} from "./core/store/slices/edge.slice.ts";
import {TopPanel} from "./core/components";

const nodeTypes = {
    startNode: StartCard,
    restApiCallCard: RestApiCallCard,
    fieldMapperCard: FieldMapperCard
};

export default function App() {

    const dispatch = useDispatch();

    const nodes = useSelector(selectNode)
    const edges = useSelector(selectEdges)

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const addNewEdge = (params: Connection) => {
        console.log(params.source, '>>', params.target)
        if (!params.source || !params.target) return;
        const edgeId = `${params.source}-${params.target}`
        if (edges.some(edge => edge.id === edgeId)) {
            dispatch(edgeActions.removeById(edgeId))
            return;
        }
        const newEdge: Edge = {
            id: edgeId, source: params.source, target: params.target
        }
        console.log(newEdge)
        dispatch(edgeActions.addOne(newEdge))
    }

    const addNewNode = (name: string, type: string) => {
        if (!name || !type) return;
        const newNode: Node = {
            id: name,
            position: {x: 200, y: 200},
            type: type,
            data: {label: name}
        }
        dispatch(nodeActions.addOne(newNode));
    }

    const onNodesChange = (changes: NodeChange[]) => {
        dispatch(nodeActions.applyChanges(changes))
    }

    const onEdgesChange = (changes: EdgeChange[]) => {
        dispatch(edgeActions.applyChanges(changes))
    }

    const execute = () => {
        const graphCore = new Core();
        for (let node of nodes) {
            graphCore.addVertix(node.id);
        }

        for (let edge of edges) {
            graphCore.addEdge(edge.source, edge.target);
        }

        graphCore.test()
    }

    return (
      <div style={{width: '100vw', height: '100vh'}}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={addNewEdge}
            proOptions={{hideAttribution: true}}
            nodeTypes={nodeTypes}
          >
              <Panel position="top-center">
                  <TopPanel addNewNode={addNewNode}  execute={execute} />
              </Panel>
              <Controls/>
              <MiniMap/>
              <Background variant={BackgroundVariant.Dots} gap={50} size={1}/>
          </ReactFlow>
      </div>
    );
}