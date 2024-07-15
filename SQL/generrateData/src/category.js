const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

/**
 * Tạo dữ liệu giả và câu lệnh SQL cho procedure tương ứng.
 * @param {string} procedureName - Tên procedure.
 * @param {object} data - Đối tượng dữ liệu với các trường tương ứng.
 * @param {number} count - Số lượng câu lệnh cần tạo.
 * @returns {string[]} - Mảng các câu lệnh SQL.
 */
function generateSQL(procedureName, data, count) {
    const sqlStatements = [];
    const uniqueCategories = new Set();

    for (let i = 0; i < count; i++) {
        let fakeCategoryName, fakeCategoryDescription;

        // Tạo dữ liệu giả từ đối tượng đầu vào sử dụng Faker.js
        do {
            fakeCategoryName = faker.commerce.department().substring(0, 20);
            fakeCategoryDescription = faker.lorem.paragraph().substring(0, 500);
        } while (uniqueCategories.has(fakeCategoryName + fakeCategoryDescription));

        uniqueCategories.add(fakeCategoryName + fakeCategoryDescription);

        const fakeData = {
            CategoryName: fakeCategoryName,
            CategoryDescription: fakeCategoryDescription
        };

        // Tạo câu lệnh SQL
        const sql = `EXEC ${procedureName} '${fakeData.CategoryName}', '${fakeData.CategoryDescription}';`;
        sqlStatements.push(sql);
    }

    return sqlStatements;
}

// Dữ liệu đầu vào
const data = {
    CategoryName: 'CategoryName',
    CategoryDescription: 'CategoryDescription'
};

// Tên procedure
const procedureName = 'create_category';

// Số lượng câu lệnh cần tạo
const count = 10000;

// Tạo các câu lệnh SQL
const sqlStatements = generateSQL(procedureName, data, count);

// In ra các câu lệnh SQL
console.log(sqlStatements);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePath = path.join(dir, 'categoryData.sql');
fs.writeFileSync(filePath, sqlStatements.join('\n'), 'utf-8');

console.log(`Fake data generated and saved to ${filePath}`);
