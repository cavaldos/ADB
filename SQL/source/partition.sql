-- Tạo Partition Function cho LessonsID
CREATE PARTITION FUNCTION pfLessonsID (int)
AS RANGE LEFT FOR VALUES (1000, 2000, 3000, 4000);

-- Tạo Partition Scheme cho LessonsID
CREATE PARTITION SCHEME psLessonsID
AS PARTITION pfLessonsID
TO ([Primary], [FileGroup1], [FileGroup2], [FileGroup3], [FileGroup4]);



CREATE TABLE LessonDocument (
  LessonDocumentID integer PRIMARY KEY IDENTITY(1, 1),
  LessonsID integer UNIQUE
) ON psLessonsID(LessonsID);

-- Tạo ràng buộc khoá ngoại (nếu cần thiết)
ALTER TABLE LessonDocument ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID]);


CREATE TABLE LessonVideo (
  LessonVideoID integer PRIMARY KEY IDENTITY(1, 1),
  URL varchar(255),
  LessonsID integer UNIQUE
) ON psLessonsID(LessonsID);

-- Tạo ràng buộc khoá ngoại (nếu cần thiết)
ALTER TABLE LessonVideo ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID]);


CREATE TABLE LessonTest (
  LessonTestID integer PRIMARY KEY IDENTITY(1, 1),
  LessonsID integer UNIQUE
) ON psLessonsID(LessonsID);

-- Tạo ràng buộc khoá ngoại (nếu cần thiết)
ALTER TABLE LessonTest ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID]);
