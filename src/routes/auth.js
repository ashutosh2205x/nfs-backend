const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
require("../models/Student");
const User = mongoose.model("student");
var jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const result = require("dotenv").config({ path: "./configs/.env" });

// signup
router.post(
  "/signup",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    if (result.error) {
      throw result.error;
      // throw res.status(401).json({
      //   error: new Error("Process invalid!"),
      // });
    }
    const { email, password, f_name, l_name, standard, roll_no } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    console.log("---------");

    console.log("email->", email);
    console.log("password->", password);

    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      user = new User({
        email,
        password,
        f_name,
        l_name,
        standard,
        roll_no,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.MIDDLEWARE_KEY,
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
  }
);

// login
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          error: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: "Incorrect Password !",
        });
      } else {
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          process.env.MIDDLEWARE_KEY,
          {
            expiresIn: 100000,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token,
              expiresIn: 100000,
              user: {
                email: email,
                f_name: user.f_name,
                l_name: user.l_name,
                standard: user.standard,
                roll_no: user.roll_no,
                type: user.type,
              },
            });
          }
        );
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "Server Error",
      });
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.send({ error: "Error in Fetching user" });
  }
});

module.exports = router;
