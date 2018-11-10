var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op

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
    })
  })
  // Final all Answers! 
  app.get("/api/allanswers", function (req, res) {
    db.answers.findAll({}).then(function (data) {
      res.json(data);
    })
  })

  // Find all questions and users
  app.get("/api/allanswerquestionsusers", function (req, res) {
    db.answers.findAll({ include: [{ model: db.questions }, { model: db.users }] }).then(function (data) {
      res.json(data);
    })
  })


  app.get("/api/testresults", function (req, res) {
    db.answers.findAll({ where: { answer: "fish", questionId: 1 }, include: [{ model: db.questions }, { model: db.users }] }).then(function (data) {
      res.json(data);
    })
  })


  app.get("/results/:id", function (req, res) {
    var id = req.params.id;
    var answers = [];
    db.answers.findAll({
      where: {
        userId: id
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
            [Op.ne]: id
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
        //running a function that renders the results

        db.users.findOne({ where: { id: array[0] } }).then(function (results) {
          res.render ("results", {
            // nameMatch: results.userId,
            emailMatch: results.userEmail
            // ImageMatch: results.userImage
          });
        })
        //res.json(userId);

      })


    });

  });

}