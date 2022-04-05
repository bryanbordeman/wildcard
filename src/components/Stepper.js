import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from '../styles/StepperStyles'

const steps = [
    'Add Rounds',
    'Select Exercises',
    'Start Timer',
];


class HorizontalLabelPositionBelowStepper extends Component {
    // constructor(props){
    //     super(props);
        
    // }
    render() { 
        const { classes, step } = this.props
    
        return (
            <div className={classes.stepperContainer}>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={step} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </Box>
            </div>
        );
    }
}
 
export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
