import React, { Component } from 'react';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


class EditWorkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            movement: this.props.exercise.movement,
            min: this.props.exercise.min, 
            max: this.props.exercise.max,
            id: this.props.exercise.id
        }

        this.handleClose = this.handleClose.bind(this)
        this.add = this.add.bind(this)
        this.subtract = this.subtract.bind(this)
        this.handleUpdateWorkout = this.handleUpdateWorkout.bind(this)
    }

    componentDidUpdate(){
        if (this.state.min >= this.state.max){
            this.setState({max: Number(this.state.min) + 1})
        }
        
    }

    add(event){
        event.preventDefault();
        const { name, value } = event.target;
        let newNum = Number(value) + 1
        this.setState({[name]: newNum})
    }

    subtract(event){
        event.preventDefault();
        const { name, value } = event.target;
        if (value > 1){
            let newNum = Number(value) - 1
            this.setState({[name]: newNum})
        }
    }

    handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            this.props.closeDialog()
        }
        this.props.closeDialog() 
    };

    handleUpdateWorkout(){
        
        let { movement, min, max } = this.state
            let workout = {
                movement: movement, 
                min:min, 
                max:max,
                id: movement}
            this.props.addWorkout(workout)
            this.handleClose()
    }

    render() { 
        const { max, min, movement } = this.state

        const Item = styled(Paper)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            boxShadow: 'none',
            color: theme.palette.text.secondary,
        }));

        return (
        <div>
            <Dialog open={this.props.open} onClose={this.handleClose}>
                <DialogTitle>{movement}</DialogTitle>
                <DialogContent>
                <Stack 
                    direction="row" 
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Item>
                        <Typography variant="caption" display="block" gutterBottom>
                            Minimum Reps
                        </Typography>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button 
                                onClick={this.subtract}
                                name='min'
                                value={min}
                            >-</Button>
                            <Button
                            sx={{
                                cursor: 'default',
                                pointerEvents: 'none',
                            }}
                            >{min}</Button>
                            <Button 
                                onClick={this.add}
                                name='min'
                                value={min}
                            >+</Button>
                        </ButtonGroup>
                    </Item>
                    <Item>
                        <Typography variant="caption" display="block" gutterBottom>
                            Maximum Reps
                        </Typography>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button 
                                onClick={this.subtract}
                                name='max'
                                value={max}
                            >-</Button>
                            <Button 
                            sx={{
                                cursor: 'default',
                                pointerEvents: 'none',
                            }}
                            >{max}</Button>
                            <Button 
                                onClick={this.add}
                                name='max'
                                value={max}
                            >+</Button>
                        </ButtonGroup>
                    </Item>
                </Stack>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleUpdateWorkout}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
        );
    }
}

export default EditWorkout;