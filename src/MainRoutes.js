import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Splash from './Splash';
import AddRounds from './AddRounds';
import Timer from './Timer';
import AddExercises from './AddExercises';


class MainRoutes extends Component {
    constructor(props){
        super(props);
        this.state ={
            workouts:[],
            rounds: 0}

        this.getWorkouts = this.getWorkouts.bind(this)
        this.getRounds = this.getRounds.bind(this)
    }
    
    getWorkouts(workouts){
        this.setState({workouts: workouts})
        // console.log(workouts)
    }
    getRounds(rounds){
        this.setState({rounds: rounds})
        // console.log(rounds)
    }
    render() { 
        const { isLandscape } = this.props
        return (
            <div>
                <Routes>
                    <Route 
                        exact 
                        path='/' 
                        element={<Splash 
                                    isLandscape={isLandscape}
                                    />} />
                    <Route 
                        exact 
                        path='/rounds' 
                        element={<AddRounds 
                                    isLandscape={isLandscape}
                                    updateRounds={this.props.updateRounds}
                                    rounds={this.props.rounds}
                                    />} />
                    <Route 
                        exact 
                        path='/exercises' 
                        element={<AddExercises
                                    isLandscape={isLandscape}
                                    updateWorkouts={this.props.updateWorkouts}
                                    workouts={this.props.workouts}
                                    isListEmpty={this.props.isListEmpty}
                                    />} />
                    <Route 
                        exact 
                        path='/timer' 
                        element={<Timer 
                                    isLandscape={isLandscape}
                                    workouts={this.props.workouts}
                                    rounds={this.props.rounds}
                                    time={60}
                                    />} />
                    <Route render={() => <h1>Error 404</h1>}/>
                </Routes>
            </div>
        );
    }
    };
    
export default MainRoutes;