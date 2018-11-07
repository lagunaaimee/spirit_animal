module.exports = function(sequelize, DataTypes) {
  var questions = sequelize.define("questions", {
    question: DataTypes.STRING,
    instructions: DataTypes.STRING
  });
  questions.bulkCreate([
    { question: "If you could be any animal, what would you be?" },
    { question: "What's your favorite smell?" },
    { question: "What's your go-to cheat meal?" },
    { question: "What animal do you fear the most?" },
    {
      question:
        "If you were in a horror film, what weapon would you use to defend yourself?"
    },
    { instructions: "Answer the following quesiton by uploading a photo."}
  ]);
  return questions;
};
