var express = require("express");
// const { google } = require("googleapis");
var router = express.Router();
const Event = require("../models/Event");
const Family = require("../models/Family");
const Snapshot = require("../models/Snapshot");

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   "http://localhost:3000"
// );

router.get("/all-events", async (req, res, next) => {
  try {
    const foundEvents = await Event.find()
      .populate("endLocation")
      .populate("startLocation")
      .populate("location");
    res.json(foundEvents);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.get("/details/:eventId", async (req, res, next) => {
  console.log("GETTING SINGLE SNAPSHOT DETAILS");
  try {
    const foundEvent = await Event.findById(req.params.eventId);
    res.json(foundEvent);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//GET ALL EVENTS FOR ONE FAMILY/USER
router.get("/family-events/:familyId", async (req, res, next) => {
  console.log("GETTING EVENTS");
  try {
    const foundEvents = await Snapshot.findOne({
      family: req.params.familyId,
    }).populate("events");
    res.json(foundEvents);
    // let familyEvents = [];
    // const foundFamily = await Family.findById(req.params.familyId);
    // for await (user of foundFamily.users) {
    //   console.log(user);
    //   let userEvents = await Event.find({ driver: user });
    //   familyEvents = familyEvents.concat(userEvents);
    // }
    // res.json(familyEvents);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//EDIT SO THAT OVERLAPPING EVENT TIME WITH SAME CAR CANNOT BE ADDED!!!
router.post("/create/:familyId", async (req, res, next) => {
  console.log("CREATEING EVENT");
  const familyId = req.params.familyId;
  const nowDate = new Date();
  const date =
    nowDate.getFullYear() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getDate();
  try {
    // console.log('CREATE LOCATION REQ BODY: ', req.body);
    const createdEvent = await Event.create(req.body);
    const upsertedSnapshot = await Snapshot.findOneAndUpdate(
      {
        date: date,
        family: familyId,
      },
      { $addToSet: { events: createdEvent._id } },
      { new: true, upsert: true }
    );
    console.log(upsertedSnapshot);
    res.json(createdEvent);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.get("/details/:eventId", async (req, res, next) => {
  console.log("GETTING SINGLE EVENT DETAILS");
  try {
    const foundEvent = await Event.findById(req.params.eventId);
    res.json(foundEvent);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/update/:eventId", async (req, res, next) => {
  console.log("UPDATING EVENT");
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      {
        new: true,
      }
    );
    console.log("UPDATED EVENT: ", updatedEvent);
    res.json(updatedEvent);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/delete/:eventId", async (req, res, next) => {
  console.log("DELETING EVENT");
  const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
  res.json(deletedEvent);
});

module.exports = router;
