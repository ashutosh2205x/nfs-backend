const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const mongoose = require("mongoose");
require("../../models/Fees");
const Fees = mongoose.model("fee");
const auth = require("../../middlewares/auth");


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