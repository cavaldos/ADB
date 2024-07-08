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
    const createdCategoryIDs = [];

    for (let i = 0; i < count; i++) {
        // Tạo dữ liệu giả từ đối tượng đầu vào sử dụng Faker.js
        const fakeData = {};
        for (const key in data) {
            if (data[key] === 'CategoryName') {
                fakeData[key] = faker.commerce.department().substring(0, 20);
            } else if (data[key] === 'CategoryDescription') {
                fakeData[key] = faker.lorem.paragraph().substring(0, 500);
            } else if (data[key] === 'ParentCategoryID') {
                if (i < count / 2) {
                    // Cho nửa đầu tiên, ParentCategoryID là NULL hoặc ngẫu nhiên
                    fakeData[key] = faker.datatype.boolean() ? faker.datatype.number({ min: 1, max: 50 }) : 'NULL';
                } else {
                    // Cho nửa sau, ParentCategoryID là một trong các categoryID đã tạo
                    const randomIndex = faker.datatype.number({ min: 0, max: createdCategoryIDs.length - 1 });
                    fakeData[key] = createdCategoryIDs[randomIndex];
                }
            }
        }

        // Giả sử categoryID là tự tăng (auto-increment), nên chúng ta sử dụng chỉ số vòng lặp làm categoryID
        const categoryID = i + 1;
        if (i < count / 2) {
            createdCategoryIDs.push(categoryID);
        }

        // Tạo câu lệnh SQL
        const sql = `EXEC ${procedureName} '${fakeData.CategoryName}', '${fakeData.CategoryDescription}', ${fakeData.ParentCategoryID};`;
        sqlStatements.push(sql);
    }

    return sqlStatements;
}

// Dữ liệu đầu vào
const data = {
    CategoryName: 'CategoryName',
    CategoryDescription: 'CategoryDescription',
    ParentCategoryID: 'ParentCategoryID'
};

// Tên procedure
const procedureName = 'create_category';

// Số lượng câu lệnh cần tạo
const count = 100000;

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
