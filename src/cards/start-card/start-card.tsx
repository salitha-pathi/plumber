import React, {memo} from 'react';
import './start-card.css';
import {Handle, Position} from "reactflow";

export interface StartCardComponentProps {
    data: any;
    isConnectable: boolean;
}

export const StartCard = memo(({isConnectable}: StartCardComponentProps) => {
    return (
      <>
          <div>
              Start
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={{background: '#555'}}
            isConnectable={isConnectable}
          />
      </>
    );
})