const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser=require('../middleware/fetchUser');

JWT_SECRET = "firstfullstack-app";

//ROUTE 1: Create a user using : POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //check wether user with the same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({success, error: "Sorry a user with this email already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
     success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//ROUTE 3: Get logged in user details using: POST "/api/auth/getuser". Login Required
router.get(
  "/getuser", 
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ], fetchUser, 
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

module.exports = router;
