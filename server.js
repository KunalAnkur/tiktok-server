const express = require("express");
const mongoose = require("mongoose");
const Data = require("./data.js");
const Videos = require("./dbModel.js");
// app config
const app = express();

const port = 9000;

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*"),
    res.setHeaders("Access-Control-Allow-Headers", "*"),
    next();
});
// DB config

const connection_url =
  "mongodb+srv://ankur-kunal:ankurkunal@cluster0.heahm.mongodb.net/tiktokDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// api endpoint

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.get("/v1/posts", (req, res) => {
  res.status(200).send(Data);
});
app.get("/v2/posts", (req, res) => {
  Videos.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
// listen
app.listen(port, () => {
  console.log(`server is start at port ${port}`);
});
