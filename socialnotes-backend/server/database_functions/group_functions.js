'use strict';
const dbFunctions = require("./db_functions.js");

// Create a new group
exports.createGroup = (groupId, callback) => {
    const dateGroupCreated = new Date().toLocaleString();
    const sql = `INSERT INTO Sharegroups (groupId, lastActive) VALUES ('${groupId}', '${dateGroupCreated}')`;
    dbFunctions.modifyDataWithSqlQuery(sql, callback);
};

// Add a user to an existing group
exports.addUserToGroup = (userId, groupId, callback) => {
    const sql = `INSERT INTO UsersGroups VALUES (${userId}, '${groupId}');`;
    dbFunctions.modifyDataWithSqlQuery(sql, callback);
};




