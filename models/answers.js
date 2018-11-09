module.exports = function (sequelize, DataTypes) {
  var answers = sequelize.define("answers", {
    userID: DataTypes.INTEGER,
    questionID: DataTypes.INTEGER,
    answer: DataTypes.STRING
  });
  return answers;
};
