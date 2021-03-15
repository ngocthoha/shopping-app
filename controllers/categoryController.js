let controller = {};
let models = require("../models");
let Category = models.Category;
controller.getAll = () => {
  return new Promise((resovle, reject) => {
    Category.findAll({ attribute: ["id", "name", "imagepath", "summary"] })
      .then((data) => resovle(data))
      .catch((error) => reject(new Error(error)));
  });
};

module.exports = controller;
