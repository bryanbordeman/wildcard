function randomWorkout(workoutList){
    let workout = Object.assign({}, workoutList[Math.floor((Math.random() * workoutList.length))]);
    workout.reps = Math.round(Math.random() * (workout[2] - workout[1]) + workout[1]);
    return workout

}

export {randomWorkout}