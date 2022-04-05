function wildcardWorkout(workoutList){
    let keys = Object.keys(workoutList);
    let category = workoutList[keys[ keys.length * Math.random() << 0]];
    let workout = category[Math.floor((Math.random() * category.length))];

    return workout

}

export {wildcardWorkout}