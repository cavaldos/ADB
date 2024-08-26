const fs = require('fs');
const path = require('path');

// Hàm để tạo các câu lệnh SQL cho bài học video
function generateLessonVideoData(numLessons) {
    let sqlStatements = '';

    for (let i = 1; i <= numLessons; i++) {
        const title = `VideoLesson${i}`;
        const duration = Math.floor(Math.random() * 100) + 1; // Random duration từ 1 đến 100
        const complexityLevel = i % 3 === 0 ? 'Hard' : (i % 2 === 0 ? 'Medium' : 'Easy'); // Luân phiên giữa các mức độ khó
        const courseID = Math.floor(Math.random() * 1000) + 1001; // Random CourseID từ 1001 đến 2000
        const topic = `Topic${i}`;
        const orderLesson = i;
        const url = `http://example.com/video${i}.mp4`;

        sqlStatements += `EXEC create_lesson_video '${title}', ${duration}, '${complexityLevel}', ${courseID}, '${topic}', ${orderLesson}, '${url}';\n`;
    }

    return sqlStatements;
}

// Hàm để tạo các câu lệnh SQL cho bài học tài liệu
function generateLessonDocumentData(numLessons) {
    let sqlStatements = '';

    for (let i = 1; i <= numLessons; i++) {
        const title = `DocumentLesson${i}`;
        const duration = Math.floor(Math.random() * 100) + 1; // Random duration từ 1 đến 100
        const complexityLevel = i % 3 === 0 ? 'Hard' : (i % 2 === 0 ? 'Medium' : 'Easy'); // Luân phiên giữa các mức độ khó
        const courseID = Math.floor(Math.random() * 1000) + 1001; // Random CourseID từ 1001 đến 2000
        const topic = `Topic${i}`;
        const orderLesson = i;

        sqlStatements += `EXEC create_lesson_document '${title}', ${duration}, '${complexityLevel}', ${courseID}, '${topic}', ${orderLesson};\n`;
    }

    return sqlStatements;
}

// Hàm để tạo các câu lệnh SQL cho bài học kiểm tra
function generateLessonTestData(numLessons) {
    let sqlStatements = '';

    for (let i = 1; i <= numLessons; i++) {
        const title = `TestLesson${i}`;
        const duration = Math.floor(Math.random() * 100) + 1; // Random duration từ 1 đến 100
        const complexityLevel = i % 3 === 0 ? 'Hard' : (i % 2 === 0 ? 'Medium' : 'Easy'); // Luân phiên giữa các mức độ khó
        const courseID = Math.floor(Math.random() * 1000) + 1001; // Random CourseID từ 1001 đến 2000
        const topic = `Topic${i}`;
        const orderLesson = i;

        sqlStatements += `EXEC create_lesson_test '${title}', ${duration}, '${complexityLevel}', ${courseID}, '${topic}', ${orderLesson};\n`;
    }

    return sqlStatements;
}

// Số lượng bài học cần tạo
const numLessons = 100000; // Số lượng bài học cần tạo cho mỗi loại

// Tạo các câu lệnh SQL
const videoSQL = generateLessonVideoData(numLessons);
const documentSQL = generateLessonDocumentData(numLessons);
const testSQL = generateLessonTestData(numLessons);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const videoFilePath = path.join(dir, 'generated_video_lessons.sql');
fs.writeFile(videoFilePath, videoSQL, (err) => {
    if (err) throw err;
    console.log('Tệp generated_video_lessons.sql đã được tạo trong thư mục fakedata!');
});

const documentFilePath = path.join(dir, 'generated_document_lessons.sql');
fs.writeFile(documentFilePath, documentSQL, (err) => {
    if (err) throw err;
    console.log('Tệp generated_document_lessons.sql đã được tạo trong thư mục fakedata!');
});

const testFilePath = path.join(dir, 'generated_test_lessons.sql');
fs.writeFile(testFilePath, testSQL, (err) => {
    if (err) throw err;
    console.log('Tệp generated_test_lessons.sql đã được tạo trong thư mục fakedata!');
});
