"use strict";

const questions = require("../files/questions.json");

questions.forEach((question) => {
  question.createdAt = new Date();
  question.updatedAt = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Questions", questions, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", null, {});
  },
};
