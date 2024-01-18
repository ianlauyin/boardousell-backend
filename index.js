const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const db = require("./db/models/index");

const CategoryRouter = require("./Routers/CategoryRouter");
const CategoryController = require("./Controllers/CategoryController");
const categoryController = new CategoryController(db);
const categoryRouter = new CategoryRouter(categoryController).routes();

app.use(cors());
app.use(express.json());
app.use("/cateegory", categoryRouter);

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
