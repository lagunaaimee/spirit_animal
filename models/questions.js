module.exports = function(sequelize, DataTypes) {
    var questions = sequelize.define("questions", {
        question: DataTypes.STRING
    });
    return questions;
}); 
