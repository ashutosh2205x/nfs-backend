const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Hostels");
const Hostel = mongoose.model("hostel");
const { validationResult } = require("express-validator");
const auth = require("../middlewares/auth");

// create hostel
router.post("/create", auth, async (req, res) => {
  const { name, rating, address, location, uid } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  console.log("hostel->", req.body);

  try {
    let hostel = await Hostel.findOne({
      name,
    });
    if (hostel) {
      return res.status(400).json({
        msg: "Hostel already exists",
      });
    }

    hostel = new Hostel({
      name,
      rating,
      address,
      location,
    });
    await hostel.save().then((response) => {
      res
        .status(200)
        .json({ data: response, message: "Hostel successfully created" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

// get all
router.get("/get", auth, async (req, res) => {
  try {
    const hostels = await Hostel.find()
      .populate()
      .then((response) => {
        res.status(200).json({ data: response });
      });
  } catch (e) {
    console.log(e);
    res.send({ error: "Error in fetching hostels" });
  }
});

// update hostel
router.put("/update/:_id", auth, async (req, res) => {
  const { name, rating, address, location, uid } = req.body;
  Hostel.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        name,
        rating,
        address,
        location,
        modified_at: Date.now(),
      },
    },
    { new: true },
    (err, Hostel) => {
      if (err) {
        res.status(401).send(err);
      } else res.status(200).json(Hostel);
    }
  );
});

// delete hostel entry
router.delete("/delete/:uid", (req, res) => {
  Hostel.findOne({ _id: req.params.uid })
    .deleteOne({ _id: req.params.uid })
    .then(res.status(200).send({ message: `succesfully deleted hostel !` }))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
