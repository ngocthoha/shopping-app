const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(morgan("combined"));
app.use(express.static(__dirname + "/public"));

const expressHbs = require("express-handlebars");
const hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/:page", (req, res) => {
  let banners = {
    blog: "Our Blog",
    category: "Shop Category",
    cart: "Shopping Cart",
  };
  let page = req.params.page;
  res.render(page, { banner: banners[page] });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
