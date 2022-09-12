const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../../models/ClassTimetable");
const ClassTimetable = mongoose.model("classtimetable");
const { validationResult } = require("express-validator");
const auth = require("../../middlewares/auth");

// create timetable
router.post("/create", auth, async (req, res) => {
  const {
    day,
    period_start_time,
    period_end_time,
    subject,
    teacher,
    standard,
    section,
    lunch_start_time,
    lunch_end_time,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  console.log("timetable->", req.body);
  let uid = standard + section + day;
  try {
    let timetable = await ClassTimetable.findOne({
      uid,
    });
    if (timetable) {
      return res.status(400).json({
        msg: "Class time table already exists",
      });
    }

    timetable = new ClassTimetable({
      day,
      period_start_time,
      period_end_time,
      subject,
      teacher,
      standard,
      section,
      lunch_start_time,
      lunch_end_time,
      uid: uid,
    });
    await timetable.save().then((response) => {
      res.status(200).json({
        data: response,
        message: "Class time table successfully created",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

// get timetable
router.get("/get", auth, async (req, res) => {
  try {
    await ClassTimetable.find()
      .populate()
      .then((response) => {
        res.status(200).json({ data: response });
      });
  } catch (e) {
    console.log(e);
    res.send({ error: "Error in fetching timetable" });
  }
});

module.exports = router;
