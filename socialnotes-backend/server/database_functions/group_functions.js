'use strict';
const dbFunctions = require("./db_functions.js");

// CREATE TABLE Sharegroups (
//     groupId varchar(36),
//     groupName varchar(50),
//     lastActive DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     primary key (groupId)
// );

// Create a new group
exports.createGroup = (groupId, callback) => {
    //lastActive will be auto-updated
    const sql = `INSERT INTO Sharegroups (groupId) VALUES ('${groupId}')`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Add a user to an existing group
exports.addUserToGroup = (userId, groupId, callback) => {
    const sql = `INSERT INTO UsersGroups VALUES (${userId}, '${groupId}');`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Change group name
exports.modifyGroupName = (groupName, groupId, callback) => {
    const sql = `UPDATE Sharegroups SET groupName = '${groupName}' WHERE groupId LIKE '${groupId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Get all the groups that a given user is a member of
exports.getGroupsByUser = (userId, callback) => {
	//Select DISTINCT groupName FROM Sharegroups JOIN UsersGroups WHERE  userId = '1' ORDER BY Sharegroups.lastActive DESC;
	// const sql = `Select DISTINCT groupName, Sharegroups.groupId FROM Sharegroups JOIN UsersGroups WHERE UsersGroups.userId = '${userId}';`;
    const sql = `select UsersGroups.groupId, Sharegroups.groupName from UsersGroups JOIN Sharegroups on UsersGroups.groupId = Sharegroups.groupId WHERE userId = '${userId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};




