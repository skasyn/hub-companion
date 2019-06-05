const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const bodyParser = require("body-parser");
const querystring = require("querystring");
require("dotenv").config();

let cities = ["PAR", "LIL", "NAN", "STG", "LYN", "MAR", "NCE", "MPL", "TLS", "BDX", "NCY", "REN"]
let credit_plan = [
  {
    acculturation: 4,
    experimentation: 3
  },
  {
    acculturation: 4,
    experimentation: 3,
    fruition: 1
  },
  {
    acculturation: 4,
    experimentation: 3,
    fruition: 1,
    sharing: 1
  },
  {
    acculturation: 4,
    experimentation: 3,
    fruition: 2,
    sharing: 2
  }
]

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
  year: { type: Number, default: 0},
  plan: { type: Number, default: -1},
  acculturation: {type: Number, default: 0},
  experimentation: {type: Number, default: 0},
  fruition: {type: Number, default: 0},
  sharing: {type: Number, default: 0},
  privilege: {type: Number, default: 0},
});

const ActivitySchema = mongoose.Schema({
  code: String,
  id: String,
  type: String,
  type_code: String,
  investment_type: String,
  investment_points: Number,
  title: String,
  description: String,
  date: String,
  registered: [{
    email: String,
    present: String
  }],
})

const MakerSchema = mongoose.Schema({
  title: String,
  leader_email: String,
  co_workers: [String],
  description: String,
  functionalities: String,
  technologies: String,
  ressources: String,
  informations: String,
  status: Number,
});

const Activity = mongoose.model('activity', ActivitySchema);

const User = mongoose.model('user', UserSchema);

const Maker = mongoose.model('maker', MakerSchema)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function getDescription(event, activity) {
  if (event.description !== null && event.description !== "")
    return event.description;
  else if (activity.description !== null && activity.description !== "")
    return activity.description;
  else
    return activity.title;
}

function checkTypeAndPoints(activity, hubModule, description) {
  points = 0
  type = ""

  if (hubModule == "B-INN-001") {
    type = "acculturation"
    points = 1
  } else {
    if (description.toLowerCase().indexOf("workshop") !== -1 ||
        activity.type_title == "Workshop") {
      type = "experimentation"
      points = 1
    } else if (description.toLowerCase().indexOf("hackathon") !== -1 ||
               description.toLowerCase().indexOf("jam") !== -1 ||
               description.toLowerCase().indexOf("focus group") !== -1 ||
               description.toLowerCase().indexOf("focusgroup") !== -1) {
      type = "experimentation"
      points = 2
    } else if (description.toLowerCase().indexOf("talk") !== -1) {
      type = "acculturation"
      points = 1
    } else {
      console.log("Cant find type of ", description);
    }
  }
  return [points, type]
}

function activityUpsert(event, activity, studentList, hubModule) {
  title = activity.title || event.title;
  description = getDescription(event, activity);
  date = event.begin || event.end;
  PointsType = checkTypeAndPoints(activity, hubModule, title)

  Activity.updateOne({
    code: event.code
  }, {
    code: event.code,
    id: event.id_activite,
    type: activity.type_title,
    type_code: activity.type_code,
    title: title,
    date: date,
    description: description,
    registered: studentList,
    investment_type: PointsType[1],
    investment_points: PointsType[0],
  }, {upsert: true}, function(err, res) {
  });
}

function makerUpsert(newMaker, response) {
  if (newMaker._id === undefined) {
    Maker.create(
        {
          title: newMaker.title,
          leader_email: newMaker.email,
          co_workers: newMaker.coworker_email,
          description: newMaker.description,
          functionalities: newMaker.functionalities,
          technologies: newMaker.technologies,
          ressources: newMaker.ressources,
          informations: newMaker.information,
          status: 0,
        },
        (err, res) => {
          response.json({})
        }
    )
  } else {
    Maker.updateOne({
      _id: newMaker._id
    }, {
      title: newMaker.title,
      leader_email: newMaker.email,
      co_workers: newMaker.coworker_email,
      description: newMaker.description,
      functionalities: newMaker.functionalities,
      technologies: newMaker.technologies,
      ressources: newMaker.ressources,
      informations: newMaker.information,
      status: newMaker.status,
    }, {upsert: true},
        (err, res) => {
      response.json({})
    })
  }
}

