'use strict';
const dbFunctions = require("./db_functions.js");


exports.createGroup = (groupId, callback) => {
    const dateGroupCreated = new Date().toLocaleString();
    const sql = `INSERT INTO Sharegroups (groupId, lastActive) VALUES ('${groupId}', '${dateGroupCreated}')`;
    dbFunctions.modifyDataWithSqlQuery(sql, callback);
};

