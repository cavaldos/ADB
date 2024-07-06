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
            if (data[key] === 'Title') {
                fakeData[key] = faker.lorem.words(3);
            } else if (data[key] === 'Duration') {
                fakeData[key] = faker.datatype.number({ min: 30, max: 180 });
            } else if (data[key] === 'ComplexityLevel') {
                fakeData[key] = faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']);
            } else if (data[key] === 'CourseID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
            } else if (data[key] === 'TopicID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
            } else if (data[key] === 'Content') {
                fakeData[key] = faker.lorem.paragraph();
            } else if (data[key] === 'Page') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
            } else if (data[key] === 'LessonDocumentID') {
                fakeData[key] = i + 1; // Giả sử LessonDocumentID tăng dần từ 1 đến count
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL cho create_lesson_document
        if (procedureName === 'create_lesson_document') {
            const sql = `EXEC ${procedureName} '${fakeData.Title}', ${fakeData.Duration}, '${fakeData.ComplexityLevel}', ${fakeData.CourseID}, ${fakeData.TopicID};`;
            sqlStatements.push(sql);
        }

        // Tạo câu lệnh SQL cho add_page_document
        if (procedureName === 'add_page_document') {
            const sql = `EXEC ${procedureName} ${fakeData.LessonDocumentID}, '${fakeData.Content}', ${fakeData.Page};`;
            sqlStatements.push(sql);
        }
    }

    return sqlStatements;
}

// Dữ liệu đầu vào cho create_lesson_document
const dataLessonDocument = {
    Title: 'Title',
    Duration: 'Duration',
    ComplexityLevel: 'ComplexityLevel',
    CourseID: 'CourseID',
    TopicID: 'TopicID'
};

// Dữ liệu đầu vào cho add_page_document
const dataPageDocument = {
    LessonDocumentID: 'LessonDocumentID',
    Content: 'Content',
    Page: 'Page'
};

// Tên procedures
const procedureNameLessonDocument = 'create_lesson_document';
const procedureNamePageDocument = 'add_page_document';

// Số lượng câu lệnh cần tạo
const count = 100;

// Tạo các câu lệnh SQL cho create_lesson_document
const sqlStatementsLessonDocument = generateSQL(procedureNameLessonDocument, dataLessonDocument, count);

// Tạo các câu lệnh SQL cho add_page_document
const sqlStatementsPageDocument = generateSQL(procedureNamePageDocument, dataPageDocument, count);

// In ra các câu lệnh SQL
console.log(sqlStatementsLessonDocument);
console.log(sqlStatementsPageDocument);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePathLessonDocument = path.join(dir, 'lessonDocumentData.sql');
const filePathPageDocument = path.join(dir, 'pageDocumentData.sql');
fs.writeFileSync(filePathLessonDocument, sqlStatementsLessonDocument.join('\n'), 'utf-8');
fs.writeFileSync(filePathPageDocument, sqlStatementsPageDocument.join('\n'), 'utf-8');

console.log(`Fake data for lesson documents generated and saved to ${filePathLessonDocument}`);
console.log(`Fake data for page documents generated and saved to ${filePathPageDocument}`);
