const express = require("express");
const User = require("../models/User");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    console.log("success");
    User.find()
      .then((data) => res.send(json(data)))
      .catch((err) => res.status(400).send(err));
  })
  .post(async (req, res) => {
    try {
      const { email, password, username, age } = req.body;

      // Validate inputs
      if (!email || !password || !username) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = new User({ email, password, username, age });
      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
