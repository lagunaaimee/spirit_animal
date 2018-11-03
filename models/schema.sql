DROP DATABASE IF EXISTS spirit_animaldb;
CREATE DATABASE spirit_animaldb;

USE spirit_animaldb;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userID VARCHAR(45) NOT NULL,
  userImage VARCHAR(255) NOT NULL
);

CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question VARCHAR(255) NOT NULL
);

CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  answer INT NOT NULL
);

INSERT INTO users (userID, userImage)
VALUES ("aimee", "https://www.tanyacasteel.com/wp-content/uploads/2017/04/phoenix-spirit-animal-small.jpeg");