function retrieveEvents(year, hubModule, city, event, activity) {
  return axios.get(process.env.URLAUTO + "module/"+year+"/"+hubModule+"/"+city+"-0-1/" + activity.codeacti + "/" + event.code + "/registered?format=json")
  .then(function(response2) {
    if (response2.data !== undefined && response2.data !== null && !isEmpty(response2.data)) {
      let studentList = []
      for (let student of response2.data) {
        studentList.push({email: student.login, present: student.present});
      }
      activityUpsert(event, activity, studentList, hubModule);
    }
  }).catch(function(error) {
    console.log(error);
  })
}

async function retrieveActivities(year, hubModule, city) {
  return axios.get(process.env.URLAUTO + "module/"+year+"/"+hubModule+"/"+city+"-0-1?format=json")
  .then(function(response) {
    for (let activity of response.data.activites) {
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
  retrieveActivities(year, hubModule, city)
  .then(function() {
    retrieveActivities(year, talkModule, city)
    .then(function() {
      res.json({});
    })
  })
})

function getUserInfos(res, req, resPost, user) {
  let response = [];
  let acculturation = 0;
  let experimentation = 0;

  for (let event of res) {
    reg = event.registered.find(function(element) { return element.email === user.mail});
    response.push({
      title: event.title,
      description: event.description,
      present: reg.present,
      type: event.investment_type,
      points: event.investment_points,
      date: event.date,
    });
    if (reg.present === "present" || reg.present === "N/A") {
      if (event.investment_type === "acculturation")
        acculturation += event.investment_points;
      else if (event.investment_type === "experimentation")
        experimentation += event.investment_points;
    }
  }
  User.updateOne({
    id: req.body.id
  }, {
    acculturation: acculturation,
    experimentation: experimentation
  }, {upsert: true}, function(err, res) {});
  resPost.json({
    events: response,
    acculturation: acculturation,
    experimentation: experimentation,
    fruition: user.fruition,
    sharing: user.sharing,
    plan: credit_plan[user.plan],
    year: user.year,
    privilege: user.privilege,
  });
}

app.post("/api/infos", (req, resPost) => {
  let user = {};
  return User.findOne({id: req.body.id},
  (err, res) => {
    user = res;
  }).then(function(res) {
    Activity.find({"registered.email": user.mail},
    function(err, res) {
      getUserInfos(res, req, resPost, user);
    })
  }).catch(function(err) {
    console.log(err);
  })
})

app.post("/api/admininfos", (req, resPost) => {
  let user = {};
  let makers = [];
  let users = [];

  return User.findOne({id: req.body.id}, (err, res) => user = res)
  .then(() => {
    if (user.privilege === 0)
      resPost.json({});
    else {
      Maker.find({}, (err, res) => makers = res)
      .then(() => {
        console.log("here");
        User.find({}).select("id mail name plan year acculturation experimentation fruition sharing privilege")
        .exec((err, res) => {
          users = res;
          resPost.json({makers: makers, users: users})
        })
      })
    }
  }).catch(function(err) {
  })
})

app.post("/api/logincookie", (req, resPost) => {
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

app.post('/api/submitMaker', (req, res) => {
  return makerUpsert(req.body, res)
});

app.post('/api/changeplan', (req, resPost) => {
  return User.updateOne({
    id: req.body.id
  }, {
    plan: req.body.plan
  }, (err, res) => {
    resPost.json({plan: credit_plan[req.body.plan]});
  });
})

app.post('/api/changeyear', (req, resPost) => {
  return User.updateOne({
    id: req.body.id
  }, {
    year: req.body.year
  }, (err, res) => {
    resPost.json({});
  });
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
        id: response2.data.id
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