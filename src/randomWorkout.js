function randomWorkout(workoutList){
    let workout = Object.assign({}, workoutList[Math.floor((Math.random() * workoutList.length))]);
    workout.reps = Math.round(Math.random() * (workout.max - workout.min) + workout.min);
    return workout

}

export {randomWorkout}