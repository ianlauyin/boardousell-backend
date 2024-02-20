const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const { auth, claimIncludes } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

const checkRole = claimIncludes("permissions", "update:shop_data");

const port = process.env.PORT || 3000;
const db = require("./db/models/index");

const adminPaths = [
  "Category",
  "Infomation",
  "Level",
  "Message",
  "Notice",
  "Order",
  "Product",
  "User",
];

const customerPaths = [
  "Cart",
  "Message",
  "Order",
  "Payment",
  "User",
  "Wishlist",
];

const paths = ["Category", "Infomation", "Notice", "Product"];

for (const path of paths) {
  const Router = require(`./Routers/${path}Router`);
  const Controller = require(`./Controllers/${path}Controller`);
  const controller = new Controller(db);
  const router = new Router(controller).routes();
  app.use(`/${path.toLowerCase()}`, router);
}

for (const path of customerPaths) {
  const Router = require(`./Routers/CustomerRouters/${path}Router`);
  const Controller = require(`./Controllers/CustomerControllers/${path}Controller`);
  const controller = new Controller(db);
  const router = new Router(controller).routes();
  app.use(`/customer/${path.toLowerCase()}`, checkJwt, router);
}

for (const path of adminPaths) {
  const Router = require(`./Routers/AdminRouters/${path}Router`);
  const Controller = require(`./Controllers/AdminControllers/${path}Controller`);
  const controller = new Controller(db);
  const router = new Router(controller).routes();
  app.use(`/admin/${path.toLowerCase()}`, checkJwt, checkRole, router);
}

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
