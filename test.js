// const { MongoClient } = require("mongodb");

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const ObjectId = require("mongodb").ObjectId;

// const port = process.env.PORT || 7000;

// const app = express();

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.40e4v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function run() {
//   try {
//     await client.connect();
//     console.log("ok");
//     const database = await client.db("E-Commerce");
//     const registrationdatacollection = await database.collection("userdata");
//     const categorydatacollection = await database.collection(
//       "product_category"
//     );
//     const productsdatacollection = await database.collection("products");
//     const ordersdatacollection = await database.collection("orders");

//     //Api for  Registration
//     app.post("/registration", async (req, res) => {
//       console.log(req.body);
//       const searchEmail = req.body.email;
//       const filter = { email: searchEmail };
//       const result = await registrationdatacollection.findOne(filter);
//       if (!result) {
//         const registrationInfo = req.body;
//         const name = registrationInfo.name;
//         const email = registrationInfo.email;
//         const password = registrationInfo.password;
//         const gender = registrationInfo.gender;
//         const age = registrationInfo.age;
//         const userInfo = {
//           name,
//           email,
//           password,
//           gender,
//           age,
//         };

//         const result = await registrationdatacollection.insertOne(userInfo);
//         if (result.acknowledged == true) {
//           console.log("Inserted Successfully");
//           res.send({ data: "Inserted Successfully" });
//         } else {
//           console.log("error with this code");
//           res.send({ data: "error with this code" });
//         }
//       } else {
//         console.log("This email already exist");
//       }
//     });

//     //Api for login
//     app.get("/login", async (req, res) => {
//       const email = req.query.email;
//       const password = req.query.password;
//       //  console.log(password);
//       const query = { email: email };
//       //  console.log(query);
//       const result = await registrationdatacollection.findOne(query);
//       //   console.log(result);
//       if (result.email == email && result.password == password) {
//         console.log("Logged in Sucessfully with userid");
//         res.json({ data: "Logged in Sucessfully with userid" });
//       } else {
//         console.log("Error with code");
//         res.json({ data: "Error with code" });
//       }
//     });

//     //Api for insert product category
//     app.post("/category", async (req, res) => {
//       //  console.log(req.body);
//       const categoryInfo = req.body;
//       const category_name = categoryInfo.Category_Name;
//       const category_description = categoryInfo.Category_Description;
//       const userInfo = {
//         category_name,
//         category_description,
//       };
//       const result = await categorydatacollection.insertOne(userInfo);
//       if (result.acknowledged == true) {
//         console.log("Inserted Successfully in category");
//         res.json({ data: "Inserted Successfully in category" });
//       } else {
//         console.log("error with this code");
//         res.json({ data: "error with this code" });
//       }
//     });

//     // Api for catergory list
//     app.get("/category", async (req, res) => {
//       const query = await categorydatacollection.find({});
//       const result = await query.toArray();

//       console.log(result);
//       for (const value of result) {
//         const category_id = value._id + "";
//         const category_name = value.category_name;
//         console.log("Catergory Id:", category_id);
//         console.log("Category Name:", category_name);
//         const categorylist = {
//           category_id,
//           category_name,
//         };
//         res.json(categorylist);
//       }
//     });

//     // Api for insert product
//     app.post("/product", async (req, res) => {
//       console.log(req.body);
//       const productInfo = req.body;
//       const category_id = productInfo.category_id;
//       const name = productInfo.name;
//       const image = productInfo.image;
//       //   const image = productInfo.files.image;
//       //   const pic = image.data;
//       //   const encodedPic = pic.toString("base64");
//       //   const imageBuffer = Buffer.from(encodedPic, "base64");
//       const description = productInfo.description;
//       const price = productInfo.price;
//       const productsdata = {
//         category_id,
//         name,
//         image,
//         description,
//         price,
//       };

//       const result = await productsdatacollection.insertOne(productsdata);

//       if (result.acknowledged == true) {
//         console.log("Inserted Successfully");
//         res.json({ data: "Inserted Successfully" });
//       } else {
//         console.log("error with this code");
//         res.json({ data: "error with this code" });
//       }
//     });

//     //Api for get all products
//     app.get("/product", async (req, res) => {
//       const query = await productsdatacollection.find({});
//       const result = await query.toArray();
//       let allProductsArray = [];
//       let allProducts = {};
//       for (let value of result) {
//         if (!value) {
//           return;
//         } else {
//           const query = { _id: ObjectId(value.category_id) };
//           const result = await categorydatacollection.findOne(query);
//           const catergoryName = result.category_name;
//           const productName = value.name;
//           const productDescription = value.description;
//           const productPrice = value.price;
//           allProducts = {
//             catergoryName,
//             productName,
//             productDescription,
//             productPrice,
//           };
//           allProductsArray.push(allProducts);

//           console.log("category_name:", catergoryName);
//           console.log("name:", productName);
//           console.log("description", productDescription);
//           console.log("price:", productPrice);
//         }
//       }
//       res.send(allProductsArray);
//     });

//     //Api to place an order
//     app.post("/order", async (req, res) => {
//       console.log(req.body);
//       const orderInfo = req.body;
//       const user_id = orderInfo.user_id;
//       const product_id = orderInfo.product_id;
//       const userIDfilter = { _id: ObjectId(user_id) };
//       const userIDresult = await registrationdatacollection.findOne(
//         userIDfilter
//       );
//       const productIDfilter = { _id: ObjectId(product_id) };
//       const productIDresult = await productsdatacollection.findOne(
//         productIDfilter
//       );
//       if (userIDresult && productIDresult) {
//         const ordersdata = {
//           user_id,
//           product_id,
//         };

//         const result = await ordersdatacollection.insertOne(ordersdata);

//         if (result.acknowledged == true) {
//           console.log("Inserted Successfully");
//           res.json({ data: "Inserted Successfully" });
//         } else {
//           console.log("error with this code");
//           res.json({ data: "Error with this code" });
//         }
//       } else {
//         res.json({ data: "No data found" });
//       }
//     });

//     //Api get list of an place order
//     app.get("/order/:id", async (req, res) => {
//       const id = req.params.id;
//       const userID = { user_id: id };

//       let placeOrdersInfo = [];
//       const userIDInfo = await ordersdatacollection.find(userID);
//       const userResult = await userIDInfo.toArray();
//       for (const value of userResult) {
//         const user_query = { _id: ObjectId(value.user_id) };
//         const userInfo = await registrationdatacollection.findOne(user_query);
//         console.log(userInfo);
//         const product_query = { _id: ObjectId(value.product_id) };
//         const productInfo = await productsdatacollection.findOne(product_query);
//         console.log(productInfo);

//         const placeOrdersData = {
//           username: userInfo.name,
//           productname: productInfo.name,
//           productprice: productInfo.price,
//         };
//         placeOrdersInfo.push(placeOrdersData);
//       }
//       res.json(placeOrdersInfo);
//     });
//   } finally {
//     // await client.close()
//   }
// }
// run().catch(console.dir);

// app.get("/", async (req, res) => {
//   res.send("server running");
// });
// app.listen(port, () => {
//   console.log("server running at port", port);
// });
