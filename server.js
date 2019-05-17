const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error during connection'));
db.once('open', function() {
  console.log("Connected to database");
});

const app = express();

app.set("port", process.env.PORT || 3001);

var testSchema = mongoose.Schema({
  name: String,
  age: Number
});

var Test = mongoose.model('test', testSchema);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/test", (req, res) => {
  console.log("Test !");
  Test.find()
  res.json([{"Name": "Test"}]);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
})