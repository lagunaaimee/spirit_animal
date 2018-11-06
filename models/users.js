// BEGIN users CONSTRUCTOR
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    userID: DataTypes.STRING,
    userEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    userImage: DataTypes.STRING
  });
  // END users CONSTRUCTOR
  return users;
};
// END EXPORT
