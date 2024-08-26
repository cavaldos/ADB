const fs = require('fs');
const path = require('path');

// Hàm để tạo một số ngẫu nhiên trong khoảng từ min đến max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm để tạo các câu lệnh SQL cho bảng Company
function generateCompanyData(numCompanies) {
    let sqlStatements = '';

    for (let i = 1; i <= numCompanies; i++) {
        const companyName = `Company${i}`;
        const position = `Position${i}`;
        const instructorID = getRandomInt(1, 1000);  // Random InstructorID từ 1 đến 1000

        sqlStatements += `INSERT INTO [Company] (CompanyName, Position, InstructorID) VALUES ('${companyName}', '${position}', ${instructorID});\n`;
    }

    return sqlStatements;
}

// Số lượng bản ghi cần tạo
const numCompanies = 10000; // Số lượng công ty cần chèn

// Tạo các câu lệnh SQL
const sql = generateCompanyData(numCompanies);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_companies.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_companies.sql đã được tạo trong thư mục fakedata!');
});
