const fs = require('fs');
const path = require('path');

// Hàm để tạo các câu lệnh SQL
function generateSQL(numCategories, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numCategories; i++) {
        const categoryName = `Category${i}`;
        const categoryDescription = `Description for ${categoryName}`;
        const parentCategoryID = i % 2 === 0 ? i - 1 : null; // Tạo ParentCategoryID cho các danh mục chẵn

        sqlStatements += `EXEC ${procedureName} '${categoryName}', N'${categoryDescription}', ${parentCategoryID};\n`;
    }

    return sqlStatements;
}

// Số lượng danh mục cần tạo
const numCategories = 100; // Số lượng danh mục
const procedureName = 'create_category'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numCategories, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_categories.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_categories.sql đã được tạo trong thư mục fakedata!');
});
