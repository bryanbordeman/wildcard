import React, { Component } from 'react';
// import '../css/WorkoutForm.css'
import SelectWorkout from './SelectWorkout' 
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

class ExerciseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            workouts: this.props.workouts || "[]"
        }

        this.addWorkout = this.addWorkout.bind(this)
        this.deleteWorkout = this.deleteWorkout.bind(this)
    }

    componentDidMount(){
        // this.props.getWorkouts(this.state.workouts)
    
    }
    componentWillUnmount(){
        localStorage.setItem("workouts", JSON.stringify(this.state.workouts || "[]"));
    }

    addWorkout(workout){
        this.setState({
            workouts: [...this.state.workouts, workout]
        },
        () => {
            this.props.updateWorkouts(this.state.workouts);
        });

        
    }

    deleteWorkout(workout){
        this.setState((prevState) => ({
            workouts: prevState.workouts.filter(w => w[0] !== workout),
            
        }),
        () => {
            this.props.updateWorkouts(this.state.workouts);
        });
        
    }

    render() { 
        const { workouts } = this.state

        const StyledPaper = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(2),
            maxWidth: "auto",
            color: theme.palette.text.primary,
        }));

        const workoutList = workouts.map(workout => (
            <StyledPaper
                sx={{
                my: 1,
                mx: 'auto',
                p: 2,
                }}
                key={workout[0]}
            >
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                    <ListItem key={workout[0]}
                        secondaryAction={
                            <IconButton onClick={ () => this.deleteWorkout(workout[0]) } edge="end" aria-label="delete">
                            <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                            <FitnessCenterIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={workout[0]}
                            secondary={`Min: ${workout[1]} Max: ${workout[2]}`}
                        />
                    </ListItem>
                </Grid>
                </Grid>
            </StyledPaper>
        ))
        return (
            <div>
                <SelectWorkout 
                    addWorkout={this.addWorkout} workoutList={workouts}
                />
                {workoutList.length > 0 && 
                    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                        {workoutList}
                    </Box>
                }
            </div>
        );
    }
}

export default ExerciseList;