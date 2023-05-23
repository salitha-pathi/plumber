import React, {memo} from 'react';
import {Handle, Position} from "reactflow";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";

export interface StartCardComponentProps {
    data: any;
    isConnectable: boolean;
}

export const StartCard = memo(({isConnectable}: StartCardComponentProps) => {
    return (
      <>
          <Paper variant='outlined'
                 style={{
                     paddingTop: '10px',
                     paddingBottom: '10px',
                     paddingLeft: '35px',
                     paddingRight: '35px',
                 }}>
              <Typography variant={'h5'}>Start</Typography>
          </Paper>
          <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            // style={{background: '#555'}}
            isConnectable={isConnectable}
          />
      </>
    );
})