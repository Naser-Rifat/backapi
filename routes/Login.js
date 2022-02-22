const express = require("express");
const router = express.Router();
const db = require("../mongodb");

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const query = { email: email };
    console.log(email);
    const result = await db.registrationdatacollection.findOne(query);

    if (result?.email == email && result?.password == password) {
      console.log("Logged in Sucessfully with userid");
      res.json({ data: "Logged in Sucessfully with userid" });
    } else {
      console.log("Error with code");
      res.json({ data: "Error with code" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ data: error.message });
  }
});

module.exports = router;
