const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

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
      if (data[key] === "Title") {
        fakeData[key] = faker.lorem.words(3);
      } else if (data[key] === "Duration") {
        fakeData[key] = faker.datatype.number({ min: 30, max: 180 });
      } else if (data[key] === "ComplexityLevel") {
        fakeData[key] = faker.helpers.arrayElement(["Easy", "Medium", "Hard"]);
      } else if (data[key] === "CourseID") {
        fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
      } else if (data[key] === "TopicID") {
        fakeData[key] = faker.datatype.number({ min: 1, max: 10 });
      } else if (data[key] === "QuestionContent") {
        fakeData[key] = faker.lorem.sentence();
      } else if (data[key] === "AnswerText") {
        fakeData[key] = faker.lorem.words(2);
      }
    }

    // Thoát các chuỗi ký tự để tránh lỗi SQL
    for (const key in fakeData) {
      if (typeof fakeData[key] === "string") {
        fakeData[key] = escapeSQLString(fakeData[key]);
      }
    }

    // Tạo câu lệnh SQL cho create_lesson_test
    if (procedureName === "create_lesson_test") {
      const sql = `EXEC ${procedureName} '${fakeData.Title}', ${fakeData.Duration}, '${fakeData.ComplexityLevel}', ${fakeData.CourseID}, ${fakeData.TopicID};`;
      sqlStatements.push(sql);
    }

    // Tạo câu lệnh SQL cho create_question
    if (procedureName === "create_question") {
      const lessonTestID = i + 1; // Giả sử LessonTestID tăng dần từ 1 đến count
      const sql = `EXEC ${procedureName} '${fakeData.QuestionContent}', '${fakeData.Title}', ${lessonTestID}, '${fakeData.AnswerText}', '${fakeData.AnswerText}', '${fakeData.AnswerText}', '${fakeData.AnswerText}';`;
      sqlStatements.push(sql);
    }
  }
  sdf;
  return sqlStatements;
}

// Dữ liệu đầu vào cho create_lesson_test
const dataLessonTest = {
  Title: "Title",
  Duration: "Duration",
  ComplexityLevel: "ComplexityLevel",
  CourseID: "CourseID",
  TopicID: "TopicID",
};

// Dữ liệu đầu vào cho create_question
const dataQuestion = {
  QuestionContent: "QuestionContent",
  Title: "Title",
  AnswerText: "AnswerText",
};

// Tên procedures
const procedureNameLessonTest = "create_lesson_test";
const procedureNameQuestion = "create_question";

// Số lượng câu lệnh cần tạo
const count = 100;

// Tạo dữ liệu mẫu cho bảng Course
const courseData = [];
for (let i = 1; i <= 10; i++) {
  courseData.push(
    `INSERT INTO [Course] (Title, Subtitle, Description, Language, Image, Price, Status, CreateTime, CategoryID, InstructorID) VALUES ('Course Title ${i}', 'Subtitle ${i}', 'Description ${i}', 'EN', 'image${i}.jpg', ${faker.datatype.number({ min: 10, max: 100 })}, 'Free', GETDATE(), ${faker.datatype.number({ min: 1, max: 10 })}, ${faker.datatype.number({ min: 1, max: 10 })});`,
  );
}

// Tạo các câu lệnh SQL cho create_lesson_test
const sqlStatementsLessonTest = generateSQL(
  procedureNameLessonTest,
  dataLessonTest,
  count,
);

// Tạo các câu lệnh SQL cho create_question
const sqlStatementsQuestion = generateSQL(
  procedureNameQuestion,
  dataQuestion,
  count,
);

// In ra các câu lệnh SQL
console.log(sqlStatementsLessonTest);
console.log(sqlStatementsQuestion);

// Lưu dữ liệu vào file
const dir = "./fakedata";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const filePathLessonTest = path.join(dir, "lessonTestData.sql");
const filePathQuestion = path.join(dir, "questionData.sql");
const filePathCourse = path.join(dir, "courseData.sql");
fs.writeFileSync(
  filePathLessonTest,
  sqlStatementsLessonTest.join("\n"),
  "utf-8",
);
fs.writeFileSync(filePathQuestion, sqlStatementsQuestion.join("\n"), "utf-8");
fs.writeFileSync(filePathCourse, courseData.join("\n"), "utf-8");

console.log(
  `Fake data for lesson tests generated and saved to ${filePathLessonTest}`,
);
console.log(
  `Fake data for questions generated and saved to ${filePathQuestion}`,
);
console.log(`Fake data for courses generated and saved to ${filePathCourse}`);
