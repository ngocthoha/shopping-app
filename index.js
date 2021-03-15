const express = require("express");
const app = express();

// use morgan logger
// const morgan = require("morgan");
// app.use(morgan("combined"));
// set public static folder
app.use(express.static(__dirname + "/public"));

// use view engine
const expressHbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// define routers
// / -> index
// /products -> category
// /products/id -> single product

// index.js -> routes/..Router.js -> controlers/..Controller.js
app.use("/", require("./routes/indexRouter"));
app.use("/products", require("./routes/productRouter"));
app.get("/sync", (req, res) => {
  const models = require("./models");
  models.sequelize.sync().then(() => {
    res.send("database sync completed");
  });
});
app.get("/:page", (req, res) => {
  let banners = {
    blog: "Our Blog",
    category: "Shop Category",
    cart: "Shopping Cart",
    register: "Register",
    tracking: "Order Tracking",
    products: "Product",
  };
  let page = req.params.page;
  res.render(page, { banner: banners[page] });
});

// set server port & start server
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:3000`);
});
