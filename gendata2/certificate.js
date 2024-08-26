const fs = require('fs');
const path = require('path');

// Hàm để tạo các câu lệnh SQL cho việc tạo mới chứng chỉ
function generateCreateCertificateData(numCertificates, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numCertificates; i++) {
        const certificateName = `Certificate${i}`;
        const startDate = `2024-01-01`;  // Thay bằng ngày bắt đầu thực tế
        const endDate = `2025-01-01`;    // Thay bằng ngày kết thúc thực tế
        const instructorID = i;          // Giả sử mỗi giảng viên có một chứng chỉ

        sqlStatements += `EXEC ${procedureName} '${certificateName}', '${startDate}', '${endDate}', ${instructorID};\n`;
    }

    return sqlStatements;
}

// Hàm để tạo các câu lệnh SQL cho việc cập nhật chứng chỉ
function generateUpdateCertificateData(numCertificates, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numCertificates; i++) {
        const certificateID = i;         // Giả sử ID chứng chỉ là từ 1 đến numCertificates
        const certificateName = `UpdatedCertificate${i}`;
        const startDate = `2024-01-01`;  // Thay bằng ngày bắt đầu thực tế
        const endDate = `2025-01-01`;    // Thay bằng ngày kết thúc thực tế

        sqlStatements += `EXEC ${procedureName} ${certificateID}, '${certificateName}', '${startDate}', '${endDate}';\n`;
    }

    return sqlStatements;
}

// Số lượng chứng chỉ cần tạo và cập nhật
const numCertificates = 100; // Số lượng chứng chỉ
const createProcedureName = 'create_certificate'; // Tên thủ tục tạo chứng chỉ
const updateProcedureName = 'update_certificate'; // Tên thủ tục cập nhật chứng chỉ

// Tạo các câu lệnh SQL
const createSQL = generateCreateCertificateData(numCertificates, createProcedureName);
const updateSQL = generateUpdateCertificateData(numCertificates, updateProcedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const createFilePath = path.join(dir, 'generated_create_certificates.sql');
fs.writeFile(createFilePath, createSQL, (err) => {
    if (err) throw err;
    console.log('Tệp generated_create_certificates.sql đã được tạo trong thư mục fakedata!');
});

const updateFilePath = path.join(dir, 'generated_update_certificates.sql');
fs.writeFile(updateFilePath, updateSQL, (err) => {
    if (err) throw err;
    console.log('Tệp generated_update_certificates.sql đã được tạo trong thư mục fakedata!');
});
