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
            if (data[key] === 'Amount') {
                fakeData[key] = faker.finance.amount(100, 10000, 2);
            } else if (data[key] === 'TransferContent') {
                fakeData[key] = faker.lorem.sentence();
            } else if (data[key] === 'TransferType') {
                fakeData[key] = faker.helpers.arrayElement(['Deposit', 'Withdrawal']);
            } else if (data[key] === 'BankAccountID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 100 }); // Adjust based on your data
            } else if (data[key] === 'NewBalance') {
                fakeData[key] = faker.finance.amount(1000, 20000, 2);
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL cho create_history_banking
        if (procedureName === 'create_history_banking') {
            const sql = `EXEC ${procedureName} ${fakeData.Amount}, '${fakeData.TransferContent}', '${fakeData.TransferType}', ${fakeData.BankAccountID}, ${fakeData.NewBalance};`;
            sqlStatements.push(sql);
        }
    }

    return sqlStatements;
}

// Dữ liệu đầu vào cho create_history_banking
const dataHistoryBanking = {
    Amount: 'Amount',
    TransferContent: 'TransferContent',
    TransferType: 'TransferType',
    BankAccountID: 'BankAccountID',
    NewBalance: 'NewBalance'
};

// Tên procedure
const procedureNameHistoryBanking = 'create_history_banking';

// Số lượng câu lệnh cần tạo
const count = 100;

// Tạo các câu lệnh SQL cho create_history_banking
const sqlStatementsHistoryBanking = generateSQL(procedureNameHistoryBanking, dataHistoryBanking, count);

// In ra các câu lệnh SQL
console.log(sqlStatementsHistoryBanking);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePathHistoryBanking = path.join(dir, 'historyBankingData.sql');
fs.writeFileSync(filePathHistoryBanking, sqlStatementsHistoryBanking.join('\n'), 'utf-8');

console.log(`Fake data for history banking generated and saved to ${filePathHistoryBanking}`);
