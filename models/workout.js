


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: Date,
    exercises: Array
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } }); //deploy virtual for summing up total workout duration

WorkoutSchema.virtual('totalDuration').get(function() { //must declare as standard function, rather than arrow function; must also not be async
    let totalDuration = 0;
    this.exercises.forEach((exercise) => {
        totalDuration += exercise.duration; 
    })
    return totalDuration
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;