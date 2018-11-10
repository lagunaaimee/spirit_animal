var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op


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

  // load the aboutUs page
  app.get("/aboutUs", function (req, res) {
    db.users.findAll({}).then(function (dbUsers) {
      res.render("aboutUs", {
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
    var idOfUser = req.params.id;
    console.log(id);
    db.answers.create({
      userId: req.params.id,
      questionId: id,
      answer: req.body.answer
    }).then(function (answer) {
      //Garrett- results was firing at question 4; now questioning 5
      if (5 === id) {
        var answers = [];
        db.answers.findAll({
          where: {
            userId: idOfUser
          },
          include: [{ model: db.questions }, { model: db.users }]
        }).then(function (data) {
          answers = data;
          var userAnswers = [];
          for (var i = 0; i < answers.length; i++) {
            userAnswers.push(answers[i].answer);
          }
          db.answers.findAll({
            where: {
              userId: {
                [Op.ne]: idOfUser
              },
              answer: {
                [Op.in]: userAnswers
              }
            }, include: [{ model: db.questions }, { model: db.users }]
          }).then(function (data2) {
            var answers2 = data2;
            var matchingAnswers = [];
            for (var j = 0; j < answers.length; j++) {
              for (var k = 0; k < answers2.length; k++) {
                if ((answers2[k].questionId == answers[j].questionId) && (answers2[k].answer == answers[j].answer)) {
                  matchingAnswers.push(answers2[k]);
                }
              }
            }
            var array = []
            for (var l = 0; l < matchingAnswers.length; l++) {
              array.push(matchingAnswers[l].userId)
            }
            var frequency = {};
            array.forEach(function (value) { frequency[value] = 0; });
            var uniques = array.filter(function (value) {
              return ++frequency[value] == 1;
            });
            var userId = uniques.sort(function (a, b) {
              return frequency[b] - frequency[a];
            });
            // we find our match(user) from the DB. 
            //running a function that renders the results with error handling
            if (array.length == 0) {
              res.render("results", {
                emailMatch: "No match found, sorry :("
              })
            }
            else {
              db.users.findOne({ where: { id: array[0] } }).then(function (results) {
                res.render("results", {
                  emailMatch: results.userEmail,
                  imageMatch: results.userImage
                });
              })
            }
            //res.json(userId);
          })
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