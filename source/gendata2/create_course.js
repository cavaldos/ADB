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
function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

// Hàm để chọn giá trị ngẫu nhiên từ một mảng
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Hàm để tạo các câu lệnh SQL
function generateSQL(numCourses, procedureName) {
    const statuses = ['Hide', 'Free', 'Plus'];
    let sqlStatements = '';

    for (let i = 1; i <= numCourses; i++) {
        const title = `Course Title ${i}`;
        const subtitle = `Course Subtitle ${i}`;
        const description = `Description for course ${i}. ${getRandomString(20)}`;
        const language = `Language ${i % 5 + 1}`; // Giả định có 5 ngôn ngữ khác nhau
        const image = `image${i}.jpg`;
        const price = getRandomFloat(10, 500);
        const status = getRandomElement(statuses); // Chọn ngẫu nhiên một trong ba trạng thái
        const categoryID = Math.floor(Math.random() * 100) + 1; // Giả định có 100 danh mục
        const instructorID = Math.floor(Math.random() * 1000) + 1; // Giả định có 1000 giảng viên

        sqlStatements += `EXEC ${procedureName} '${title}', '${subtitle}', '${description}', '${language}', '${image}', ${price}, '${status}', ${categoryID}, ${instructorID};\n`;
    }

    return sqlStatements;
}

// Số lượng khóa học cần tạo
const numCourses = 1000000; // Số lượng khóa học
const procedureName = 'create_course'; // Tên thủ tục

// Tạo các câu lệnh SQL
const sql = generateSQL(numCourses, procedureName);

// Đảm bảo thư mục fakedata tồn tại
const dir = path.join(__dirname, 'fakedata');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Ghi các câu lệnh SQL vào tệp trong thư mục fakedata
const filePath = path.join(dir, 'generated_courses.sql');
fs.writeFile(filePath, sql, (err) => {
    if (err) throw err;
    console.log('Tệp generated_courses.sql đã được tạo trong thư mục fakedata!');
});
