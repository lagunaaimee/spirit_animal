DROP DATABASE IF EXISTS spirit_animaldb;
CREATE DATABASE spirit_animaldb;

USE spirit_animaldb;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userID VARCHAR(50) NOT NULL,
  userEmail VARCHAR(50) NOT NULL,
  userImage VARCHAR(255) NOT NULL
);

CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question VARCHAR(255) NOT NULL
);

CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userID INT NOT NULL,
  questionID INT NOT NULL,
  answer VARCHAR(50) NOT NULL
);

INSERT INTO questions (question)
VALUES ("If you could be any animal, what would you be?"); 

INSERT INTO questions (question)
VALUES ("What's your favorite smell?");

INSERT INTO questions (question)
VALUES ("What's your go-to cheat meal?");

INSERT INTO questions (question)
VALUES ("What animal do you fear the most?");

INSERT INTO questions (question)
VALUES ("If you were in a horror film, what weapon would you use to defend yourself?");
