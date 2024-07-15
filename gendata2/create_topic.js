const fs = require('fs');
const path = require('path');

// Hàm để tạo chuỗi ngẫu nhiên
function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Hàm để tạo các câu lệnh SQL
function generateSQL(numTopics, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numTopics; i++) {
        const topicName = `Topic ${getRandomString(10)}`;
        const courseID = Math.floor(Math.random() * 990) + 1001; // courseID nằm trong khoảng từ 1001 đến 1990

        sqlStatements += `EXEC ${procedureName} '${topicName}', ${courseID};\n`;
    }

    return sqlStatements;
}

// Số lượng chủ đề cần tạo
const numTopics = 100000; // Số lượng chủ đề
const procedureName = 'create_topic'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numTopics, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_topics.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_topics.sql đã được tạo trong thư mục fakedata!');
});
