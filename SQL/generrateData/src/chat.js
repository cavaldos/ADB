const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

/**
 * Thoát các ký tự đặc biệt trong chuỗi để tránh lỗi SQL.
 * @param {string} str - Chuỗi cần thoát.
 * @returns {string} - Chuỗi đã được thoát.
 */
function escapeSQLString(str) {
    return str.replace(/'/g, "''");
}

/**
 * Tạo dữ liệu giả và câu lệnh SQL cho procedures tương ứng.
 * @param {string} procedureName - Tên procedure.
 * @param {object} data - Đối tượng dữ liệu với các trường tương ứng.
 * @param {number} count - Số lượng câu lệnh cần tạo.
 * @returns {string[]} - Mảng các câu lệnh SQL.
 */
function generateSQL(procedureName, data, count) {
    const sqlStatements = [];

    for (let i = 0; i < count; i++) {
        // Tạo dữ liệu giả từ đối tượng đầu vào sử dụng Faker.js
        const fakeData = {};
        for (const key in data) {
            if (data[key] === 'ChatContent' || data[key] === 'MessageContent') {
                fakeData[key] = faker.lorem.sentence();
            } else if (data[key] === 'SendChatID' || data[key] === 'ReceiveChatID' || data[key] === 'CourseID' || data[key] === 'UserID' || data[key] === 'DiscussionForumID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL cho create_chat
        if (procedureName === 'create_chat') {
            const sql = `EXEC ${procedureName} '${fakeData.ChatContent}', ${fakeData.SendChatID}, ${fakeData.ReceiveChatID};`;
            sqlStatements.push(sql);
        }

        // Tạo câu lệnh SQL cho create_discussion_forum
        if (procedureName === 'create_discussion_forum') {
            const sql = `EXEC ${procedureName} ${fakeData.CourseID};`;
            sqlStatements.push(sql);
        }

        // Tạo câu lệnh SQL cho create_message_forum
        if (procedureName === 'create_message_forum') {
            const sql = `EXEC ${procedureName} '${fakeData.MessageContent}', ${fakeData.UserID}, ${fakeData.DiscussionForumID};`;
            sqlStatements.push(sql);
        }
    }

    return sqlStatements;
}

// Dữ liệu đầu vào cho create_chat
const dataChat = {
    ChatContent: 'ChatContent',
    SendChatID: 'SendChatID',
    ReceiveChatID: 'ReceiveChatID'
};

// Dữ liệu đầu vào cho create_discussion_forum
const dataForum = {
    CourseID: 'CourseID'
};

// Dữ liệu đầu vào cho create_message_forum
const dataMessageForum = {
    MessageContent: 'MessageContent',
    UserID: 'UserID',
    DiscussionForumID: 'DiscussionForumID'
};

// Tên procedures
const procedureNameChat = 'create_chat';
const procedureNameForum = 'create_discussion_forum';
const procedureNameMessageForum = 'create_message_forum';

// Số lượng câu lệnh cần tạo
const count = 100;

// Tạo các câu lệnh SQL cho create_chat
const sqlStatementsChat = generateSQL(procedureNameChat, dataChat, count);

// Tạo các câu lệnh SQL cho create_discussion_forum
const sqlStatementsForum = generateSQL(procedureNameForum, dataForum, count);

// Tạo các câu lệnh SQL cho create_message_forum
const sqlStatementsMessageForum = generateSQL(procedureNameMessageForum, dataMessageForum, count);

// In ra các câu lệnh SQL
console.log(sqlStatementsChat);
console.log(sqlStatementsForum);
console.log(sqlStatementsMessageForum);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePathChat = path.join(dir, 'chatData.sql');
const filePathForum = path.join(dir, 'forumData.sql');
const filePathMessageForum = path.join(dir, 'messageForumData.sql');
fs.writeFileSync(filePathChat, sqlStatementsChat.join('\n'), 'utf-8');
fs.writeFileSync(filePathForum, sqlStatementsForum.join('\n'), 'utf-8');
fs.writeFileSync(filePathMessageForum, sqlStatementsMessageForum.join('\n'), 'utf-8');

console.log(`Fake data for chat generated and saved to ${filePathChat}`);
console.log(`Fake data for discussion forum generated and saved to ${filePathForum}`);
console.log(`Fake data for message forum generated and saved to ${filePathMessageForum}`);
