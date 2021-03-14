const express = require("express");
const app = express();

// use morgan logger
//const morgan = require("morgan");
//app.use(morgan("combined"));
// set public static folder
app.use(express.static(__dirname + "/public"));

// use view engine
const expressHbs = require("express-handlebars");
const hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// define routers
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/:page", (req, res) => {
  let banners = {
    blog: "Our Blog",
    category: "Shop Category",
    cart: "Shopping Cart",
    register: "Register",
    tracking: "Order Tracking",
  };
  let page = req.params.page;
  res.render(page, { banner: banners[page] });
});

// set server port & start server
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
