import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stepper from './Stepper';
import ExerciseList from './ExerciseList'
import styles from './styles/AddExcercisesStyles'

class AddExercises extends Component {
    constructor(props){
        super(props);
        this.state = {workouts: this.props.workouts || []}
    }
    // componentDidMount(){
    //     this.setState({workouts: JSON.parse(window.localStorage.getItem("workouts"))})
    // }
    
    render() { 
        const { workouts } = this.state
        const { classes, updateWorkouts } = this.props
        // const isListEmpty = workouts === undefined  || 
        // this.props.workouts.length === 0
        const isListEmpty = false
        return (
            <div>
                <Stepper step={1}/>
                <ExerciseList 
                    updateWorkouts={updateWorkouts}
                    workouts={workouts}/>
                <div className={ classes.navButtons }>
                    <Button 
                    sx={{
                    marginRight: '10px'
                    }}
                    size="large"
                    variant="outlined" 
                    startIcon={<ArrowBackIosIcon />}
                    component={Link}
                    to="/rounds"
                    >
                    Back
                    </Button>
                    {!isListEmpty && <Button 
                    sx={{
                    marginLeft: '10px'
                    }}
                    size="large"
                    variant="contained" 
                    endIcon={<ArrowForwardIosIcon />}
                    component={Link}
                    to="/timer"
                    >
                    Next
                    </Button>}
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(AddExercises);