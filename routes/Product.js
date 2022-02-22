const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const db = require("../mongodb");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const productInfo = req.body;
    const category_id = productInfo.category_id;
    const name = productInfo.name;
    const image = productInfo.image;
    //   const image = productInfo.files.image;
    //   const pic = image.data;
    //   const encodedPic = pic.toString("base64");
    //   const imageBuffer = Buffer.from(encodedPic, "base64");
    const description = productInfo.description;
    const price = productInfo.price;
    const productsdata = {
      category_id,
      name,
      image,
      description,
      price,
    };

    const result = await db.productsdatacollection.insertOne(productsdata);
    if (result?.acknowledged == true) {
      console.log("Inserted Successfully");
      res.json({ data: "Inserted Successfully" });
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
  const query = await db.productsdatacollection.find({});
  const result = await query.toArray();
  let allProductsArray = [];
  let allProducts = {};
  for (let value of result) {
    if (!value) {
      return;
    } else {
      const query = { _id: ObjectId(value.category_id) };
      const result = await db.categorydatacollection.findOne(query);
      const catergoryName = result.category_name;
      const productName = value.name;
      const productDescription = value.description;
      const productPrice = value.price;
      allProducts = {
        catergoryName,
        productName,
        productDescription,
        productPrice,
      };
      allProductsArray.push(allProducts);

      console.log("category_name:", catergoryName);
      console.log("name:", productName);
      console.log("description", productDescription);
      console.log("price:", productPrice);
    }
  }
  res.send(allProductsArray);
});

module.exports = router;
