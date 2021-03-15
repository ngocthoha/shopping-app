let controller = {};
let models = require("../models");
let Product = models.Product;
controller.getTrendingProduct = () => {
  return new Promise((resovle, reject) => {
    Product.findAll({
      order: [["overallReview", "DESC"]],
      limit: 8,
      include: [{ model: models.Category }],
      attribute: ["id", "name", "imagepath", "price"],
    })
      .then((data) => resovle(data))
      .catch((error) => reject(new Error(error)));
  });
};
controller.getAll = () => {
  return new Promise((resovle, reject) => {
    Product.findAll({
      include: [{ model: models.Category }],
      attribute: ["id", "name", "imagepath", "price"],
    })
      .then((data) => resovle(data))
      .catch((error) => reject(new Error(error)));
  });
};
module.exports = controller;
