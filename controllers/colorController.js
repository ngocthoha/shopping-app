let controller = {};
let models = require("../models");
let Color = models.Color;
controller.getAll = () => {
  return new Promise((resovle, reject) => {
    Color.findAll({
      attribute: ["id", "name", "imagepath", "code"],
      include: [{ model: models.ProductColor }],
    })
      .then((data) => resovle(data))
      .catch((error) => reject(new Error(error)));
  });
};

module.exports = controller;
