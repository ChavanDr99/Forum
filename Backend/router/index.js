const express = require("express");
const router = express.Router();

const questionRouter = require("./question");
const answerRouter = require("./answer");

router.get('/', (req, res) => {
  res.send("This api is forcd forum");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);

module.exports = router;