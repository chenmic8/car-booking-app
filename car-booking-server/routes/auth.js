var express = require("express");
var router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAuthenticated = require("../middleware/isAuthenticated");

const { OAuth2Client } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

//
// router.post("/signup", (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if the email or password or name is provided as an empty string
//   if (email === "" || password === "") {
//     res.status(400).json({ message: "Provide email, password and name" });
//     return;
//   }

//   // Check the users collection if a user with the same email already exists
//   User.findOne({ email })
//     .then((foundUser) => {
//       // If the user with the same email already exists, send an error response
//       if (foundUser) {
//         res.status(400).json({ message: "User already exists." });
//         return;
//       }

//       // If the email is unique, proceed to hash the password
//       const salt = bcrypt.genSaltSync(saltRounds);
//       const hashedPassword = bcrypt.hashSync(password, salt);

//       // Create a new user in the database
//       // We return a pending promise, which allows us to chain another `then`
//       User.create({ email, password: hashedPassword })

//         .then((createdUser) => {
//           // Deconstruct the newly created user object to omit the password
//           // We should never expose passwords publicly
//           const { email, _id, profilePic } = createdUser;

//           // Create a new object that doesn't expose the password
//           const payload = {
//             email,
//             _id,
//             profilePic,
//             fullName: "",
//             location: "",
//             age: 0,
//           };

//           // Send a json response containing the user object

//           const authToken = jwt.sign(payload, process.env.SECRET, {
//             algorithm: "HS256",
//             expiresIn: "6h",
//           });

//           console.log("Signup line 57", payload);

//           res.status(201).json({ authToken: authToken, user: payload });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({ message: "Internal Server Error" });
//         });
//     })
//     .catch((err) => {
//       console.log("line67");
//       console.log(err);
//     });
// });
//

//sign up with google
router.post("/google/signup", async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    console.log(tokens);
    var profileInfoBase64Url = tokens.id_token.split(".")[1];
    // console.log("profileInfoBase64url", profileInfoBase64Url);
    var decodedProfileInfo = JSON.parse(atob(profileInfoBase64Url));
    // console.log("DECODED VALUE", decodedProfileInfo);
    const { email, given_name, family_name, picture } = decodedProfileInfo;

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const {
        firstName,
        lastName,
        email,
        birthdate,
        phone,
        role,
        address,
        profilePic,
      } = foundUser;
      const payload = {
        firstName,
        lastName,
        email,
        birthdate,
        phone,
        role,
        address,
        profilePic,
      };
      const authToken = jwt.sign(payload, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      console.log("PAYLOAD WITH USER INFO", createdUser);
      res.status(201).json({
        authToken: authToken,
        user: createdUser,
        accessToken: tokens.access_token,
      });
      // res.status(400).json({ message: "User already exists." });
      // return;
    }
    const createdUser = await User.create({
      email,
      firstName: given_name,
      lastName: family_name,
      profilePic: picture,
    });
    // for basic auth
    // delete createdUser._doc.password

    const authToken = jwt.sign({ payload: createdUser }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    console.log("PAYLOAD WITH USER INFO", createdUser);
    res.status(201).json({
      authToken: authToken,
      user: createdUser,
      accessToken: tokens.access_token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.post("/google/login", async (req, res) => {
//   try {
//     const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
//     console.log(tokens)
//     var profileInfoBase64Url = tokens.id_token.split(".")[1];
//     // console.log("profileInfoBase64url", profileInfoBase64Url);
//     var decodedProfileInfo = JSON.parse(atob(profileInfoBase64Url));
//     // console.log("DECODED VALUE", decodedProfileInfo);
//     const { email, given_name, family_name, picture } = decodedProfileInfo;

//     const foundUser = await User.findOne({ email });
//     if (foundUser) {
//       res.status(400).json({ message: "User already exists." });
//       return;
//     }
//     const createdUser = await User.create({
//       email,
//       firstName: given_name,
//       lastName: family_name,
//       profilePic: picture,
//     });
//     // for basic auth
//     // delete createdUser._doc.password

//     const authToken = jwt.sign({ payload: createdUser }, process.env.SECRET, {
//       algorithm: "HS256",
//       expiresIn: "1h",
//     });
//     console.log("PAYLOAD WITH USER INFO", createdUser);
//     res.status(201).json({ authToken: authToken, user: createdUser, accessToken: tokens.access_token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.post("/google/refresh-token", async (req, res) => {
//   const user = new UserRefreshClient(
//     clientId,
//     clientSecret,
//     req.body.refreshToken
//   );
//   const { credentials } = await user.refreshAccessToken(); // optain new tokens
//   res.json(credentials);
// });

router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
