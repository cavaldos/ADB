const fs = require('fs');
const path = require('path');

// Hàm để tạo ngày ngẫu nhiên trong khoảng thời gian nhất định
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Hàm để tạo các câu lệnh SQL
function generateSQL(numCertificates, procedureName) {
    let sqlStatements = '';
    const startDate = new Date(2020, 0, 1); // Ngày bắt đầu giả định
    const endDate = new Date(2024, 11, 31); // Ngày kết thúc giả định

    for (let i = 1; i <= numCertificates; i++) {
        const certificateName = `Certificate${i}`;
        const start = getRandomDate(startDate, endDate);
        const end = getRandomDate(start, new Date(start.getFullYear() + 1, start.getMonth(), start.getDate())); // Giả định chứng chỉ có thời hạn tối đa 1 năm
        const instructorID = Math.floor(Math.random() * 1000) + 1; // Giả định có 1000 giảng viên

        sqlStatements += `EXEC ${procedureName} '${certificateName}', '${start.toISOString().slice(0, 19).replace('T', ' ')}', '${end.toISOString().slice(0, 19).replace('T', ' ')}', ${instructorID};\n`;
    }

    return sqlStatements;
}

// Số lượng chứng chỉ cần tạo
const numCertificates = 1000; // Số lượng chứng chỉ
const procedureName = 'create_certificate'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numCertificates, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_certificates.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_certificates.sql đã được tạo trong thư mục fakedata!');
});
