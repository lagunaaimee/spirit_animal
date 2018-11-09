module.exports = function(sequelize, DataTypes) {
  var answers = sequelize.define("answers", {
    answer: DataTypes.STRING
  });


  
  answers.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    answers.belongsTo(models.questions, {
      foreignKey: {
        allowNull: false
      }
    });
    answers.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return answers;
};
