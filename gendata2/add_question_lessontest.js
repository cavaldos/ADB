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

// Hàm để chọn giá trị ngẫu nhiên từ một mảng
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Hàm để tạo các câu lệnh SQL
function generateSQL(numQuestions, procedureName) {
    let sqlStatements = '';

    for (let i = 1; i <= numQuestions; i++) {
        const questionContent = `Question content ${getRandomString(10)}`;
        const title = `Question Title ${i}`;
        const lessonTestID = Math.floor(Math.random() * 50) + 1; // Giả định có 1000 bài kiểm tra
        const answer1 = `Answer 1 for question ${i}`;
        const answer2 = `Answer 2 for question ${i}`;
        const answer3 = `Answer 3 for question ${i}`;
        const correctAnswer = getRandomElement([answer1, answer2, answer3]); // Chọn ngẫu nhiên một câu trả lời đúng

        sqlStatements += `EXEC ${procedureName} N'${questionContent}', N'${title}', ${lessonTestID}, N'${answer1}', N'${answer2}', N'${answer3}', N'${correctAnswer}';\n`;
    }

    return sqlStatements;
}

// Số lượng câu hỏi cần tạo
const numQuestions = 1000; // Số lượng câu hỏi
const procedureName = 'add_question_lessontest'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numQuestions, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_questions.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_questions.sql đã được tạo trong thư mục fakedata!');
});
