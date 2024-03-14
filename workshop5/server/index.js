require('dotenv').config();
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const theSecretKey = process.env.JWT_SECRET;

const {
  careerPatch,
  careerPost,
  careerGet,
  careerDelete
} = require("./controllers/careerController.js");




// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");

const { saveSession, getSession } = require('./controllers/sessionController.js');


app.use(cors({
  domains: '*',
  methods: "*"
}));

// login token based
// app.post("/api/session", function (req, res, next) {
//   console.log(new Date);
//   if (req.body.username && req.body.password ) {
//     // validate user
//     if(req.body.username === 'admin' && req.body.password === 'password') {
//       const session = saveSession(req.body.username);
//       session.then(function(session){
//         console.log('session', session);
//         if (!session) {
//           res.status(422);
//           res.json({
//             error: 'There was an error saving the session'
//           });
//         }
//         res.status(201).json({
//           session
//         });
//       })
//     } else {
//       res.status(422);
//       res.json({
//         error: 'Invalid username or password'
//       });
//     }
//   } else {
//     res.status(422);
//     res.json({
//       error: 'Invalid username or password'
//     });
//   }

// });


// login with JWT
app.post("/api/session", function (req, res) {
    if (req.body.username && req.body.password &&
      req.body.username === 'admin' && req.body.password === 'password') {
  
      //TODO: query the database to get the user info
      const token = jwt.sign({
        userId: 123,
        name: 'Bladimir',
        permission: ['create', 'edit', 'delete'],
        deviceId: "123"
      }, theSecretKey);
  
      res.status(201).json({
        token
      })
    } else {
      res.status(422);
      res.json({
        error: 'Invalid username or password'
      });
    }
  });


  // JWT Authentication middleware
app.use(function (req, res, next) {
    if (req.headers["authorization"]) {
      const authToken = req.headers['authorization'].split(' ')[1];
      try {
        jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
          if (err || !decodedToken) {
            res.status(401);
            res.json({
              error: "Unauthorized"
            });
          }
          console.log('Welcome', decodedToken.name);
          next();
        });
      } catch (e) {
        console.error('There was an error', e);
        res.send({
          error: "Unauthorized "
        }).status(401);
      }
    } else {
      res.status(401);
      res.send({
        error: "Unauthorized "
      });
    }
  });

// // Token based Auth
// app.use(function (req, res, next) {
//   if (req.headers["authorization"]) {
//     const token = req.headers['authorization'].split(' ')[1];
//     try {
//       //validate if token exists in the database
//       const session = getSession(token);
//       session.then(function (session) {
//         if (session) {
//           next();
//           return;
//         } else {
//           res.status(401);
//           res.send({
//             error: "Unauthorized "
//           });
//         }
//       })
//       .catch(function(err){
//         console.log('there was an error getting the session', err);
//         res.status(422);
//         res.send({
//           error: "There was an error: " + e.message
//         });
//       });

//     } catch (e) {
//       res.status(422);
//       res.send({
//         error: "There was an error: " + e.message
//       });
//     }
//   } else {
//     res.status(401);
//     res.send({
//       error: "Unauthorized "
//     });
//   }
// });


// listen to the task request
app.get("/api/careers", careerGet);
app.post("/api/careers", careerPost);
app.patch("/api/careers", careerPatch);
app.put("/api/careers", careerPatch);
app.delete("/api/careers", careerDelete);



app.listen(3001, () => console.log(`Example app listening on port 3001!`));
