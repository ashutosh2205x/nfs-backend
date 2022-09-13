const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const mongoose = require("mongoose");
require("../../models/Fees");
const Fees = mongoose.model("fee");
const auth = require("../../middlewares/auth");

// create/save fee
router.post("/create", auth, async (req, res) => {
  const { month, paid, paid_on, student_id, amount } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    let feedata = await Fees.findOne({
      student_id,
      month,
    });
    if (feedata) {
      return res.status(400).send({
        message: `Fee data is already present for the month of ${month}`,
      });
    }
    feedata = new Fees({
      month,
      paid,
      paid_on,
      student_id,
      amount,
    });
    await feedata.save().then((response) => {
      res.status(200).json({
        data: response,
        message: "Fee data is saved successfully",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

// get fee data
router.get("/get/:student_id", auth, async (req, res) => {
  const { student_id } = req.params;
  try {
    await Fees.find({ student_id: student_id })
      .populate()
      .then((response) => {
        // const { data } = response;
        res.status(200).json({ data: response });
        // let newResponse =
        // if (data && Array.isArray(data)) {
        //   const {} = data;
        // } else {
        //   res.status(200).json({ data: [] });
        // }
      });
  } catch (e) {
    console.log(e);
    res.send({ error: "Error in fetching fees data" });
  }
});

module.exports = router;
