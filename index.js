const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT;
const db = require("./db/models/index");

const CategoryRouter = require("./Routers/CategoryRouter");
const CategoryController = require("./Controllers/CategoryController");
const categoryController = new CategoryController(db);
const categoryRouter = new CategoryRouter(categoryController).routes();

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

const InfomationRouter = require("./Routers/InfomationRouter");
const InfomationController = require("./Controllers/InfomationController");
const infomationController = new InfomationController(db);
const infomationRouter = new InfomationRouter(infomationController).routes();

const MessageRouter = require("./Routers/MessageRouter");
const MessageController = require("./Controllers/MessageController");
const messageController = new MessageController(db);
const messageRouter = new MessageRouter(messageController).routes();

const LevelRouter = require("./Routers/LevelRouter");
const LevelController = require("./Controllers/LevelController");
const levelController = new LevelController(db);
const levelRouter = new LevelRouter(levelController).routes();

const PaymentRouter = require("./Routers/PaymentRouter");
const PaymentController = require("./Controllers/PaymentController");
const paymentController = new PaymentController();
const paymentRouter = new PaymentRouter(paymentController).routes();

app.use("/category", categoryRouter);
app.use("/notice", noticeRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/infomation", infomationRouter);
app.use("/message", messageRouter);
app.use("/level", levelRouter);
app.use("/payment", paymentRouter);

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
