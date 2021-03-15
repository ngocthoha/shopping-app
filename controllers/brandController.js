let controller = {};
let models = require("../models");
let Brand = models.Brand;
controller.getAll = () => {
  return new Promise((resovle, reject) => {
    Brand.findAll({
      attribute: ["id", "name", "imagepath"],
      include: [{ model: models.Product }],
    })
      .then((data) => resovle(data))
      .catch((error) => reject(new Error(error)));
  });
};

module.exports = controller;
