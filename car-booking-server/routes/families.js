var express = require("express");
// const { google } = require("googleapis");
var router = express.Router();
const Family = require("../models/Family");
const Snapshot = require("../models/Snapshot");

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
    console.log("GETTING FAMILY FROM USER ID❤️");
    const foundFamilies = await Family.find({ users: req.params.userId })
      .populate("address")
      .populate("users")
      .populate("cars");
    res.json(foundFamilies);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//GETS FAMILY SNAPSHOTS, LOCATIONS, AND FAMILY DETAILS
router.get("/user-family-info/:userId", async (req, res, next) => {
  try {
    console.log("GETTING FAMILY FROM USER ID❤️");
    const foundFamily = await Family.findOne({ users: req.params.userId })
      .populate({ path: "users", populate: { path: "locations" } })
      .populate("address")
      .populate("cars");
    //GET FAMILY LOCATIONS GIVEN LIST OF USERS WITH POPULATED LOCATIONS
    console.log("got family", foundFamily);
    let familyLocations = [];
    for (user of foundFamily.users) {
      if (user.locations) {
        familyLocations = familyLocations.concat(user.locations);
      }
    }
    console.log("got family locations", familyLocations);
    //GET FAMILY SNAPSHOTS
    console.log(
      "GETTING THE SNAPSHOTS",
      foundFamily._id,
      "that was the familyid"
    );
    const ObjectId = require("mongodb").ObjectID;
    const foundSnapshots = await Snapshot.find({
      family: foundFamily._id,
    }).populate({
      path: "events",
      populate: [
        { path: "startLocation" },
        { path: "endLocation" },
        { path: "driver" },
        { path: "riders" },
        { path: "car" },
      ],
    });
    // // .populate("startLocation")
    // // .populate("endLocation");
    // // .populate("family");
    // console.log("got family snapshots", foundSnapshots);
    res.json({
      // familyId: foundFamily._id,
      // familyName: foundFamily.name,
      family: foundFamily,

      // familyCars: foundFamily.cars,
      // familyUsers: foundFamily.users,

      // familyAddress: foundFamily.address,
      locations: familyLocations,
      snapshots: foundSnapshots,
    });
  } catch (error) {
    res.status(500).json({ message: "issue getting family information" });
  }
});

router.get("/user-family/:userId", async (req, res, next) => {
  try {
    const foundFamily = await Family.findOne({ users: req.params.userId })
      .populate("users")
      .populate("cars")
      .populate("");
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
