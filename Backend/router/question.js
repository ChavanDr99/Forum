const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question");

router.post("/questions", async (req, res) => {
  console.log(req.body);
  const { data } = req.body

  try {
    await questionDB
      .create({
        questionName: data.questionName,
        questionUrl: data.questionUrl,
        user: data.user,
      })
      .then(() => {
        return res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })

      .catch((err) => {
        console.log(err)
        return res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});


router.get("/questions", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers", 
            localField: "_id", 
            foreignField: "questionId",
            as: "allAnswers", 
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

module.exports = router;