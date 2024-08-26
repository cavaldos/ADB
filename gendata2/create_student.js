const fs = require('fs');
const path = require('path');

// Hàm để tạo các câu lệnh SQL
function generateStudentData(numStudents, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numStudents; i++) {
        const userName = `Student${i}`;
        const password = `Pass${i}`;
        const email = `student${i}@example.com`;
        const fullName = `Student FullName ${i}`;
        const phone = `123456789${i}`;
        const address = `Address ${i}`;

        sqlStatements += `EXEC ${procedureName} '${userName}', '${password}', '${email}', '${fullName}', '${phone}', '${address}';\n`;
    }

    return sqlStatements;
}

// Số lượng Student cần tạo
const numStudents = 1000; // Số lượng student
const procedureName = 'create_student'; // Tên stored procedure

// Tạo các câu lệnh SQL
const sql = generateStudentData(numStudents, procedureName);

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
