
-- SOCIALNOTES DB SCHEMA

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
userId int(10) unsigned NOT NULL AUTO_INCREMENT,
passwordHash varchar(64) NOT NULL, --holds Sha1?
firstName VARCHAR(40) NOT NULL,
lastName VARCHAR(40),
userName VARCHAR(40),
email VARCHAR(80) UNIQUE NOT NULL,
primary key (userId),
CONSTRAINT validEmail CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

INSERT INTO Users VALUES (1,'Tim','14E4F66C63DEC110B448E011DCB0B57F70EC20C6', 'Tim', 'Chang', 'tsuasian', 'Tchang2017@gmail.com');
INSERT INTO Users VALUES (2,'Dan1','70846DDC6D46C1D278CBE179D44836E13411D5C0', 'Dan', 'Pena', 'theBetterDaniel', 'daniel.r.pena25@gmail.com');
INSERT INTO Users VALUES (3,'Dan2','21232FE000ED42CE8BCE3EE1E22F7A22AF3CA198', 'Dan', 'Kennedy', 'danK', 'dannykennedy@email.com');

DROP TABLE IF EXISTS Sessions;
CREATE TABLE Sessions (
  sessionId int(10) unsigned NOT NULL AUTO_INCREMENT,
  userId int(10) unsigned NOT NULL REFERENCES Users(userId),
  sessionKeyHash varchar(64) NOT NULL,
  lastSessionRenewal datetime NOT NULL,
  PRIMARY KEY (sessionId),
);

DROP TABLE IF EXISTS Notes;
CREATE TABLE Notes (
noteId UUID,
entryText TEXT,
postedBy int(10) references Users(id),
timePosted TIMESTAMPTZ,
timeModified TIMESTAMPTZ,
primary key (noteId)
);

DROP TABLE IF EXISTS Tags;
CREATE TABLE Tags (
  tagId UUID,
  tagType VARCHAR(40),
  name VARCHAR(100),
  addedBy int(10) references Users(userId),  --user who added the tag
  primary key (tagId)
  );

DROP TABLE IF EXISTS Comments;
 CREATE TABLE Comments (
  commentId UUID,
  commentText TEXT,
  postedBy int(10) references Users(userId),  --who posted the comment
  postedOn UUID references Notes(noteId),  --which note it's on
  timePosted TIMESTAMPTZ,
  primary key (commentId)
 );

DROP TABLE IF EXISTS Groups;
CREATE TABLE Groups (
groupId UUID,
lastActive TIMESTAMPTZ,
primary key (groupId)
);

-- Which items have which tags
DROP TABLE IF EXISTS NotesTags;
CREATE TABLE NotesTags (
  itemId UUID references Notes(noteId),
  tagId UUID references Tags(tagId),
  primary key (itemID, tagID)
 );

-- Which users are in which groups
DROP TABLE IF EXISTS UsersGroups;
CREATE TABLE UsersGroups (
  userId int(10) references Users(userId),
  groupId UUID references Groups(groupId),
  primary key (userId, groupId)
);

-- Which notes are shared in which groups
DROP TABLE IF EXISTS NotesGroups;
CREATE TABLE NotesGroups (
  userId int(10) references Users(userId),
  groupId UUID references Groups(groupId),
  timeShared TIMESTAMPTZ,
  primary key (userId, groupId)
);













