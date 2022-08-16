require("dotenv").config();
const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connection to database is successful");
    })
    .catch((err) => {
      console.log("Oh uh, couldn't connect to the database");
      console.log(err);
    });
}

module.exports = dbConnect;
