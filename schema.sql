
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

DROP TABLE IF EXISTS Groups;
CREATE TABLE Groups (
groupId varchar(36),
lastActive DATETIME,
primary key (groupId)
);

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
  groupId varchar(36) references Groups(groupId),
  primary key (userId, groupId)
);

-- Which notes are shared in which groups
DROP TABLE IF EXISTS NotesGroups;
CREATE TABLE NotesGroups (
  userId int(10) references Users(userId),
  groupId varchar(36) references Groups(groupId),
  timeShared DATETIME,
  primary key (userId, groupId)
);













