import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VolumeMuteOutlinedIcon from '@mui/icons-material/VolumeMuteOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';

import styles from './styles/TimerStyles'
import { randomWorkout } from './randomWorkout'
import beep from './audio/beep.mp3'
import finalBeep from './audio/final-beep.mp3'

class Timer extends Component {
  // static defaultProps = {workout: 'Wall Ball Cluster Clean to Thruster'}
  // static defaultProps = {workout: 'Burpees'}
  constructor(props){
    super(props);
    this.state = {
      showWorkout: false,
      rounds: this.props.rounds,
      round: 0,
      workouts: this.props.workouts,
      time: this.props.time,
      isRunning: false,
      isFirstCountdown: true,
      countdownTime: 10,
      isFinalCountdown: false,
      remainingTime : 0,
      timerColor: '#0071C4',
      workout: '',
      reps: 1,
      isFinshed: false,
      isMuted: true
    }
  
    this.handleAnimation = this.handleAnimation.bind(this)
    this.handleSound = this.handleSound.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    
  }

  componentDidMount(){
    clearInterval(this.timer)
    let newWorkout = randomWorkout(this.props.workouts)
    if (isNaN(newWorkout)) {
        return this.setState({workout: newWorkout[0], reps: newWorkout.reps});;
        }
        return this.setState({workout: newWorkout[0], reps: newWorkout.reps});
}
componentWillUnmount(){
    clearInterval(this.timer)
}
startTimer(){
    this.setState({isRunning: true})
    this.timer = setInterval(this.countDown, 1000);
}

beep(){
    // beeps at 3 seconds
    // beep.load()
    if(!this.state.isMuted){
      new Audio(beep).play()}
}
finalBeep(){
    //beeps at 0 seconds
    if(!this.state.isMuted){
    new Audio(finalBeep).play()
    }
}
countDown(){
  if (this.state.isFirstCountdown){
    let newTime = this.state.countdownTime - 1;
    this.setState({countdownTime: newTime})
    if(this.state.countdownTime <= 3){
      this.setState({timerColor: "#ba000d" })
      this.beep()
    }
    if (this.state.countdownTime === 0){
      this.setState({isFirstCountdown: false, time: this.props.time, round: 1})
      this.finalBeep()
      this.setState({timerColor: "#0071C4" })
      this.handleAnimation()
    
      }
    } else {

    if (this.state.time === 0 && this.state.rounds > 0){
        let newRound = this.state.round + 1
        let newRounds = this.state.rounds - 1
        this.setState({rounds: newRounds, round: newRound})
        if (this.state.rounds > 0){
            let newWorkout = randomWorkout(this.props.workouts)
            this.setState({time: this.props.time + 1, workout: newWorkout[0], reps: newWorkout.reps})
        }
        clearInterval(this.timer)
        this.setState({isFinalCountdown: false})
        this.handleAnimation()
        this.startTimer()
    }
    if (this.state.time > 0 && this.state.rounds > 0){
        let newTime = this.state.time - 1;
        this.setState({time: newTime})
        if (this.state.time <= 3){
            this.setState({isFinalCountdown: true})
        }
        if(this.state.isFinalCountdown && this.state.time > 0){
            this.beep()
            this.setState({timerColor: "#ba000d" })
        }
        if(this.state.time === 0){
            this.finalBeep()
            this.setState({timerColor: "#0071C4" })
        }
    } else {
        clearInterval(this.timer)
        this.setState({
          isFinshed: true, 
          workout: 'thank you!!', 
          reps: '',
          round: 0})
        
    }
  }
}

stopTimer(){
    clearInterval(this.timer)
    this.setState({isRunning: false})
}

resetTimer(){
    clearInterval(this.timer)
    let newWorkout = randomWorkout(this.props.workouts)
    this.setState(
        {   showWorkout: false,
            time: this.props.time,
            rounds: this.props.rounds,
            round: 0,
            isRunning: false,
            isFirstCountdown: true,
            countdownTime: 10,
            isFinalCountdown: false,
            timerColor: "#0071C4",
            isFinshed: false,
            workout: newWorkout[0],
            reps: newWorkout.reps
        }
    )
}


  handleAnimation(){
    this.setState({showWorkout: true})
    setTimeout(() => this.setState({showWorkout: false}), 2000)
  }

