const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.40e4v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();
console.log("ok");
const database = client.db("E-Commerce");
const registrationdatacollection = database.collection("userdata");
const categorydatacollection = database.collection("product_category");
const productsdatacollection = database.collection("products");
const ordersdatacollection = database.collection("orders");

module.exports = {
  registrationdatacollection,
  categorydatacollection,
  productsdatacollection,
  ordersdatacollection,
};
