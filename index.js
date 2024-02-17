const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT;
const db = require("./db/models/index");

const paths = [
  "category",
  "notice",
  "order",
  "product",
  "user",
  "wishlist",
  "cart",
  "infomation",
  "message",
  "level",
  "payment",
];

for (const path of paths) {
  const Router = require(`./Routers/${path[0].toUpperCase()}${path.substring(
    1
  )}Router`);
  const Controller = require(`./Controllers/${path[0].toUpperCase()}${path.substring(
    1
  )}Controller`);
  const controller = new Controller(db);
  const router = new Router(controller).routes();
  app.use(`/${path}`, router);
}

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
