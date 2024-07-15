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

// Hàm để tạo số ngẫu nhiên trong khoảng cho trước
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm để tạo các câu lệnh SQL
function generateSQL(numStudents, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numStudents; i++) {
        const userName = `student${i}`;
        const password = getRandomString(10);
        const email = `student${i}@example.com`;
        const fullName = `Full Name ${i}`;
        const phone = `123456789${i}`;
        const address = `Address ${i}`;
        const schoolYear = `Year ${getRandomInt(1, 4)}`; // Giả định có 4 năm học

        sqlStatements += `EXEC ${procedureName} '${userName}', '${password}', '${email}', '${fullName}', '${phone}', '${address}', '${schoolYear}';\n`;
    }

    return sqlStatements;
}

// Số lượng sinh viên cần tạo
const numStudents = 1000; // Số lượng sinh viên
const procedureName = 'create_student'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numStudents, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_students.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_students.sql đã được tạo trong thư mục fakedata!');
});
