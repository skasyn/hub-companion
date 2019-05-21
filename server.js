const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const bodyParser = require("body-parser");
const querystring = require("querystring");
require("dotenv").config();

let cities = ["PAR", "LIL", "NAN", "STG", "LYN", "MAR", "NCE", "MPL", "TLS", "BDX", "NCY", "REN"]

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error during connection'));
db.once('open', function() {
  console.log("Connected to database");
});

const app = express();

app.use(bodyParser.json());
app.set("port", process.env.PORT || 3001);

const UserSchema = mongoose.Schema({
  id: String,
  name: String,
  mail: String,
  token: String,
});

const ActivitySchema = mongoose.Schema({
  code: String,
  id: String,
  type: String,
  type_code: String,
  description: String,
  registered: [{
    email: String,
    present: String
  }],
})

const Activity = mongoose.model('activity', ActivitySchema);

const User = mongoose.model('user', UserSchema);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function getDescription(event, activity) {
  if (activity.title !== null && event.description !== "")
    return activity.title;
  else if (event.description !== null && event.description !== "")
    return event.description;
  else
    return activity.description;
}

function activityUpsert(event, activity, studentList) {
  Activity.updateOne({
    code: event.code
  }, {
    code: event.code,
    id: event.id_activite,
    type: activity.type_title,
    type_code: activity.type_code,
    description: getDescription(event, activity),
    registered: studentList
  }, {upsert: true}, function(err, res) {
  });
}

function retrieveEvents(year, hubModule, city, event, activity) {
  return axios.get(process.env.URLAUTO + "module/"+year+"/"+hubModule+"/"+city+"-0-1/" + activity.codeacti + "/" + event.code + "/registered?format=json")
  .then(function(response2) {
    if (response2.data !== undefined && response2.data !== null && !isEmpty(response2.data)) {
      let studentList = []
      for (let student of response2.data) {
        studentList.push({email: student.login, present: student.present});
      }
      activityUpsert(event, activity, studentList);
    }
  }).catch(function(error) {
    console.log(error);
  })
}

function retrieveActivities(year, hubModule, city) {
  return axios.get(process.env.URLAUTO + "module/"+year+"/"+hubModule+"/"+city+"-0-1?format=json")
  .then(function(response) {
    for (let activity of response.data.activites) {
      console.log(activity)
      if (activity.events !== undefined && activity.events.length !== 0) {
        for (let event of activity.events) {
          retrieveEvents(year, hubModule, city, event, activity)
        }
      }
    }
  }).catch(function(error) {
    console.log(error);
  })
}

app.post("/api/refresh", (req, res) => {
  year = "2018"
  hubModule = "B-INN-000"
  talkModule = "B-INN-001"
  city = "PAR"
  return (retrieveActivities(year, hubModule, city) && retrieveActivities(year, talkModule, city));
})

app.post("/api/infos", (req, resPost) => {
  let user = {};
  return User.findOne({id: req.body.id},
  (err, res) => {
    user = res;
  }).then(function(res) {
    Activity.find({"registered.email": user.mail},
    function(err, res) {
      let response = [];
      for (let event of res) {
        reg = event.registered.find(function(element) { return element.email === user.mail});
        response.push({description: event.description, present: reg.present});
      }
      resPost.json(response);
    })
  }).catch(function(err) {
    console.log(err);
  })
})

app.post("/api/logincookie", (req, resPost) => {
  console.log(process.env)
  return User.findOne({id: req.body.id},
  (err, res) => {
    resPost.json({
      error: false,
      name: res.name,
      id: res.id,
      mail: res.mail
    })
  }).catch(function(err) {
    console.log(err);
    resPost.json({
      error: true
    })
  })
})

app.post("/api/login", (req, res) => {
  return axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token",
  querystring.stringify({
    "client_id": "9d7c5742-6f63-4f05-b10c-f5b0c1506582",
    "scope": "https://graph.microsoft.com/User.Read",
    "redirect_uri": "http://localhost:3000",
    "grant_type": "authorization_code",
    "client_secret": process.env.AZURESECRET,
    "code": req.body.code
  }), {'Content-Type': "application/x-www-form-urlencoded"})
  .then(function(response) {
    axios.get("https://graph.microsoft.com/v1.0/me", {headers: {Authorization: response.data.token_type + " " + response.data.access_token}})
    .then(function(response2) {
      res.json({
        error: false,
        name: response2.data.displayName,
        mail: response2.data.mail,
        id: response2.data.id,
      });
      User.updateOne({
        id: response2.data.id
      }, {
        id: response2.data.id,
        name: response2.data.displayName,
        mail: response2.data.mail,
      }, {upsert: true}, function(err, res) {});
    }).catch(function(error) {
      res.json({error: true});
      console.log("Error on fetching informations");
    });
  }).catch(function(error) {
    res.json({error: true});
    console.log("Error on fetching token");
  })
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
})