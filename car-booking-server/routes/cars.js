var express = require("express");
var router = express.Router();
const Car = require("../models/Car");

/* GET home page. */
router.get("/all-cars", (req, res, next) => {
  console.log("GETTING CARS");
  Car.find().then((cars) => res.json(cars));
});

router.post("/create", (req, res, next) => {
  console.log("CREATING CAR");
  Car.create(req.body).then((createdCar) => res.json(createdCar));
});

router.post("/update/:carId", (req, res, next) => {
  console.log("UPDATING CAR");
  Car.findByIdAndUpdate(req.params.carId, req.body, { new: true }).then(
    (updatedCar) => res.json(updatedCar)
  );
});

router.post("/delete/:carId", (req, res, next) => {
  Car.findByIdAndDelete(req.params.carId).then((deletedCar) =>
    res.json(deletedCar)
  );
});

module.exports = router;
