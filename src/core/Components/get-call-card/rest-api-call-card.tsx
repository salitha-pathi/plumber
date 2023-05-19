import React, {memo, useState} from "react";
import {Handle, Position} from "reactflow";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import {Chip, Stack, TextField} from "@mui/material";


export interface RestApiCallCardProps {
    data: {
        label: string;
    };
    isConnectable: boolean;
}

export const RestApiCallCard = memo(({data, isConnectable}: RestApiCallCardProps) => {
    const [requestType, setRequestType] = useState('GET');

    const [endpoint, setEndpoint] = useState('')

    return (
      <>
          <Handle
            type="target"
            position={Position.Top}
            id="a"
            style={{background: '#555'}}
            isConnectable={isConnectable}
          />
          <React.Fragment>
              <Paper>
                  <CardContent>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          {data.label}
                      </Typography>
                      <Stack direction='column' spacing={2}>
                          <Stack direction="row" spacing={1}>
                              <Chip size='small' label="GET" color="primary"
                                    variant={requestType === 'GET' ? 'filled' : 'outlined'}
                                    onClick={() => setRequestType('GET')}/>
                              <Chip size='small' label="POST" color="success"
                                    variant={requestType === 'POST' ? 'filled' : 'outlined'}
                                    onClick={() => setRequestType('POST')}/>
                          </Stack>

                          <TextField value={endpoint}
                                     size='small'
                                     label='Endpoint'
                                     fullWidth
                                     onChange={(v) => setEndpoint(v.target.value)}
                          />
                      </Stack>
                  </CardContent>
                  <CardActions>
                      {/*<Button size="small">Learn More</Button>*/}
                  </CardActions>
              </Paper>
          </React.Fragment>
          <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={{background: '#555'}}
            isConnectable={isConnectable}
          />
      </>)
})
