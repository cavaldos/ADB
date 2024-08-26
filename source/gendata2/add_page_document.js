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
function generateSQL(numPages, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numPages; i++) {
        const lessonDocumentID = Math.floor(Math.random() * 100) + 1; // Giả định có 1000 tài liệu bài học
        const content = `Page content ${getRandomString(20)}`;
        const page = Math.floor(Math.random() * 100) + 1; // Giả định mỗi tài liệu có tối đa 100 trang

        sqlStatements += `EXEC ${procedureName} ${lessonDocumentID}, N'${content}', ${page};\n`;
    }

    return sqlStatements;
}

// Số lượng trang cần tạo
const numPages = 1000; // Số lượng trang
const procedureName = 'add_page_document'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numPages, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_page_documents.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_page_documents.sql đã được tạo trong thư mục fakedata!');
});
