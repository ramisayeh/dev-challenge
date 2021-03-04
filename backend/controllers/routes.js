var express = require("express");
var router = express.Router();
const profile = require("../models/profile");

router.post("/updateprofile", async (req, res) => {
  try {
    var obj = {};

    if (req.body.name) {
      obj["name"] = req.body.name;
    }

    if (req.body.bio) {
      obj["bio"] = req.body.bio;
    }

    if (req.body.phone) {
      obj["phone"] = req.body.phone;
    }

    if (req.body.image) {
      obj["image"] = req.body.image;
    }

    let user = await profile.findOneAndUpdate({ uid: req.body.uid }, obj);
    if (!user) {
      const info = {
        name: req.body.name,
        bio: req.body.bio,
        phone: req.body.phone,
        uid: req.body.uid,
        image: req.body.image,
      };

      const newUser = new profile(info);
      await newUser.save();
      res.json({
        msg: " successfully added to database ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/user", async (req, res) => {
  try {
    let user = await profile.findOne({ uid: req.params.name });
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
