const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
require("../../models/User");
const User = mongoose.model("user");
var jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth.m");
const sendEmail = require("../../utils/email.util");
const { InvitationHTML } = require("../../utils/email-templates");
const result = require("dotenv").config({ path: "./configs/.env" });
const handlebars = require("handlebars");

//  signup
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
    }
    const {
      email,
      password,
      f_name,
      l_name,
      standard,
      roll_no,
      section,
      role,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          error: "User Already Exists",
        });
      }
      //  signup
      user = new User({
        email,
        password,
        f_name,
        l_name,
        standard,
        section,
        roll_no,
        role,
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
              // user: user,
              user: {
                email: email,
                f_name: user.f_name,
                l_name: user.l_name,
                standard: user.standard,
                section: user.section,
                roll_no: user.roll_no,
                role: user.role,
                _id: user._id,
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

// get user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.send({ error: "Error in Fetching user" });
  }
});

// update user
router.put("/update/:_id", auth, async (req, res) => {
  console.log("_id", req.params, req.body);
  const { email, password, f_name, l_name, standard, roll_no } = req.body;
  User.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        email,
        password,
        f_name,
        l_name,
        standard,
        roll_no,
        modified_at: Date.now(),
      },
    },
    { new: true },
    (err, User) => {
      if (err) {
        res.status(401).send(err);
      } else res.status(200).json(User);
    }
  );
});

// delete user
router.delete("/delete/:id", (req, res) => {
  User.deleteOne({ _id: req.body._id })
    .then(res.status(200).send({ message: `deleted ${req.body._id}` }))
    .catch((err) => {
      console.log(err);
    });
});

// invite user
router.post(
  "/invite",
  [check("email", "Please enter a valid email").isEmail()],
  auth,
  async (req, res, next) => {
    if (result.error) {
      throw result.error;
    }
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      // var template = handlebars.compile(InvitationHTML());
      // var htmlToSend = template({ school_name: "SchoolName" });

      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          error: "User Already Exists",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        let unhashed = Math.random().toString(36);
        let options = {
          to: email,
          subject: "NextFutureSchool Invitation",
          // html: htmlToSend,
          html: `<h1>Welcome to NFS</h1><br/><p>That was easy!</p><br/><h2><strong>user:</strong><p>${email}</p></h2><br/><h2><strong>password:</strong><p>${unhashed}</p></h2>`,
        };
        await sendEmail(options, next);
        let password = await bcrypt.hash(unhashed, salt);
        user = new User({
          email,
          password,
        });
        await user.save();
        res
          .json({
            status: "success",
            data: { email: req.body },
          })
          .send(200);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
  }
);

// // admin signup
// router.post(
//   "admin/signup",
//   [
//     check("email", "Please enter a valid email").isEmail(),
//     check("password", "Please enter a valid password").isLength({
//       min: 6,
//     }),
//   ],
//   async (req, res) => {
//     if (result.error) {
//       throw result.error;
//     }
//     const { email, password, f_name, l_name } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//       });
//     }
//     try {
//       let user = await User.findOne({
//         email,
//       });
//       if (user) {
//         return res.status(400).json({
//           msg: "User Already Exists",
//         });
//       }

//       user = new User({
//         email,
//         password,
//         f_name,
//         l_name,
//       });

//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         process.env.MIDDLEWARE_KEY,
//         {
//           expiresIn: 10000,
//         },
//         (err, token) => {
//           if (err) throw err;
//           res.status(200).json({
//             token,
//           });
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ error: err.message });
//     }
//   }
// );

module.exports = router;
