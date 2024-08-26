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
function generateSQL(numInstructors, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numInstructors; i++) {
        const userName = `user${i}`;
        const password = getRandomString(10);
        const email = `user${i}@example.com`;
        const fullName = `Full Name ${i}`;
        const phone = `123456789${i}`;
        const address = `Address ${i}`;
        const level = 'Beginner'; // Mức độ mặc định
        const status = 'Pending'; // Trạng thái mặc định

        sqlStatements += `EXEC ${procedureName} '${userName}', '${password}', '${email}', '${fullName}', '${phone}', '${address}', '${level}', '${status}';\n`;
    }

    return sqlStatements;
}

// Số lượng giảng viên cần tạo
const numInstructors = 1000; // Số lượng giảng viên
const procedureName = 'create_instructor'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numInstructors, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_instructors.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_instructors.sql đã được tạo trong thư mục fakedata!');
});
