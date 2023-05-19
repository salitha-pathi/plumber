import React, {useState} from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, {Background, Controls, Edge, MiniMap, Node, Panel, useEdgesState, useNodesState} from 'reactflow';
import {BackgroundVariant} from "@reactflow/background";
import {Connection} from "@reactflow/core";
import {FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import FastForwardIcon from '@mui/icons-material/FastForward';

import {Core} from './core/core'
import {RestApiCallCard, StartCard} from "./core/Components";
import {FieldMapperCard} from "./core/Components/field-mapper-card/field-mapper-card.tsx";

const startNode: Node = {
    id: 'start',
    type: 'startNode',
    data: {label: 'Start Node'},
    position: {x: window.innerWidth / 2, y: window.innerHeight / 5}
}

const nodeTypes = {
    startNode: StartCard,
    restApiCallCard: RestApiCallCard,
    fieldMapperCard: FieldMapperCard
};

export default function App() {

    const [nodes, setNodes, onNodesChange] = useNodesState([startNode]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [newNodeName, setNewNodeName] = useState('');
    const [newNodeType, setNewNodeType] = useState('');

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
        if (!newNodeName) return;
        const newNode: Node = {
            id: newNodeName,
            position: {x: 200, y: 200},
            type: newNodeType,
            data: {label: newNodeName}
        }
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
                  <Paper style={{padding: '20px', width: '80vW'}}>
                      <Grid container
                            spacing={2}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                      >
                          <Grid item xs={3}>
                              <FormControl fullWidth>
                                  <InputLabel>Select type</InputLabel>
                                  <Select label='Select type'
                                          labelId="demo-simple-select-helper-label"
                                          variant='outlined'
                                          onChange={v => setNewNodeType(v.target.value as any)}
                                          fullWidth
                                          size='small'
                                  >
                                      <MenuItem value={'restApiCallCard'}>REST API Call</MenuItem>
                                      <MenuItem value={'fieldMapperCard'}>Mapper</MenuItem>
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item xs={7}>
                              <TextField size='small'
                                         label='New Node Name'
                                         fullWidth
                                         onChange={(v) => setNewNodeName(v.target.value)}
                              />
                          </Grid>
                          <Grid item xs={1}>
                              <Button variant="outlined"
                                      size='medium'
                                      onClick={() => addNewNode()}
                              >Add</Button>
                          </Grid>
                          <Grid item xs={1}>
                              <Button variant="outlined"
                                      size='medium'
                                      color="error"
                                      onClick={() => execute()}
                              ><FastForwardIcon/>&nbsp;Run</Button>
                          </Grid>
                      </Grid>
                  </Paper>
              </Panel>
              <Controls/>
              <MiniMap/>
              <Background variant={BackgroundVariant.Dots} gap={50} size={1}/>
          </ReactFlow>
      </div>
    );
}