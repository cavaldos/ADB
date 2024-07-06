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
            if (data[key] === 'AccountNumber') {
                fakeData[key] = faker.finance.account(20);
            } else if (data[key] === 'AccountHolderName') {
                fakeData[key] = faker.person.fullName();
            } else if (data[key] === 'AccountBalance') {
                fakeData[key] = faker.finance.amount(1000, 10000, 2);
            } else if (data[key] === 'BankName') {
                fakeData[key] = faker.company.name();
            } else if (data[key] === 'UserID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL cho create_bank_account
        if (procedureName === 'create_bank_account') {
            const sql = `EXEC ${procedureName} '${fakeData.AccountNumber}', '${fakeData.AccountHolderName}', ${fakeData.AccountBalance}, '${fakeData.BankName}', ${fakeData.UserID};`;
            sqlStatements.push(sql);
        }
    }

    return sqlStatements;
}

// Dữ liệu đầu vào cho create_bank_account
const dataBankAccount = {
    AccountNumber: 'AccountNumber',
    AccountHolderName: 'AccountHolderName',
    AccountBalance: 'AccountBalance',
    BankName: 'BankName',
    UserID: 'UserID'
};

// Tên procedure
const procedureNameBankAccount = 'create_bank_account';

// Số lượng câu lệnh cần tạo
const count = 100;

// Tạo các câu lệnh SQL cho create_bank_account
const sqlStatementsBankAccount = generateSQL(procedureNameBankAccount, dataBankAccount, count);

// In ra các câu lệnh SQL
console.log(sqlStatementsBankAccount);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePathBankAccount = path.join(dir, 'bankAccountData.sql');
fs.writeFileSync(filePathBankAccount, sqlStatementsBankAccount.join('\n'), 'utf-8');

console.log(`Fake data for bank account generated and saved to ${filePathBankAccount}`);
