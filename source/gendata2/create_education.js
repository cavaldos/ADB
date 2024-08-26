const fs = require('fs');
const path = require('path');

// Hàm để tạo các câu lệnh SQL cho bảng Education
function generateEducationData(numRecords) {
    let sqlStatements = '';

    for (let i = 1; i <= numRecords; i++) {
        const level = `Level${i}`;
        const major = `Major${i}`;
        const schoolName = `School${i}`;
        const userID = Math.floor(Math.random() * 1000) + 1;  // Random UserID từ 1 đến 1000

        sqlStatements += `EXEC create_education '${level}', '${major}', '${schoolName}', ${userID};\n`;
    }

    return sqlStatements;
}

// Số lượng bản ghi cần tạo
const numRecords = 10000; // Số lượng bản ghi giáo dục cần chèn

// Tạo các câu lệnh SQL
const sql = generateEducationData(numRecords);

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
