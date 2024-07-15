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
            if (data[key] === 'UserName') {
                fakeData[key] = faker.internet.userName();
            } else if (data[key] === 'Password') {
                fakeData[key] = faker.internet.password();
            } else if (data[key] === 'Email') {
                fakeData[key] = faker.internet.email();
            } else if (data[key] === 'FullName') {
                fakeData[key] = faker.internet.userName();
            } else if (data[key] === 'Phone') {
                fakeData[key] = faker.internet.password();
            } else if (data[key] === 'Address') {
                fakeData[key] = faker.internet.domainName();
            }
        }

        // Tạo câu lệnh SQL
        const sql = `EXEC ${procedureName} '${fakeData.UserName}', '${fakeData.Password}', '${fakeData.Email}', '${fakeData.FullName}', '${fakeData.Phone}', '${fakeData.Address}';`;
        sqlStatements.push(sql);
    }

    return sqlStatements;
}

// Dữ liệu đầu vào
const data = {
    UserName: 'UserName',
    Password: 'Password',
    Email: 'Email',
    FullName: 'FullName',
    Phone: 'Phone',
    Address: 'Address'
};

// Tên procedure
const procedureName = 'create_admin';

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
const filePath = path.join(dir, 'adminData.sql');
fs.writeFileSync(filePath, sqlStatements.join('\n'), 'utf-8');

console.log(`Fake data generated and saved to ${filePath}`);