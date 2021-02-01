const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const app = express();
const secretOrKey = "secret";
const cors =require("cors");
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
// connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nutrivicedb",
  {useNewUrlParser: true}
) 
.then(() => console.log("Successful connection to mongoDB"))
.catch( err => console.log(err));


if(process.env.NODE_ENV !== "production"){
  app.options("*", cors());
  app.use(cors());
} 

app.use(express.json());

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', require('./routes/api/user-route'));

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});