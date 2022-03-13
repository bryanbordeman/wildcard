import React, { Component } from 'react';
// import '../css/WorkoutForm.css'
import SelectWorkout from './SelectWorkout' 
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Edit from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import EditWorkout from './EditWorkout';

class ExerciseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            exercises: this.props.workouts || [],
            edit: false,
            editWorkout:{}
        }

        this.addWorkout = this.addWorkout.bind(this)
        this.deleteWorkout = this.deleteWorkout.bind(this)
        this.editWorkout = this.editWorkout.bind(this)
    }

    componentDidMount(){
        this.props.updateWorkouts(this.state.exercises);
    }

    componentWillUnmount(){
        localStorage.setItem("workouts", JSON.stringify(this.state.exercises || []));
    }

    addWorkout(workout){
        let filteredExercise = this.state.exercises.filter(exercise => exercise.id !== workout.id);
        this.setState({
            exercises: [...filteredExercise, workout]
        },
        () => {
            this.props.updateWorkouts(this.state.exercises);
        });
    }

    deleteWorkout(workout){
        this.setState((prevState) => ({
            exercises: prevState.exercises.filter(exercise => exercise.id !== workout),
        }),
        () => {
            this.props.updateWorkouts(this.state.exercises);
        });
    }

    editWorkout(id){
        let workout = this.state.exercises.filter(exercise => exercise.id === id);
        this.setState({edit: true, editWorkout: workout[0]});
    }

    closeDialog= () => {
        this.setState({edit: false});
    }

    render() { 
        const { workouts, exercises } = this.state

        const StyledPaper = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(2),
            maxWidth: "auto",
            color: theme.palette.text.primary,
        }));

        const exerciseList = Object(exercises).map(exercise => (
            <StyledPaper
                sx={{
                my: 1,
                mx: 'auto',
                p: 2,
                }}
                key={uuidv4()}
            >
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                    <ListItem 
                        key={uuidv4()}
                        secondaryAction={
                            <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={ () => this.deleteWorkout(exercise.id) } >
                            <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <IconButton
                                color='primary'
                                onClick={ () => this.editWorkout(exercise.id) } >
                                <Edit/>
                            </IconButton>
                        </ListItemAvatar>
                        <ListItemText
                            key={uuidv4()}
                            primary={exercise.movement}
                            secondary={`Min: ${exercise.min} Max: ${exercise.max}`}
                        />
                    </ListItem>
                </Grid>
                </Grid>
            </StyledPaper>
        ))
        return (
            <div>
                {this.state.edit && 
                        <EditWorkout 
                            key={uuidv4()}
                            exercise={this.state.editWorkout}
                            addWorkout={this.addWorkout} 
                            open={this.state.edit}
                            closeDialog={this.closeDialog}/>}
                <SelectWorkout 
                    addWorkout={this.addWorkout} 
                    workoutList={workouts}
                />
                {exerciseList.length > 0 && 
                    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                        {exerciseList}
                    </Box>
                }
            </div>
        );
    }
}

export default ExerciseList;