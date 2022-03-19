import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      windowHeight: 0,
      windowWidth: 0,
      isLandscape: null,
      rounds: 0,
      workouts: [],
      isListEmpty: true,
    }

    this.setWindow = this.setWindow.bind(this)
    this.updateRounds = this.updateRounds.bind(this)
    this.updateWorkouts = this.updateWorkouts.bind(this)
  
  }

  componentDidMount(){
    this.setWindow()
    this.setState({rounds: JSON.parse(window.localStorage.getItem("rounds"))})
    this.setState({workouts: JSON.parse(window.localStorage.getItem("workouts"))})
  }
  componentDidUpdate(){
    window.addEventListener('load', this.setWindow, false);
    window.addEventListener('resize', this.setWindow, window.addEventListener('orientationchange', this.setWindow));
    return () => window.removeEventListener("resize", this.setWindow);
    
  }

  updateRounds(rounds){
    this.setState({rounds: rounds})
  }

  updateWorkouts(workouts){
    this.setState({workouts: workouts}, () => (
      this.setState({isListEmpty: this.arrayIsEmpty(this.state.workouts)})
    ))
  }

  arrayIsEmpty(array) {
    if (!Array.isArray(array)) {
        return false;
    }
    if (array.length === 0) {
        return true;
    }
    return false;
}

  setWindow(){
    this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight},
      () => this.setState({isLandscape: window.innerWidth > window.innerHeight? true : false}))
  }
  
  render() { 
    const { isLandscape, rounds, workouts, isListEmpty } = this.state
    return (
      <div>
        <BrowserRouter>
          <MainRoutes 
            isLandscape={isLandscape}
            updateRounds={this.updateRounds}
            rounds={rounds}
            updateWorkouts={this.updateWorkouts}
            workouts={workouts}
            isListEmpty={isListEmpty}
            />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;