import React, {useState} from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FastForwardIcon from "@mui/icons-material/FastForward";

export interface TopPanelProps {
    addNewNode: (name: string, type: string) => void;
    execute: () => void
}

export const TopPanel = (props: TopPanelProps) => {
    const [newNodeName, setNewNodeName] = useState('');
    const [newNodeType, setNewNodeType] = useState('');

    return <React.Fragment>
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
                                value={newNodeType}
                                onChange={v => setNewNodeType(v.target.value as any)}
                                fullWidth
                                size='small'
                        >
                            <MenuItem value={'restApiCallCard'}>REST API Call</MenuItem>
                            <MenuItem value={'fieldMapperCard'}>Mapper</MenuItem>
                            <MenuItem value={'advancedMapperCard'}>Advanced Mapper</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <TextField size='small'
                               label='New Node Name'
                               fullWidth
                               value={newNodeName}
                               onChange={(v) => setNewNodeName(v.target.value)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button variant="outlined"
                            size='medium'
                            onClick={() => props.addNewNode(newNodeName, newNodeType)}
                    >Add</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="outlined"
                            size='medium'
                            color="error"
                            onClick={() => props.execute()}
                    ><FastForwardIcon/>&nbsp;Run</Button>
                </Grid>
            </Grid>
        </Paper>
    </React.Fragment>
}