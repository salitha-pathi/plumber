import React, {memo, useState} from "react";
import {Handle, Position} from "reactflow";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import {Stack, TextField} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export interface FieldMapperCardProps {
    data: {
        label: string;
    };
    isConnectable: boolean;
}

interface IFieldMap {
    source: string;
    dest: string;
}

export const FieldMapperCard = memo(({data, isConnectable}: FieldMapperCardProps) => {
    const [fieldMap, setFieldMap] = useState<IFieldMap[]>([]);

    const addNewField = () => {
        setFieldMap(f => [...f, {source: '', dest: ''}]);
    }

    const onMapSrcFieldChange = (name: string, index: number) => {
        const clone = [...fieldMap]
        clone[index] = {...clone[index], source: name,}
        setFieldMap(clone);
    }
    const onMapDestFieldChange = (name: string, index: number) => {
        const clone = [...fieldMap]
        clone[index] = {...clone[index], dest: name,}
        setFieldMap(clone);
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
              <Paper>
                  <CardContent>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                          Map Fields
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          {data.label}
                      </Typography>
                      <Stack direction='column' spacing={2}>
                          {fieldMap.map((map, i) => (
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <TextField variant='outlined' size='small' value={map.source}
                                           onChange={(e) => onMapSrcFieldChange(e.target.value, i)}/>
                                <Button variant='contained' color='info'> <ArrowForwardIcon/> </Button>
                                <TextField variant='outlined' size='small' value={map.dest}
                                           onChange={(e) => onMapDestFieldChange(e.target.value, i)}/>
                            </ButtonGroup>
                          ))}

                          <Button size="small"
                                  onClick={() => addNewField()}
                          >Add field</Button>
                      </Stack>

                  </CardContent>
                  <CardActions>
                      <Button size="small">Learn More</Button>
                  </CardActions>
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
