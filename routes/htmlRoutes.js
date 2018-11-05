var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.render("index", {
        msg: "Welcome to Spirit Animal Connection",
        users: dbUsers
      });
    });
  });

  // Load users page and pass in an user by id
  app.get("/users/:id", function(req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.render("users", {
        user: dbUsers
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
