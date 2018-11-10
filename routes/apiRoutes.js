var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function (app) {
  // Get all users
  app.get("/api/users", function (req, res) {
    db.users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new user
  app.post("/api/users", function (req, res) {
    db.users.create(req.body).then(function (dbUsers) {
      res.send({ redirect: "/questions/" + dbUsers.id });
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function (req, res) {
    db.users.destroy({ where: { id: req.params.id } }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });


  app.get("/api/allanswerquestions", function (req, res) {
    db.answers.findAll({ include: [{ model: db.questions }] }).then(function (data) {
      res.json(data);
    });
  });
  // Final all Answers! 
  app.get("/api/allanswers", function (req, res) {
    db.answers.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  // Find all questions and users
  app.get("/api/allanswerquestionsusers", function (req, res) {
    db.answers.findAll({ include: [{ model: db.questions }, { model: db.users }] }).then(function (data) {
      res.json(data);
    });
  });


  app.get("/api/testresults", function (req, res) {
    db.answers.findAll({ where: { answer: "fish", questionId: 1 }, include: [{ model: db.questions }, { model: db.users }] }).then(function (data) {
      res.json(data);
    });
  });

};