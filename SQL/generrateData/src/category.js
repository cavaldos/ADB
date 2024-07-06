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

    for (let i = 0; i < count; i++) {
        // Tạo dữ liệu giả từ đối tượng đầu vào sử dụng Faker.js
        const fakeData = {};
        for (const key in data) {
            if (data[key] === 'name') {
                fakeData[key] = faker.commerce.department().substring(0, 20);
            } else if (data[key] === 'categoryDescription') {
                fakeData[key] = faker.lorem.paragraph().substring(0, 500);
            } else if (data[key] === 'parentCategoryID') {
                fakeData[key] = faker.datatype.boolean() ? faker.datatype.number({ min: 1, max: 50 }) : 'NULL';
            }
        }

        // Tạo câu lệnh SQL
        const sql = `EXEC ${procedureName} '${fakeData.CategoryName}', '${fakeData.CategoryDescription}', ${fakeData.ParentCategoryID};`;
        sqlStatements.push(sql);
    }

    return sqlStatements;
}

// Dữ liệu đầu vào
const data = {
    CategoryName: 'name',
    CategoryDescription: 'categoryDescription',
    ParentCategoryID: 'parentCategoryID'
};

// Tên procedure
const procedureName = 'create_category';

// Số lượng câu lệnh cần tạo
const count = 100;

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
