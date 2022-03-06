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
      workouts: []
    }

    this.setWindow = this.setWindow.bind(this)
    this.updateRounds = this.updateRounds.bind(this)
    this.updateWorkouts = this.updateWorkouts.bind(this)
  
  }

  componentDidMount(){
    this.setWindow()
  }
  componentDidUpdate(){
    window.addEventListener("resize", this.setWindow);
    return () => window.removeEventListener("resize", this.setWindow);
  
  }

  updateRounds(rounds){
    this.setState({rounds: rounds})
  }

  updateWorkouts(workouts){
    this.setState({workouts: workouts})
  }

  setWindow(){
    this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight},
      () => this.setState({isLandscape: this.state.windowWidth > this.state.windowHeight? true : false}))
  }

  render() { 
    const { isLandscape, rounds, workouts } = this.state
    return (
      <div>
        <BrowserRouter>
          <MainRoutes 
            isLandscape={isLandscape}
            updateRounds={this.updateRounds}
            rounds={rounds}
            updateWorkouts={this.updateWorkouts}
            workouts={workouts}
            />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;