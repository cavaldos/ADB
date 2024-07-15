const fs = require('fs');
const path = require('path');

// Hàm để tạo chuỗi ngẫu nhiên
function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Hàm để tạo các câu lệnh SQL
function generateSQL(numRecords, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numRecords; i++) {
        const level = getRandomString(6);
        const major = getRandomString(10);
        const schoolName = `School ${i}`;
        const userID = Math.floor(Math.random() * 1000) + 1; // Giả định có 1000000 người dùng

        sqlStatements += `EXEC ${procedureName} '${level}', '${major}', '${schoolName}', ${userID};\n`;
    }

    return sqlStatements;
}

// Số lượng bản ghi cần tạo
const numRecords = 1000; // Số lượng bản ghi
const procedureName = 'create_education'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numRecords, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_education.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_education.sql đã được tạo trong thư mục fakedata!');
});
