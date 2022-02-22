const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const db = require("../mongodb");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const orderInfo = req.body;
    const user_id = orderInfo.user_id;
    const product_id = orderInfo.product_id;
    const userIDfilter = { _id: ObjectId(user_id) };
    const userIDresult = await db.registrationdatacollection.findOne(
      userIDfilter
    );
    const productIDfilter = { _id: ObjectId(product_id) };
    const productIDresult = await db.productsdatacollection.findOne(
      productIDfilter
    );
    if (userIDresult && productIDresult) {
      const ordersdata = {
        user_id,
        product_id,
      };

      const result = await db.ordersdatacollection.insertOne(ordersdata);

      if (result.acknowledged == true) {
        console.log("Inserted Successfully");
        res.json({ data: "Inserted Successfully" });
      } else {
        console.log("error with this code");
        res.json({ data: "Error with this code" });
      }
    } else {
      res.json({ data: "No data found" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ data: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let placeOrdersInfo = [];
    const find = await db.ordersdatacollection.find({});
    const result = await find.toArray();
    for (const value of result) {
      const user_query = { _id: ObjectId(value.user_id) };
      const userInfo = await db.registrationdatacollection.findOne(user_query);
      const product_query = { _id: ObjectId(value.product_id) };
      const productInfo = await db.productsdatacollection.findOne(
        product_query
      );

      const placeOrdersData = {
        username: userInfo.name,
        productname: productInfo.name,
        productprice: productInfo.price,
      };

      placeOrdersInfo.push(placeOrdersData);
    }
    res.json(placeOrdersInfo);
  } catch (error) {
    console.log(error.message);
    res.send({ data: error.message });
  }
});

module.exports = router;