  handleSound(){
    this.setState({isMuted: !this.state.isMuted})
  }

  
  render() { 
    
    const { classes, isLandscape  } = this.props
    const { time, round, rounds, isRunning, 
      workout, reps, showWorkout, countdownTime, 
      isFirstCountdown, isFinshed, timerColor, isMuted } = this.state
    let displayRound = `${round}`.length > 1? round : `0${round}`
    let displayTimer = `${time}`.length > 1? `00:${time}` : `00:0${time}`
    let displayCountdown = `${countdownTime}`.length > 1? `00:${countdownTime}` : `00:0${countdownTime}`
    
    return (
      <div>
        <div className={classes.topButtonContainer}>
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
          </div>
          <div className={classes.muteButtonContainer}>
            <div className={classes.muteButton}>
                <IconButton 
                    style={styles.customIconButton}
                    color="primary" 
                    size="large"
                    aria-label="info"
                    onClick={this.handleSound}>
                    {isMuted? <VolumeOffOutlinedIcon 
                    style={styles.customIconButton} 
                    fontSize="inherit"/> :
                    <VolumeMuteOutlinedIcon
                    style={styles.customIconButton} 
                    fontSize="inherit"/>}
                </IconButton>
              </div>
            </div>
        </div>
        <div 
          style={{marginTop: `${!isLandscape? '30%' : ''}`}}>
          <div 
            style={{display: `${isLandscape? 'none' : ''}`}} 
            className={ classes.actionButtonsContainerPortrait } >
            <div className={classes.actionButton}>
            {!isRunning && <IconButton 
                style={styles.customIconButtonPortrait}
                color="primary" 
                size="large"
                aria-label="start timer"
                onClick={this.startTimer}>
                <PlayCircleOutlineIcon 
                  style={styles.customIconButtonPortrait} 
                  fontSize="inherit"/>
              </IconButton>
            }

            {isRunning && rounds > 0 && <IconButton 
                style={styles.customIconButtonPortrait}
                color="primary" 
                size="large"
                aria-label="pause timer"
                onClick={this.stopTimer}>
                <PauseCircleOutlineRoundedIcon 
                  style={styles.customIconButtonPortrait} 
                  fontSize="inherit"/>
              </IconButton>
            }

            </div>
            {!isFinshed && !isFirstCountdown && <Divider 
              orientation="vertical"
              variant="middle" 
              flexItem/>}
            <div className={classes.actionButton}>
              {!isFirstCountdown && <IconButton 
                style={styles.customIconButtonPortrait}
                color="primary" 
                size="large"
                aria-label="reset timer"
                onClick={this.resetTimer}>
                <RestartAltIcon 
                  style={styles.customIconButtonPortrait}
                  fontSize="inherit"/>
              </IconButton>}
            </div>
          </div>
          {!isLandscape && <Divider variant="middle" flexItem/>}
          <div  className={ classes.timeContainer }>
            {isLandscape && <Divider orientation="vertical" variant="middle" flexItem />}
            <div className={classes.rounds}>{displayRound}</div>
            <div>&nbsp;</div>

            { isFirstCountdown? 
              <div 
                className={classes.time}
                style={{color: `${timerColor}`}}
                >{displayCountdown}</div> :
              <div 
                className={classes.time} 
                style={{color: `${timerColor}`}}
                >{time === 60? '01:00' : displayTimer}</div> 
            }


            {isLandscape && <Divider style={{marginRight: '20px'}} orientation="vertical" variant="middle" flexItem />}
            <div 
              style={{display: `${isLandscape? '' : 'none'}`}} 
              className={ classes.actionButtonsContainerLandscape }
            >
              <div className={classes.actionButton}>
              {!isRunning && <IconButton 
                  style={styles.customIconButton}
                  color="primary" 
                  size="large"
                  aria-label="start timer"
                  onClick={this.startTimer}>
                  <PlayCircleOutlineIcon 
                    style={styles.customIconButton} 
                    fontSize="inherit"/>
                </IconButton>
              }
              {isRunning && rounds > 0 && <IconButton 
                  style={styles.customIconButton}
                  color="primary" 
                  size="large"
                  aria-label="pause timer"
                  onClick={this.stopTimer}>
                  <PauseCircleOutlineRoundedIcon 
                    style={styles.customIconButton} 
                    fontSize="inherit"/>
                </IconButton>
              } 
              </div>
              {!isFinshed && !isFirstCountdown && <Divider 
                variant="middle"
                flexItem />}
              <div className={classes.actionButton}>
                {!isFirstCountdown && <IconButton 
                  style={styles.customIconButton}
                  color="primary" 
                  size="large"
                  aria-label="reset timer"
                  onClick={this.resetTimer}>
                  <RestartAltIcon 
                    style={styles.customIconButton}
                    fontSize="inherit"/>
                </IconButton>}
              </div>
            </div>
          </div>
          {!isLandscape && <Divider variant="middle" flexItem/>}
        </div>
      
        <div className={`${classes.workout} ${this.state.showWorkout && classes.showOverlay}`}>
        {!showWorkout && reps !== 0 && !isFirstCountdown && <h1>{reps} {workout}</h1>}
        </div>
        <div className={ `${classes.workoutBanner} ${this.state.showWorkout && classes.showWorkout}` }>
          <h1>{reps} {workout}</h1>
        </div>
      
      </div>
    );
  }
}

export default withStyles(styles)(Timer);
