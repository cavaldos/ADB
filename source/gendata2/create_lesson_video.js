const fs = require('fs');
const path = require('path');

// Hàm để tạo chuỗi ngẫu nhiên
function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Hàm để tạo số ngẫu nhiên trong khoảng cho trước
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm để chọn giá trị ngẫu nhiên từ một mảng
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Hàm để tạo các câu lệnh SQL
function generateSQL(numLessons, procedureName) {
    const complexityLevels = ['Easy', 'Medium', 'Hard'];
    let sqlStatements = '';

    for (let i = 1; i <= numLessons; i++) {
        const title = `Lesson Title ${i}`;
        const duration = getRandomInt(5, 60); // Giả định thời lượng từ 5 đến 60 phút
        const complexityLevel = getRandomElement(complexityLevels); // Chọn ngẫu nhiên một trong ba mức độ phức tạp
        const courseID = getRandomInt(1111,1112 ); // Giả định có 100 khóa học
        const topicID = getRandomInt(534, 27292); // Giả định có 100 chủ đề
        const url = `http://example.com/video${i}.mp4`; // URL giả định

        sqlStatements += `EXEC ${procedureName} '${title}', ${duration}, '${complexityLevel}', ${courseID}, ${topicID}, '${url}';\n`;
    }

    return sqlStatements;
}

// Số lượng bài học cần tạo
const numLessons = 100; // Số lượng bài học
const procedureName = 'create_lesson_video'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numLessons, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_lesson_videos.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_lesson_videos.sql đã được tạo trong thư mục fakedata!');
});
