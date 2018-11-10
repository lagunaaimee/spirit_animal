// BEGIN users CONSTRUCTOR
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    userEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    userImage: DataTypes.STRING(2000) 
  });
  // END users CONSTRUCTOR
  return users;
};
// END EXPORT
