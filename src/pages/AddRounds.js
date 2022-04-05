import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stepper from '../components/Stepper';
import styles from '../styles/AddRoundsStyles'

class AddRounds extends Component {
    constructor(props){
        super(props);
        this.state = {rounds: 1}

        this.add = this.add.bind(this)
        this.subtract = this.subtract.bind(this)
    
    }

    componentDidMount(){
        if( this.props.rounds > 0 ){
            this.setState({rounds: this.props.rounds})
        }
        
    }
    
    componentWillUnmount(){
        localStorage.setItem("rounds", JSON.stringify(this.state.rounds));
    }

    add(event){
        const { name, value } = event.target;
        let newNum = Number(value) + 1
        this.setState({[name]: newNum},
            () => {this.props.updateRounds(newNum)})
    }

    subtract(event){
        const { name, value } = event.target;
        if (value > 1){
            let newNum = Number(value) - 1
            this.setState({[name]: newNum},
                () => {this.props.updateRounds(newNum)})
        }
    }
    
    render() { 
        const { classes, isLandscape } = this.props
        const { rounds } = this.state
    
        return (
            <div>
                <Stepper step={0}/>
                <div className={ classes.roundContainer}>
                    <div 
                    
                        className={ isLandscape? classes.roundLandscape : classes.round }>
                        {rounds}
                    </div>
                    <div className={ classes.roundLabel }>
                        {rounds > 1? 'Rounds' : 'Round'}
                    </div>
                    <ButtonGroup size="large" aria-label="small outlined button group">
                        <Button 
                            onClick={this.subtract}
                            name='rounds'
                            value={rounds}
                        >-</Button>
                        {/* <Button disabled>{rounds}</Button> */}
                        <Button 
                            onClick={this.add}
                            name='rounds'
                            value={rounds}
                        >+</Button>
                    </ButtonGroup>
                </div>
                <div className={ classes.navButtons }>
                    <Button 
                    sx={{
                    marginRight: '10px'
                    }}
                    size="large"
                    variant="outlined" 
                    startIcon={<ArrowBackIosIcon />}
                    component={Link}
                    to="/"
                    >
                    Back
                    </Button>
                    <Button 
                    sx={{
                    marginLeft: '10px'
                    }}
                    size="large"
                    variant="contained" 
                    endIcon={<ArrowForwardIosIcon />}
                    component={Link}
                    to="/exercises"
                    >
                    Next
                    </Button>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(AddRounds);