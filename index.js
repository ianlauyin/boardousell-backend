const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const db = require("./db/models/index");

const AddressRouter = require("./Routers/AddressRouter");
const AddressController = require("./Controllers/AddressController");
const addressController = new AddressController(db.address);
const addressRouter = new AddressRouter(addressController).routes();

app.use(cors());
app.use(express.json());
app.use("/address", addressRouter);

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
