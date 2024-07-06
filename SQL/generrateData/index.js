const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Số lượng bản ghi giả cần tạo
const numberOfRecords = 100000;

// Tạo thư mục fakedata nếu nó chưa tồn tại
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Tạo một số danh mục cha trước
const parentCategories = [];
for (let i = 0; i < numberOfRecords / 10; i++) {
    const name = faker.commerce.department().substring(0, 20);
    const categoryDescription = faker.lorem.paragraph().substring(0, 500);
    const sql = `EXEC create_category '${name}', '${categoryDescription}', NULL;`;
    parentCategories.push(sql);
}

// Tạo các danh mục con với ParentCategoryID trỏ đến các danh mục cha đã được tạo
const fakeData = [...parentCategories];
for (let i = parentCategories.length; i < numberOfRecords; i++) {
    const name = faker.commerce.department().substring(0, 20);
    const categoryDescription = faker.lorem.paragraph().substring(0, 500);
    const parentCategoryID = Math.ceil(Math.random() * (parentCategories.length));
    const sql = `EXEC create_category '${name}', '${categoryDescription}', ${parentCategoryID};`;
    fakeData.push(sql);
}

// Lưu dữ liệu vào file
const filePath = path.join(dir, 'categoryData.sql');
fs.writeFileSync(filePath, fakeData.join('\n'), 'utf-8');

console.log(`Fake data generated and saved to ${filePath}`);
