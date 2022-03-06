import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './styles/TimerStyles'


class Timer extends Component {
  // static defaultProps = {workout: 'Wall Ball Cluster Clean to Thruster'}
  static defaultProps = {workout: 'Burpees'}
  constructor(props){
    super(props);
    this.state = {
      showWorkout: false,
      workouts: this.props.workouts
    }
  
    this.handleAnimation = this.handleAnimation.bind(this)
    
  }

  handleAnimation(){
    this.setState({showWorkout: true})
    setTimeout(() => this.setState({showWorkout: false}), 3000)
  }

  
  render() { 
    
    const { classes, isLandscape  } = this.props
    
    return (
      <div>
        <Button 
          sx={{
            margin: '20px'
          }}
          size="large"
          variant="outlined" 
          startIcon={<ArrowBackIosIcon />}
          component={Link}
          to="/exercises"
          >
          Back
        </Button>
        
        <div 
          style={{marginTop: `${!isLandscape? '30%' : ''}`}}>
          <div 
            style={{display: `${isLandscape? 'none' : ''}`}} 
            className={ classes.actionButtonsContainerPortrait } >
            <div className={classes.actionButton}>
              <IconButton 
                style={styles.customIconButtonPortrait}
                color="primary" 
                size="large"
                aria-label="start timer">
                <PlayCircleOutlineIcon 
                  style={styles.customIconButtonPortrait} 
                  fontSize="inherit"/>
              </IconButton>
            </div>
            <Divider 
              orientation="vertical"
              variant="middle" 
              flexItem/>
            <div className={classes.actionButton}>
              <IconButton 
                style={styles.customIconButtonPortrait}
                color="primary" 
                size="large"
                aria-label="reset timer">
                <RestartAltIcon 
                  style={styles.customIconButtonPortrait}
                  fontSize="inherit"/>
              </IconButton>
            </div>
          </div>
          {!isLandscape && <Divider variant="middle" flexItem/>}
          <div  className={ classes.timeContainer }>
            {isLandscape && <Divider orientation="vertical" variant="middle" flexItem />}
            <div className={classes.rounds}>01</div>
            <div>&nbsp;</div>
            <div className={classes.time} >01:00</div>
            {isLandscape && <Divider style={{marginRight: '20px'}} orientation="vertical" variant="middle" flexItem />}
            <div 
              style={{display: `${isLandscape? '' : 'none'}`}} 
              className={ classes.actionButtonsContainerLandscape }
            >
              <div className={classes.actionButton}>
                <IconButton 
                  style={styles.customIconButton}
                  color="primary" 
                  size="large"
                  aria-label="start timer">
                  <PlayCircleOutlineIcon 
                    style={styles.customIconButton} 
                    fontSize="inherit"/>
                </IconButton>
              </div>
              <Divider 
                variant="middle"
                flexItem />
              <div className={classes.actionButton}>
                <IconButton 
                  style={styles.customIconButton}
                  color="primary" 
                  size="large"
                  aria-label="reset timer">
                  <RestartAltIcon 
                    style={styles.customIconButton}
                    fontSize="inherit"/>
                </IconButton>
              </div>
            </div>
          </div>
          {!isLandscape && <Divider variant="middle" flexItem/>}
        </div>
      
        <div className={`${classes.workout} ${this.state.showWorkout && classes.showOverlay}`}>
          <h1>10 {this.props.workout}</h1>
        </div>
        <div className={ `${classes.workoutBanner} ${this.state.showWorkout && classes.showWorkout}` }>
          <h1>10 {this.props.workout}</h1>
        </div>
      
      </div>
    );
  }
}
 
export default withStyles(styles)(Timer);
