const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

/**
 * Thoát các ký tự đặc biệt trong chuỗi để tránh lỗi SQL.
 * @param {string} str - Chuỗi cần thoát.
 * @returns {string} - Chuỗi đã được thoát.
 */
function escapeSQLString(str) {
    return str.replace(/'/g, "''");
}

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
            if (data[key] === 'Title') {
                fakeData[key] = faker.lorem.words(3);
            } else if (data[key] === 'Subtitle') {
                fakeData[key] = faker.lorem.sentence();
            } else if (data[key] === 'Description') {
                fakeData[key] = faker.lorem.paragraph();
            } else if (data[key] === 'Language') {
                fakeData[key] = faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Chinese']);
            } else if (data[key] === 'Image') {
                fakeData[key] = faker.image.imageUrl();
            } else if (data[key] === 'Price') {
                fakeData[key] = faker.finance.amount(10, 1000, 2);
            } else if (data[key] === 'Status') {
                fakeData[key] = faker.helpers.arrayElement(['Hide', 'Free', 'Plus']);
            } else if (data[key] === 'CategoryID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 22 });
            } else if (data[key] === 'InstructorID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 1000 });
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL
        const sql = `EXEC ${procedureName} '${fakeData.Title}', '${fakeData.Subtitle}', '${fakeData.Description}', '${fakeData.Language}', '${fakeData.Image}', ${fakeData.Price}, '${fakeData.Status}', ${fakeData.CategoryID}, ${fakeData.InstructorID};`;
        sqlStatements.push(sql);
    }

    return sqlStatements;
}

// Dữ liệu đầu vào
const data = {
    Title: 'Title',
    Subtitle: 'Subtitle',
    Description: 'Description',
    Language: 'Language',
    Image: 'Image',
    Price: 'Price',
    Status: 'Status',
    CategoryID: 'CategoryID',
    InstructorID: 'InstructorID'
};

// Tên procedure
const procedureName = 'create_course';

// Số lượng câu lệnh cần tạo
const count = 5000;

// Tạo các câu lệnh SQL
const sqlStatements = generateSQL(procedureName, data, count);

// In ra các câu lệnh SQL
console.log(sqlStatements);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePath = path.join(dir, 'courseData.sql');
fs.writeFileSync(filePath, sqlStatements.join('\n'), 'utf-8');

console.log(`Fake data generated and saved to ${filePath}`);
