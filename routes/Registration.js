const express = require("express");
const router = express.Router();
const db = require("../mongodb");

router.post("/", async (req, res) => {
  console.log(req.body);
  const searchEmail = req.body.email;
  const filter = { email: searchEmail };
  const result = await db.registrationdatacollection.findOne(filter);
  if (!result) {
    const registrationInfo = req.body;
    const name = registrationInfo.name;
    const email = registrationInfo.email;
    const password = registrationInfo.password;
    const gender = registrationInfo.gender;
    const age = registrationInfo.age;
    const userInfo = {
      name,
      email,
      password,
      gender,
      age,
    };

    const result = await db.registrationdatacollection.insertOne(userInfo);
    if (result.acknowledged == true) {
      console.log("Inserted Successfully");
      res.send({ data: "Inserted Successfully" });
    } else {
      console.log("error with this code");
      res.send({ data: "error with this code" });
    }
  } else {
    console.log("This email already exist");
    res.send({ data: "This email already exist" });
  }
});

module.exports = router;
