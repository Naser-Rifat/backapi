const express = require("express");
const router = express.Router();
const db = require("../mongodb");

router.get("/", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  const query = { email: email };

  const result = await db.registrationdatacollection.findOne(query);

  if (result.email == email && result.password == password) {
    console.log("Logged in Sucessfully with userid");
    res.json({ data: "Logged in Sucessfully with userid" });
  } else {
    console.log("Error with code");
    res.json({ data: "Error with code" });
  }
});

module.exports = router;
