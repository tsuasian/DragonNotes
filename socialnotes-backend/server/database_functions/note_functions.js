'use strict';

const uuidv4 = require('uuid/v4');
const dbFunctions = require("./db_functions.js");

exports.getNotesInGroup = (groupId, callback) => {

    const sql = "select * from Notes join NotesGroups on Notes.noteId LIKE NotesGroups.noteId where NotesGroups.groupId LIKE \'" + groupId + "\'";
    dbFunctions.makeSqlQuery(sql, callback);
};

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