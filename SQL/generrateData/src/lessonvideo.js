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
            if (data[key] === 'TopicName') {
                fakeData[key] = faker.lorem.words(3);
            } else if (data[key] === 'CourseID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
            } else if (data[key] === 'Title') {
                fakeData[key] = faker.lorem.words(3);
            } else if (data[key] === 'Duration') {
                fakeData[key] = faker.datatype.number({ min: 30, max: 180 });
            } else if (data[key] === 'ComplexityLevel') {
                fakeData[key] = faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']);
            } else if (data[key] === 'URL') {
                fakeData[key] = faker.internet.url();
            } else if (data[key] === 'LessonsID') {
                fakeData[key] = faker.datatype.number({ min: 1, max: count });
            }
        }

        // Thoát các chuỗi ký tự để tránh lỗi SQL
        for (const key in fakeData) {
            if (typeof fakeData[key] === 'string') {
                fakeData[key] = escapeSQLString(fakeData[key]);
            }
        }

        // Tạo câu lệnh SQL cho create_topic
        if (procedureName === 'create_topic') {
            const sql = `EXEC ${procedureName} '${fakeData.TopicName}', ${fakeData.CourseID};`;
            sqlStatements.push(sql);
        }

        // Tạo câu lệnh SQL cho create_lesson_video
        if (procedureName === 'create_lesson_video') {
            const sql = `EXEC ${procedureName} '${fakeData.Title}', ${fakeData.Duration}, '${fakeData.ComplexityLevel}', ${fakeData.CourseID}, ${fakeData.LessonsID}, '${fakeData.URL}';`;
            sqlStatements.push(sql);
        }
    }

    return sqlStatements;
}

// Dữ liệu đầu vào cho create_topic
const dataTopic = {
    TopicName: 'TopicName',
    CourseID: 'CourseID'
};

// Tên procedure cho create_topic
const procedureNameTopic = 'create_topic';

// Dữ liệu đầu vào cho create_lesson_video
const dataLessonVideo = {
    Title: 'Title',
    Duration: 'Duration',
    ComplexityLevel: 'ComplexityLevel',
    CourseID: 'CourseID',
    LessonsID: 'LessonsID',
    URL: 'URL'
};

// Tên procedure cho create_lesson_video
const procedureNameLessonVideo = 'create_lesson_video';

// Số lượng câu lệnh cần tạo
const count = 100;

// Tạo các câu lệnh SQL cho create_topic
const sqlStatementsTopic = generateSQL(procedureNameTopic, dataTopic, count);

// Tạo các câu lệnh SQL cho create_lesson_video
const sqlStatementsLessonVideo = generateSQL(procedureNameLessonVideo, dataLessonVideo, count);

// In ra các câu lệnh SQL
console.log(sqlStatementsTopic);
console.log(sqlStatementsLessonVideo);

// Lưu dữ liệu vào file
const dir = './fakedata';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const filePathTopic = path.join(dir, 'topicData.sql');
const filePathLessonVideo = path.join(dir, 'lessonVideoData.sql');
fs.writeFileSync(filePathTopic, sqlStatementsTopic.join('\n'), 'utf-8');
fs.writeFileSync(filePathLessonVideo, sqlStatementsLessonVideo.join('\n'), 'utf-8');

console.log(`Fake data for topics generated and saved to ${filePathTopic}`);
console.log(`Fake data for lesson videos generated and saved to ${filePathLessonVideo}`);
