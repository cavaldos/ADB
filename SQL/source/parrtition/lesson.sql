ALTER TABLE Lessons
ADD PartitionKey AS (CAST(LessonType AS NVARCHAR(255)) + '_' + CONVERT(VARCHAR(10), CreatedTime, 112)) PERSISTED;


CREATE PARTITION FUNCTION LessonCompositePF (NVARCHAR(265))
AS RANGE RIGHT FOR VALUES 
    ('Document_2023-01-01', 'Document_2023-02-01', 'Video_2023-01-01', 'Video_2023-02-01', 
     'Test_2023-01-01', 'Test_2023-02-01');



CREATE PARTITION SCHEME LessonCompositePS
AS PARTITION LessonCompositePF
TO (PRIMARY, PRIMARY, PRIMARY, PRIMARY, PRIMARY, PRIMARY);


CREATE TABLE Lessons_Partitioned
(
    [LessonsID] integer PRIMARY KEY IDENTITY(1, 1),
    [Title] varchar(255),
    [Duration] integer,
    [ComplexityLevel] nvarchar(255) NOT NULL CHECK ([ComplexityLevel] IN ('Easy', 'Medium', 'Hard')),
    [CreatedTime] datetime,
    [UpdatedTime] datetime,
    [LessonType] nvarchar(255),
    [Topic] varchar(255),
    [OrderLesson] integer,
    [CourseID] integer,
    [PartitionKey] AS (CAST(LessonType AS NVARCHAR(255)) + '_' + CONVERT(VARCHAR(10), CreatedTime, 112)) PERSISTED
)
ON LessonCompositePS(PartitionKey);

-- vì trong khoá học sẽ có nhiều bài học, và mỗi bài học sẽ có một loại tài liệu, video, hoặc bài kiểm tra,
-- số lượng các bài học sẽ tăng theo thời gian, nên việc chia theo loại bài học và thời gian tạo sẽ giúp cho việc tìm kiếm và thống kê dễ dàng hơn.]
-- ở đây sử dụng Partition Composite để chia theo loại bài học và thời gian tạo