const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/careers", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const {
  careerPatch,
  careerPost,
  careerGet,
  careerDelete
} = require("./controllers/careerController.js");

const {
  coursePost, courseGet
} = require("./controllers/courseController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// listen to the task request
app.get("/api/careers", careerGet);
app.post("/api/careers", careerPost);
app.patch("/api/careers", careerPatch);
app.put("/api/careers", careerPatch);
app.delete("/api/careers", careerDelete);

// course
app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);

app.listen(3001, () => console.log(`Example app listening on port 3001!`));
