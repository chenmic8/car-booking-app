var express = require("express");
const { google } = require("googleapis");
var router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://localhost:3000"
);

router.get("/all-events", (req, res, next) => {
  res.render("index", { title: "Express" });
});
router.post("/create-event", (req, res, next) => {
  try {
    const {
      title,
      startTime,
      endTime,
      startLocation,
      endLocation,
      driver,
      riders,
      car,
    } = req.body;
    oauth2Cl;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
