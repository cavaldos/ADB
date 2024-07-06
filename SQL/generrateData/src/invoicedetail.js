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
            if (data[key] === 'InvoiceID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 100 }); // Giả định có 10 hóa đơn
            } else if (data[key] === 'DiscountCode') {
                fakeData[key] = faker.lorem.word(); // Tạo mã giảm giá ngẫu nhiên
            } else if (data[key] === 'CourseID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 100 }); // Giả định có 10 khóa học
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL cho add_invoice_detail
        const sql = `EXEC ${procedureName} ${fakeData.InvoiceID}, '${fakeData.DiscountCode}', ${fakeData.CourseID};`;
        sqlStatements.push(sql);
    }

    return sqlStatements;
}

// Dữ liệu đầu vào cho add_invoice_detail
const dataAddInvoiceDetail = {
    InvoiceID: 'InvoiceID',
    DiscountCode: 'DiscountCode',
    CourseID: 'CourseID'
};

// Tên procedure
const procedureNameAddInvoiceDetail = 'add_invoice_detail';

// Số lượng câu lệnh cần tạo
const count = 1000;

// Tạo các câu lệnh SQL cho add_invoice_detail
const sqlStatementsAddInvoiceDetail = generateSQL(procedureNameAddInvoiceDetail, dataAddInvoiceDetail, count);

// In ra các câu lệnh SQL
console.log(sqlStatementsAddInvoiceDetail);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePathAddInvoiceDetail = path.join(dir, 'addInvoiceDetailData.sql');
fs.writeFileSync(filePathAddInvoiceDetail, sqlStatementsAddInvoiceDetail.join('\n'), 'utf-8');

console.log(`Fake data for add invoice detail generated and saved to ${filePathAddInvoiceDetail}`);
