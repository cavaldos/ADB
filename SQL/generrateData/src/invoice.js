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
 * Tạo dữ liệu giả và câu lệnh SQL cho procedures tương ứng.
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
            if (data[key] === 'StudentID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 299 }); // Giả định có 10 sinh viên
            } else if (data[key] === 'TransferID') { // null
                fakeData[key] =  null;
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL cho create_invoice
        if (procedureName === 'create_invoice') {
            const sql = `EXEC ${procedureName} ${fakeData.StudentID}, ${fakeData.TransferID};`;
            sqlStatements.push(sql);
        }
    }

    return sqlStatements;
}

// Dữ liệu đầu vào cho create_invoice
const dataCreateInvoice = {
    StudentID: 'StudentID',
    TransferID: 'TransferID'
};

// Tên procedure
const procedureNameCreateInvoice = 'create_invoice';

// Số lượng câu lệnh cần tạo
const count = 100;

// Tạo các câu lệnh SQL cho create_invoice
const sqlStatementsCreateInvoice = generateSQL(procedureNameCreateInvoice, dataCreateInvoice, count);

// In ra các câu lệnh SQL
console.log(sqlStatementsCreateInvoice);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePathCreateInvoice = path.join(dir, 'createInvoiceData.sql');
fs.writeFileSync(filePathCreateInvoice, sqlStatementsCreateInvoice.join('\n'), 'utf-8');

console.log(`Fake data for create invoice generated and saved to ${filePathCreateInvoice}`);
