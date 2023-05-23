var express = require("express");
// const { google } = require("googleapis");
var router = express.Router();
const Family = require("../models/Family");

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   "http://localhost:3000"
// );

router.get("/all-families", async (req, res, next) => {
  try {
    const foundFamilies = await Family.find();
    res.json(foundFamilies);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.get("/details/:familyId", async (req, res, next) => {
  console.log("GETTING SINGLE FAMILY DETAILS");
  try {
    const foundFamily = await Family.findById(req.params.familyId);
    res.json(foundFamily);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.get("/users-families/:userId", async (req, res, next) => {
  try {
    const foundFamilies = await Family.find({ users: req.params.userId });
    res.json(foundFamilies);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.get("/user-family/:userId", async (req, res, next) => {
  try {
    const foundFamily = await Family.findOne({ users: req.params.userId })
      .populate("users")
      .populate('');
    res.json(foundFamily);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/create", async (req, res, next) => {
  console.log("CREATEING FAMILY");
  try {
    // console.log('CREATE LOCATION REQ BODY: ', req.body);
    const createdFamily = await Family.create(req.body);
    res.json(createdFamily);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.get("/details/:familyId", async (req, res, next) => {
  console.log("GETTING SINGLE FAMILY DETAILS");
  try {
    const foundFamily = await Family.findById(req.params.familyId);
    res.json(foundFamily);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/update/:familyId", async (req, res, next) => {
  console.log("UPDATING FAMILY");
  try {
    const updatedFamily = await Family.findByIdAndUpdate(
      req.params.familyId,
      req.body,
      {
        new: true,
      }
    );
    console.log("UPDATED FAMILY: ", updatedFamily);
    res.json(updatedFamily);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/delete/:familyId", async (req, res, next) => {
  console.log("DELETING FAMILY");
  const deletedFamily = await Family.findByIdAndDelete(req.params.familyId);
  res.json(deletedFamily);
});

module.exports = router;
