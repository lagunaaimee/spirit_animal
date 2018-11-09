var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.users.findAll({}).then(function (dbUsers) {
      res.render("index", {
        msg: "Welcome to Spirit Animal Connection",
        users: dbUsers
      });
    });
  });
  // Load users page and pass in an user by id
  app.get("/api/users/:id", function (req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function (dbUsers) {
      res.render("users", {
        user: dbUsers
      });
    });
  });
  app.get("/questions/:id", function (req, res) {
    db.questions
      .findOne({ where: { id: 1 } })
      .then(function (dbQuestions) {
        res.render("questions1", {
          question: dbQuestions.question,
          instructions: "Answer the following quesiton by uploading a photo.",
          userId: req.params.id,
          id: dbQuestions.id
        });
      });
  });
  app.post("/questions/:id", function (req, res) {
    var id = parseInt(req.body.questionId);
    console.log(id);
    db.answers.create({
      userId: req.params.id,
      questionId: id,
      answer: req.body.answer
    }).then(function (answer) {
      //Garrett- results was firing at question 4; now questioning 5
      if (5 === id) {
        res.render("results", {

        });
      } else {
        console.log(answer.questionId);
        db.questions
          .findOne({ where: { id: parseInt(answer.questionId) + 1 } })
          .then(function (dbQuestions) {
            res.render("questions1", {
              question: dbQuestions.question,
              instructions: "Answer the following quesiton by uploading a photo.",
              userId: req.params.id,
              id: dbQuestions.id
            });
          });
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
