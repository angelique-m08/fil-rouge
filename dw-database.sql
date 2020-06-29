DROP DATABASE doctor_who;

CREATE DATABASE doctor_who;

USE doctor_who;

CREATE TABLE actor (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(250),
  `birthdate` YEAR,
  `isTheDoctor` BOOL,
  `nbOfSeason` INT
);

INSERT INTO actor (name, birthdate, isTheDoctor, nbOfSeason)
  VALUES
    ('Matt Smith', 1982, true, 3),
    ('Peter Capaldi', 1958, true, 3),
    ('Karen Gillan', 1987, false, 3),
    ('Jenna Coleman', 1986, false, 3),
    ('Catherine Tate', 1969, false, 1);

