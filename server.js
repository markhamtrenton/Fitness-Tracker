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


mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true,
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