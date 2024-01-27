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

const AddressRouter = require("./Routers/AddressRouter");
const AddressController = require("./Controllers/AddressController");
const addressController = new AddressController(db);
const addressRouter = new AddressRouter(addressController).routes();

const NoticeRouter = require("./Routers/NoticeRouter");
const NoticeController = require("./Controllers/NoticeController");
const noticeController = new NoticeController(db);
const noticeRouter = new NoticeRouter(noticeController).routes();

const OrderRouter = require("./Routers/OrderRouter");
const OrderController = require("./Controllers/OrderController");
const orderController = new OrderController(db);
const orderRouter = new OrderRouter(orderController).routes();

const ProductRouter = require("./Routers/ProductRouter");
const ProductController = require("./Controllers/ProductController");
const productController = new ProductController(db);
const productRouter = new ProductRouter(productController).routes();

const ReviewRouter = require("./Routers/ReviewRouter");
const ReviewController = require("./Controllers/ReviewController");
const reviewController = new ReviewController(db);
const reviewRouter = new ReviewRouter(reviewController).routes();

const UserRouter = require("./Routers/UserRouter");
const UserController = require("./Controllers/UserController");
const userController = new UserController(db);
const userRouter = new UserRouter(userController).routes();

const WishlistRouter = require("./Routers/WishlistRouter");
const WishlistController = require("./Controllers/WishlistController");
const wishlistController = new WishlistController(db);
const wishlistRouter = new WishlistRouter(wishlistController).routes();

const CartRouter = require("./Routers/CartRouter");
const CartController = require("./Controllers/CartController");
const cartController = new CartController(db);
const cartRouter = new CartRouter(cartController).routes();

app.use(cors());
app.use(express.json());
app.use("/category", categoryRouter);
app.use("/address", addressRouter);
app.use("/notice", noticeRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
