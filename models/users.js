module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    userID: DataTypes.STRING,
    userEmail: DataTypes.TEXT,
    userImage: DataTypes.STRING
  });
  return users;
};
