
-- SOCIALNOTES DB SCHEMA

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
userId int(10) unsigned NOT NULL AUTO_INCREMENT,
passwordHash varchar(64) NOT NULL,
firstName VARCHAR(40) NOT NULL,
lastName VARCHAR(40),
userName VARCHAR(40),
email VARCHAR(80) UNIQUE NOT NULL,
primary key (userId)
);

INSERT INTO Users VALUES (1,'14E4F66C63DEC110B448E011DCB0B57F70EC20C6', 'Tim', 'Chang', 'tsuasian', 'Tchang2017@gmail.com');
INSERT INTO Users VALUES (2, '70846DDC6D46C1D278CBE179D44836E13411D5C0', 'Dan', 'Pena', 'theBetterDaniel', 'daniel.r.pena25@gmail.com');
INSERT INTO Users VALUES (3, '21232FE000ED42CE8BCE3EE1E22F7A22AF3CA198', 'Dan', 'Kennedy', 'danK', 'dannykennedy@email.com');
INSERT INTO Users VALUES (4, '21232FE000ED42CE8BCE3EE1E22F7A22AF3CA198', 'Dan', 'Kennedy', 'danAtDrexel', 'dk879@drexel.edu');

DROP TABLE IF EXISTS Sessions;
CREATE TABLE Sessions (
  sessionId int(10) unsigned NOT NULL AUTO_INCREMENT,
  userId int(10) unsigned NOT NULL REFERENCES Users(userId),
  sessionKeyHash varchar(64) NOT NULL,
  lastSessionRenewal datetime NOT NULL,
  PRIMARY KEY (sessionId)
);

DROP TABLE IF EXISTS Notes;
CREATE TABLE Notes (
noteId varchar(36),
entryText TEXT,
postedBy int(10) references Users(id),
timePosted DATETIME,
timeModified DATETIME,
primary key (noteId)
);

INSERT INTO Notes VALUES ('633fa848-bb51-4a81-903a-8b531a4847ce', 'My name is Tim', 1, '2019-02-23 14:11:09', '2019-02-23 14:11:09');
INSERT INTO Notes VALUES ('6dccd43f-856e-452d-b508-e43b199fb931', 'My name is DanP', 2, '2019-02-23 14:11:09', '2019-02-23 14:11:09');
INSERT INTO Notes VALUES ('d9d0938c-6ded-49ce-83fa-764e9dc97293', 'My name is DanK', 3, '2019-02-23 14:11:09', '2019-02-23 14:11:09');

--varchar(36) is a UUID
DROP TABLE IF EXISTS Tags;
CREATE TABLE Tags (
  tagId varchar(36),
  tagType VARCHAR(40),
  name VARCHAR(100),
  addedBy int(10) references Users(userId),
  primary key (tagId)
  );

DROP TABLE IF EXISTS Comments;
 CREATE TABLE Comments (
  commentId varchar(36),
  commentText TEXT,
  postedBy int(10) references Users(userId),
  postedOn varchar(36) references Notes(noteId),
  timePosted DATETIME,
  primary key (commentId)
 );

DROP TABLE IF EXISTS Sharegroups;
CREATE TABLE Sharegroups (
groupId varchar(36),
groupName varchar(50),
lastActive DATETIME,
primary key (groupId)
);

INSERT INTO Sharegroups VALUES ('94a7f8ce-6fc2-4be1-8fed-dafa6c41cb28', 'CS275', '2019-02-23 14:11:09');

-- Which items have which tags
DROP TABLE IF EXISTS NotesTags;
CREATE TABLE NotesTags (
  itemId varchar(36) references Notes(noteId),
  tagId varchar(36) references Tags(tagId),
  primary key (itemID, tagID)
 );

-- Which users are in which groups
DROP TABLE IF EXISTS UsersGroups;
CREATE TABLE UsersGroups (
  userId int(10) references Users(userId),
  groupId varchar(36) references Sharegroups(groupId),
  primary key (userId, groupId)
);

INSERT INTO UsersGroups VALUES (1, '94a7f8ce-6fc2-4be1-8fed-dafa6c41cb28');
INSERT INTO UsersGroups VALUES (2, '94a7f8ce-6fc2-4be1-8fed-dafa6c41cb28');
INSERT INTO UsersGroups VALUES (3, '94a7f8ce-6fc2-4be1-8fed-dafa6c41cb28');

-- Which notes are shared in which groups
DROP TABLE IF EXISTS NotesGroups;
CREATE TABLE NotesGroups (
  noteId varchar(36) references Notes(noteId),
  groupId varchar(36) references Sharegroups(groupId),
  timeShared DATETIME,
  primary key (noteId, groupId)
);

INSERT INTO NotesGroups VALUES ('633fa848-bb51-4a81-903a-8b531a4847ce', '94a7f8ce-6fc2-4be1-8fed-dafa6c41cb28', '2019-02-23 14:11:09');
INSERT INTO NotesGroups VALUES ('6dccd43f-856e-452d-b508-e43b199fb931', '94a7f8ce-6fc2-4be1-8fed-dafa6c41cb28', '2019-02-23 14:12:09');
INSERT INTO NotesGroups VALUES ('d9d0938c-6ded-49ce-83fa-764e9dc97293', '94a7f8ce-6fc2-4be1-8fed-dafa6c41cb28', '2019-02-23 14:13:09');







