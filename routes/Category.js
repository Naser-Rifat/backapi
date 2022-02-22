const express = require("express");
const router = express.Router();
const db = require("../mongodb");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const categoryInfo = req.body;
    const category_name = categoryInfo.category_name;
    const category_description = categoryInfo.category_description;
    const userInfo = {
      category_name,
      category_description,
    };
    const result = await db.categorydatacollection.insertOne(userInfo);
    if (result?.acknowledged == true) {
      console.log("Inserted Successfully in category");
      res.json({ data: "Inserted Successfully in category" });
    } else {
      console.log("error with this code");
      res.json({ data: "error with this code" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ data: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = await db.categorydatacollection.find({});
    const result = await query.toArray();
    let allcategoryList = [];
    // console.log(result);
    for (const value of result) {
      const category_id = value._id + "";
      const category_name = value.category_name;
      console.log("Catergory Id:", category_id);
      console.log("Category Name:", category_name);
      const categorylist = {
        category_id,
        category_name,
      };
      allcategoryList.push(categorylist);
    }
    res.json(allcategoryList);
  } catch (error) {
    console.log(error.message);
    res.json({ data: error.message });
  }
});

module.exports = router;
