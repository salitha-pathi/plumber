import React, {useState} from 'react';
import ReactFlow, {Background, Controls, Edge, MiniMap, Node, Panel, useEdgesState, useNodesState} from 'reactflow';
import {Core} from './core/core'

import 'reactflow/dist/style.css';
import {BackgroundVariant} from "@reactflow/background";
import {Connection} from "@reactflow/core";
import {StartCard} from "./core/Components";


const startNode: Node = {
    id: 'start',
    type: 'startNode',
    data: {label: 'Start Node'},
    position: {x: 100, y: 100}
}

const nodeTypes = {
    startNode: StartCard,
};

export default function App() {

    const [nodes, setNodes, onNodesChange] = useNodesState([startNode]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [newNodeName, setNewNodeName] = useState('');

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const addNewEdge = (params: Connection) => {
        console.log(params.source, '>>', params.target)
        if (!params.source || !params.target) return;
        const edgeId = `${params.source}-${params.target}`
        if (edges.some(edge => edge.id === edgeId)) {
            setEdges(edges => edges.filter(edge => edge.id !== edgeId));
            return;
        }
        const newEdge: Edge = {
            id: edgeId, source: params.source, target: params.target
        }
        setEdges(edges => [...edges, newEdge]);
    }

    const addNewNode = () => {
        const newNode: Node = {id: newNodeName, position: {x: 200, y: 200}, data: {label: newNodeName}}
        setNodes(nodes => [...nodes, newNode])
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
                  <div style={{minWidth: '500px', height: '100px', backgroundColor: 'white'}}>
                      <input onChange={v => setNewNodeName(v.target.value)}/>
                      <button onClick={() => addNewNode()}> Add
                      </button>
                      <button onClick={() => execute()}> test
                      </button>
                  </div>
              </Panel>
              <Controls/>
              <MiniMap/>
              <Background variant={BackgroundVariant.Dots} gap={50} size={1}/>
          </ReactFlow>
      </div>
    );
}