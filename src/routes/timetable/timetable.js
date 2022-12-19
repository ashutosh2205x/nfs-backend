const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../../models/ClassTimetable");
const ClassTimetable = mongoose.model("classtimetable");
const { validationResult } = require("express-validator");
const auth = require("../../middlewares/auth.m");

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
    subject_code,
    teacher_id,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    let uid = standard + section.toUpperCase() + day.charAt(0) + subject_code;
    console.log("uid->", uid);
    let timetable = await ClassTimetable.findOne({
      uid,
    });
    if (timetable) {
      return res.status(400).json({
        message: "Class time table already exists",
      });
    }

    timetable = new ClassTimetable({
      day,
      period_start_time,
      period_end_time,
      subject,
      teacher,
      teacher_id,
      standard,
      section,
      lunch_start_time,
      lunch_end_time,
      uid: uid,
      subject_code,
      schedule_parent_node: standard + section + day,
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

// get timetable all
router.get("/get/all", auth, async (req, res) => {
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

// get via single node
router.get("/get/one/:standard/:section/:day", auth, async (req, res) => {
  let schedule_parent_node =
    req.params.standard + req.params.section + req.params.day;
  try {
    await ClassTimetable.find({ schedule_parent_node: schedule_parent_node })
      .populate()
      .then((response) => {
        res.status(200).json({ data: response });
      });
  } catch (e) {
    console.log(e);
    res.send({ error: "Error in fetching timetable" });
  }
});

// get time table via teacher_id (for teacher dashboard)
router.get("/get/:uid", auth, async (req, res) => {
  try {
    await ClassTimetable.find({ teacher_id: req.params.uid })
      .populate()
      .then((response) => {
        res.status(200).json({ data: response });
      });
  } catch (e) {
    console.log(e);
    res.send({ error: "Error in fetching timetable" });
  }
});

// delete timetable
router.delete("/delete/:uid", (req, res) => {
  ClassTimetable.findOne({ _id: req.params.uid })
    .deleteOne({ _id: req.params.uid })
    .then(res.status(200).send({ message: `succesfully deleted timetable !` }))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
