const scout = require("@scout_apm/scout-apm");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");








const connection = mongoose.connection;
connection.on("connected", () => {
    console.log("Mongoose connected");
});

connection.on("error", (err) => {
    console.log("ERROR connecting mongoose");
});





const app = express();

//use logger
app.use(logger("dev"));

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use static files
app.use(express.static("public"));
// app.use(express.static(__dirname + '/public'));


mongoose.connect(process.env.MONGODB_URI ||"mongodb:fixie:ud2KNTq6lWpO3W6@speedway.usefixie.com:1080", { useNewUrlParser: true, useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false, });

const PORT = process.env.PORT || 3000;

app.get("/api/config", (req, res) => {
    res.json({ success: "Workout homework connected" });
});



//require('./seeders/seed')

//use routes
require('./routes/api-routes')(app)
require('./routes/html-routes')(app)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})


async function start() {
    // Trigger the download and installation of the core-agent
    await scout.install({
      allowShutdown: true, // allow shutting down spawned scout-agent processes from this program
      monitor: true, // enable monitoring
      name: "fitnesstracker",
      key: "4TYfmML9MUcMMh7Root0",
    });
  
    // Initialize your express application
    const app = express();
  
    // Enable the app-wide scout middleware
    app.use(scout.expressMiddleware());
  
    // Add other middleware and routes
    // app.use( ... )
    // app.get( ... )
  
    // Start express
    app.start();
  }
  
  // If this script is executed directly, run the start function
  if (require.main === module) { start(); } 