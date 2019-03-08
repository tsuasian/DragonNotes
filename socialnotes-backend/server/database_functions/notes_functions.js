'use strict';
const db = require('../db.js');

// Example functions
exports.getNotesByUser = (userId, callback) => {

    const sql = "SELECT * FROM Notes WHERE postedBy=?";
    // get a connection from the pool
    db.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, [userId], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.getNotesInGroup = (groupId, callback) => {

    const sql = "select * from Notes join NotesGroups on Notes.noteId LIKE NotesGroups.noteId where NotesGroups.groupId LIKE \'" + groupId + "\'";

    // get a connection from the pool
    db.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};