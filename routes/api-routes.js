  
//db
const db = require('../models')
module.exports = function (app) {

    //////Workout Routes//////
    //get all

//undo comment below


    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                error: true,
                data: null,
                message: "Failed to retrieve workouts.",
            });
        });
    });



    //alread commented out below
    // app.get("/api/workouts", function (req, res)  {
    //     db.Workout.find({}, (err, workouts) => {
    //         if(err){
    //             console.log(err);
    //         } else {
    //             res.json(workouts)
    //         }
    //     });
    // });
    //add excerise, set id, push to model, set true



    //undu comment below


    app.put("/api/workouts/:id", function (req, res) {
        db.Workout.findByIdAndUpdate(
          req.params.id,
          { $push: { exercises: req.body } },
          { new: true }
        )
        .then((workout) => {
            // workout.exercises.push(req.body);
            res.json(workout);
        })
        .catch((err) => {
            console.log(err);
            res.json({
              error: true,
              data: null,
              message: "Failed to update workout.",
            });
        });
    });



    //already commented out below


    // app.put("/api/workouts/:id", ({ params, body }, res) => {
    //     db.Workout.findOneAndUpdate({ _id: params.id},
    //                                 {$push: {excercises: req.body }},
    //                                 { upsert: true, useFindandModify:false},
    //                                 updatedWorkout => {
    //                                     res.json(updatedWorkout);
    //                                 })
    // });







    //create new workout




//undo comment below


    app.post('/api/workouts', (req,res) => {
        db.Workout.create(req.body).then(newWorkout => {
            res.json(newWorkout);
        });
    });


    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find(req.body)
        .limit(7)
        .then((foundWorkout) => {
            res.json(foundWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
    });

}


// testttttttt--------------------------------




