const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 7000;

const app = express();

app.use(cors());
app.use(express.json());

async function run() {
  try {
    const registrationRoute = require("./routes/Registration");
    const loginRoute = require("./routes/Login");
    const catergoryRoute = require("./routes/Category");
    const productRoute = require("./routes/Product");
    const orderRoute = require("./routes/Order");

    app.use("/registration", registrationRoute);
    app.use("/login", loginRoute);
    app.use("/category", catergoryRoute);
    app.use("/product", productRoute);
    app.use("/order", orderRoute);
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("server running");
});
app.listen(port, () => {
  console.log("server running at port", port);
});
