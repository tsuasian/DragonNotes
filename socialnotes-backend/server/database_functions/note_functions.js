'use strict';

const uuidv4 = require('uuid/v4');
const dbFunctions = require("./db_functions.js");

// CREATE TABLE Notes (
//     noteId varchar(36),
//     entryText TEXT,
//     postedBy int(10) references Users(id),
//     timePosted DATETIME,
//     timeModified DATETIME,
//     primary key (noteId)
// );

// Get all notes in a given group
exports.getNotesInGroup = (groupId, callback) => {

    const sql = "select * from Notes join NotesGroups on Notes.noteId LIKE NotesGroups.noteId where NotesGroups.groupId LIKE \'" + groupId + "\'";
    dbFunctions.makeSqlQuery(sql, callback);
};

exports.getNotesByUser = (userId, callback) => {
    const sql = `SELECT * FROM Notes WHERE postedBy = ${userId}`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Add a new note
exports.addNote = (userId, noteText, callback) => {

    const noteId = uuidv4();
    const datetime = new Date().toLocaleString();
    const sql = `INSERT INTO Notes VALUES ('${noteId}', '${noteText}', ${userId}, '${datetime}','${datetime}')`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Share note in group
exports.shareNoteInGroup = (noteId, groupId, callback) => {

    const timeShared = new Date().toLocaleString();
    const sql = `INSERT INTO NotesGroups VALUES ('${noteId}', '${groupId}', '${timeShared}');`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Edit a note
exports.editNote = (noteId, newText, callback) => {
    // timeModified will auto-update in DB
    let sql = `UPDATE Notes SET entryText = '${newText}' WHERE noteId LIKE '${noteId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};

