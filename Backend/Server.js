const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;
const db = require("./Db");
const router = require("./router/question");
const router1 = require("./router/answer");


db.connect();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({
  origin: "*",
}));

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/api", router);
app.use("/api", router1);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../fronted/build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../fronted/build/index.html`));
  } catch (e) {
    res.send("Oops! unexpected error");
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port no ${PORT} `);
});
