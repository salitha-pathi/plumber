import React, {memo} from "react";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Handle, Position} from "reactflow";
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Editor} from "@monaco-editor/react";
import {selectNode} from "../../core/store/slices/node.slice.ts";
import {NodeData, nodeDataActions, selectOneNodeData} from "../../core/store/slices/node-data.slice.ts";


export interface AdvancedMapperCardProps {
    data: {
        id: string;
    };
    isConnectable: boolean;
}

export const AdvancedMapperCard = memo(({data, isConnectable}: AdvancedMapperCardProps) => {

    const dispatch = useDispatch();
    const node = useSelector(selectNode(data.id), shallowEqual)
    const nodeData = useSelector(selectOneNodeData(data.id), shallowEqual)

    const onEditorChange = (code?: string) => {
        if (!node) return;
        if (!nodeData) {
            const newNodeData: NodeData = {
                id: node.id,
                data: code,
                finalValue: {},
            }
            dispatch(nodeDataActions.upsert(newNodeData))
        } else {
            const newNodeData: NodeData = {
                ...nodeData,
                data: code
            };
            dispatch(nodeDataActions.upsert(newNodeData))
        }
    }


    return (
      <>
          <Handle
            type="target"
            position={Position.Left}
            id="a"
            style={{background: '#555'}}
            isConnectable={isConnectable}
          />
          <React.Fragment>
              <Paper variant='outlined'
                     style={{
                         padding: '15px',
                         margin: '5px'
                     }}>
                  <Grid container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                  >
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                          Map Fields
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          {data.id}
                      </Typography>
                      <Paper elevation={3}>
                          <Editor
                            height="20vh"
                            width='400px'
                            theme='vs-dark'
                            defaultLanguage="javascript"
                            defaultValue="// write your mapping here"
                            value={nodeData?.data}
                            onChange={e => onEditorChange(e)}
                            options={{
                                fontSize: 12,
                                renderValidationDecorations: 'off',
                                minimap: {enabled: false}
                            }}
                          />
                      </Paper>
                  </Grid>
              </Paper>
          </React.Fragment>
          <Handle
            type="source"
            position={Position.Right}
            id="a"
            style={{background: '#555'}}
            isConnectable={isConnectable}
          />
      </>)
})
