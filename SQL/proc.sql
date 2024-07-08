--1. Procedure to create a new topic
IF OBJECT_ID('create_topic', 'P') IS NOT NULL
    DROP PROCEDURE create_topic;
GO
CREATE PROCEDURE create_topic
    @TopicName varchar(255),
    @CourseID integer
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [Topic] WHERE TopicName = @TopicName AND CourseID = @CourseID)
        BEGIN
            INSERT INTO [Topic] (TopicName, CourseID)
            VALUES (@TopicName, @CourseID);
            PRINT 'Topic created successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Topic already exists.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating topic.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
--2. Procedure to update_topic
IF OBJECT_ID('update_topic', 'P') IS NOT NULL
    DROP PROCEDURE update_topic;
GO
CREATE PROCEDURE update_topic
    @TopicID integer,
    @TopicName varchar(255)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Topic] WHERE TopicID = @TopicID)
        BEGIN
            UPDATE [Topic]
            SET TopicName = @TopicName
            WHERE TopicID = @TopicID;
            PRINT 'Topic updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Topic does not exist.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating topic.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;

--3. Procedure to delete_topic
IF OBJECT_ID('delete_topic', 'P') IS NOT NULL
    DROP PROCEDURE delete_topic;
GO

CREATE PROCEDURE delete_topic
    @TopicID integer
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Topic] WHERE TopicID = @TopicID)
        BEGIN
            DELETE FROM [Topic]
            WHERE TopicID = @TopicID;
            PRINT 'Topic deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Topic does not exist.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting topic.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
--4. select all topics
IF OBJECT_ID('select_all_topics', 'P') IS NOT NULL
    DROP PROCEDURE select_all_topics;
GO
CREATE PROCEDURE select_all_topics
AS
BEGIN
    BEGIN TRY
        SELECT *
        FROM [Topic];
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while selecting all topics.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;


--5. Procedure to create a new category
IF OBJECT_ID('create_category', 'P') IS NOT NULL
    DROP PROCEDURE create_category;
GO
CREATE PROCEDURE create_category
    @Name varchar(20),
    @CategoryDescription nvarchar(500),
    @ParentCategoryID integer = NULL
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [Category] WHERE Name = @Name AND ParentCategoryID = @ParentCategoryID)
        BEGIN
            INSERT INTO [Category] (Name, CategoryDescription, ParentCategoryID)
            VALUES (@Name, @CategoryDescription, @ParentCategoryID);
            PRINT 'Category created successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Category already exists.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating category.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

--6. Procedure to update_category
IF OBJECT_ID('update_category', 'P') IS NOT NULL
    DROP PROCEDURE update_category;
GO
CREATE PROCEDURE update_category
    @CategoryID integer,
    @Name varchar(20),
    @CategoryDescription nvarchar(500),
    @ParentCategoryID integer
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Category] WHERE CategoryID = @CategoryID)
        BEGIN
            UPDATE [Category]
            SET Name = @Name,
                CategoryDescription = @CategoryDescription,
                ParentCategoryID = @ParentCategoryID
            WHERE CategoryID = @CategoryID
            PRINT 'Category updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Category does not exist.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating category.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;

--7. Procedure to delete_category
IF OBJECT_ID('delete_category', 'P') IS NOT NULL
    DROP PROCEDURE delete_category;
GO
CREATE PROCEDURE delete_category
    @CategoryID integer
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Category] WHERE CategoryID = @CategoryID)
        BEGIN
            DELETE FROM [Category]
            WHERE CategoryID = @CategoryID;
            PRINT 'Category deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Category does not exist.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting category.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;


--7. Procedure to create a new discussion forum
IF OBJECT_ID('create_discussion_forum', 'P') IS NOT NULL
    DROP PROCEDURE create_discussion_forum;
GO
CREATE PROCEDURE create_discussion_forum
    @CourseID integer
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [DiscussionForum] WHERE CourseID = @CourseID)
        BEGIN
            INSERT INTO [DiscussionForum] (CreatedDate, CourseID)
            VALUES (GETDATE(), @CourseID);
            PRINT 'Discussion forum created successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Discussion forum already exists for this course.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating discussion forum.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

--8.Procedure to create a new course

IF OBJECT_ID('create_course', 'P') IS NOT NULL
    DROP PROCEDURE create_course;
GO
CREATE PROCEDURE create_course
    @Title varchar(255),
    @Subtitle varchar(255),
    @Description nvarchar(max),
    @Language varchar(20),
    @Image varchar(50),
    @Price float,
    @Status nvarchar(20),
    @CategoryID integer,
    @InstructorID integer
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [Course] WHERE Title = @Title AND InstructorID = @InstructorID)
        BEGIN
            INSERT INTO [Course] (Title, Subtitle, Description, Language, Image, Price, Status, CreateTime, CategoryID, InstructorID)
            VALUES (@Title, @Subtitle, @Description, @Language, @Image, @Price, @Status, GETDATE(), @CategoryID, @InstructorID);
            PRINT 'Course created successfully.';
        END
        ELSE
        BEGIN
            PRINT 'This course has already been created by you.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating course.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

--9 Procedure to update_course
IF OBJECT_ID('updateCourse', 'P') IS NOT NULL
    DROP PROCEDURE updateCourse;
GO
CREATE PROCEDURE updateCourse
    @CourseID integer,
    @Title varchar(255),
    @Subtitle varchar(255),
    @Description nvarchar(max),
    @Language varchar(20),
    @Image varchar(50),
    @Price float,
    @Status nvarchar(20),
    @HistoryMessage nvarchar(255)
AS
BEGIN
    BEGIN TRY
        DECLARE @OldTitle varchar(255),
                @OldSubtitle varchar(255),
                @OldDescription nvarchar(max),
                @OldLanguage varchar(20),
                @OldImage varchar(50),
                @OldPrice float,
                @OldStatus nvarchar(20);

        -- Get the current course information
        SELECT @OldTitle = Title, @OldSubtitle = Subtitle, @OldDescription = Description, 
               @OldLanguage = Language, @OldImage = Image, @OldPrice = Price, @OldStatus = Status
        FROM [Course]
        WHERE CourseID = @CourseID;

        -- Check if any information has changed
        IF @OldTitle <> @Title OR @OldSubtitle <> @Subtitle OR @OldDescription <> @Description OR
           @OldLanguage <> @Language OR @OldImage <> @Image OR @OldPrice <> @Price OR @OldStatus <> @Status
        BEGIN
            -- Insert into CourseHistory
            INSERT INTO [CourseHistory] (Title, Subtitle, Description, Language, Image, Price, Status, 
                                         UpdateTime, CourseID, HistoryMessage,Version)
            VALUES (@OldTitle, @OldSubtitle, @OldDescription, @OldLanguage, @OldImage, @OldPrice, @OldStatus, 
                    GETDATE(), @CourseID,@HistoryMessage, (SELECT ISNULL(MAX(Version), 0) + 1 FROM CourseHistory WHERE CourseID = @CourseID));

            -- Update the course information
            UPDATE [Course]
            SET Title = @Title,
                Subtitle = @Subtitle,
                Description = @Description,
                Language = @Language,
                Image = @Image,
                Price = @Price,
                Status = @Status
            WHERE CourseID = @CourseID;

            PRINT 'Course updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Information has not been changed.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating course.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
--10 create chat
IF OBJECT_ID('createChat', 'P') IS NOT NULL
    DROP PROCEDURE createChat;
GO
CREATE PROCEDURE createChat
    @ChatContent nvarchar(250),
    @SendChatID integer,
    @ReceiveChatID integer
AS
BEGIN
    BEGIN TRY
        -- Insert new chat entry
        INSERT INTO [Chat] (ChatContent, SendTime, SendChatID, ReceiveChatID)
        VALUES (@ChatContent, GETDATE(), @SendChatID, @ReceiveChatID);

        PRINT 'Chat created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating chat.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
--EXEC CREATECHAT 'Heleqrtqertlo', 6, 4;

--11. GetAllchat
IF OBJECT_ID('getAllChat', 'P') IS NOT NULL
    DROP PROCEDURE getAllChat;
GO
CREATE PROCEDURE getAllChat
    @SendChatID integer,
    @ReceiveChatID integer
AS
BEGIN
    BEGIN TRY
        SELECT 
            c.ChatID AS idchat,
            u1.UserID AS idmessage,
            c.ChatContent AS chatcontent,
            c.SendTime AS time,
            u1.FullName AS sender_name,
            u2.FullName AS receiver_name
        FROM 
            [Chat] c
        JOIN 
            [User] u1 ON c.SendChatID = u1.UserID
        JOIN 
            [User] u2 ON c.ReceiveChatID = u2.UserID
        WHERE 
            c.SendChatID = @SendChatID AND c.ReceiveChatID = @ReceiveChatID
        ORDER BY 
            c.SendTime;--EXEC getAllChat @SendChatID = 3, @ReceiveChatID = 4;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while fetching chat details.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

--12 delete chat
IF OBJECT_ID('deleteChat', 'P') IS NOT NULL
    DROP PROCEDURE deleteChat;
GO
CREATE PROCEDURE deleteChat
    @ChatID integer,
    @UserID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the user is the sender of the chat
        IF EXISTS (SELECT 1 FROM [Chat] WHERE ChatID = @ChatID AND SendChatID = @UserID)
        BEGIN
            -- Delete the chat entry
            DELETE FROM [Chat]
            WHERE ChatID = @ChatID;

            -- Check if the delete was successful
            IF @@ROWCOUNT = 0
            BEGIN
                PRINT 'No chat found with the provided ChatID.';
            END
            ELSE
            BEGIN
                PRINT 'Chat deleted successfully.';
            END
        END
        ELSE
        BEGIN
            PRINT 'You can only delete your own chat messages.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting chat.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

--13. create lesson video
IF OBJECT_ID('create_lesson_video', 'P') IS NOT NULL
    DROP PROCEDURE create_lesson_video;
GO
CREATE PROCEDURE create_lesson_video
    @Title varchar(255),
    @Duration integer,
    @ComplexityLevel nvarchar(255),
    @CourseID integer,
    @TopicID integer,
    @URL varchar(255)
AS
BEGIN
    BEGIN TRY
        -- Check if a lesson with the same title and topic already exists (case insensitive)
        IF EXISTS (SELECT 1 FROM [Lessons] WHERE LOWER(Title) = LOWER(@Title) AND TopicID = @TopicID)
        BEGIN
            PRINT 'A lesson with this title and topic already exists.';
            RETURN;
        END

        BEGIN TRANSACTION;

        DECLARE @LessonsID integer;

        -- Insert new lesson
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, UpdatedTime, LessonType, CourseID, TopicID)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), GETDATE(), 'Video', @CourseID, @TopicID);

        -- Get the ID of the newly created lesson
        SET @LessonsID = SCOPE_IDENTITY();

        -- Insert new lesson video
        INSERT INTO [LessonVideo] (LessonsID, URL)
        VALUES (@LessonsID, @URL);

        COMMIT TRANSACTION;

        PRINT 'Lesson and lesson video created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while creating lesson and lesson video.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- EXEC createLessonWithVideo 
--     @Title = 'IntroductioN to SQLSS',
--     @Duration = 60,
--     @ComplexityLevel = 'Easy',
--     @LessonType = 'Video',
--     @CourseID = 1,
--     @TopicID = 5,
--     @URL = 'https://example.com/video.mp4';


--14. UpdateLessonVideo Create the procedure
IF OBJECT_ID('updateLessonVideo', 'P') IS NOT NULL
    DROP PROCEDURE updateLessonVideo;
GO
CREATE PROCEDURE updateLessonVideo
    @LessonVideoID integer,
    @URL varchar(255)
AS
BEGIN
    BEGIN TRY
        -- Check if the lesson video exists
        IF NOT EXISTS (SELECT 1 FROM [LessonVideo] WHERE LessonVideoID = @LessonVideoID)
        BEGIN
            PRINT 'Lesson video does not exist.';
            RETURN;
        END

        -- Update the lesson video
        UPDATE [LessonVideo]
        SET URL = @URL
        WHERE LessonVideoID = @LessonVideoID;

        PRINT 'Lesson video updated successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating lesson video.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-- EXEC updateLessonVideo @LessonVideoID = 1, @URL = 'https://example.com/new_video.mp4';

--15.  Create the procedure lesson document
IF OBJECT_ID('create_lesson_document', 'P') IS NOT NULL
    DROP PROCEDURE create_lesson_document;
GO

-- Create the procedure
CREATE PROCEDURE create_lesson_document
    @Title varchar(255),
    @Duration integer,
    @ComplexityLevel nvarchar(255),
    @CourseID integer,
    @TopicID integer
AS
BEGIN
    BEGIN TRY
        -- Check if a lesson with the same title already exists (case insensitive)
        IF EXISTS (SELECT 1 FROM [Lessons] WHERE LOWER(Title) = LOWER(@Title))
        BEGIN
            PRINT 'A lesson with this title already exists.';
            RETURN;
        END

        BEGIN TRANSACTION;

        DECLARE @LessonsID integer;

        -- Insert new lesson
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, UpdatedTime, LessonType, CourseID, TopicID)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), GETDATE(), 'Document', @CourseID, @TopicID);

        -- Get the ID of the newly created lesson
        SET @LessonsID = SCOPE_IDENTITY();

        -- Insert new lesson document
        INSERT INTO [LessonDocument] (LessonsID)
        VALUES (@LessonsID);

        COMMIT TRANSACTION;

        PRINT 'Lesson document created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while creating lesson document.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- EXEC create_lesson_document 
--     @Title = 'Introduction to Databasesd',
--     @Duration = 60,
--     @ComplexityLevel = 'Easy',
--     @CourseID = 1,
--     @TopicID = 3;

--16. Create the procedure add page to lesson document
IF OBJECT_ID('add_page_document', 'P') IS NOT NULL
    DROP PROCEDURE add_page_document;
GO
CREATE PROCEDURE add_page_document
    @LessonDocumentID integer,
    @Content nvarchar(500),
    @Page integer
AS
BEGIN
    BEGIN TRY
        -- Check if the lesson document exists
        IF NOT EXISTS (SELECT 1 FROM [LessonDocument] WHERE LessonDocumentID = @LessonDocumentID)
        BEGIN
            PRINT 'Lesson document does not exist.';
            RETURN;
        END

        -- Check if the page number already exists for the given lesson document
        IF EXISTS (SELECT 1 FROM [PageDocument] WHERE LessonDocumentID = @LessonDocumentID AND Page = @Page)
        BEGIN
            PRINT 'Page number already exists for this lesson document.';
            RETURN;
        END

        -- Insert new page document entry
        INSERT INTO [PageDocument] (Content, Page, LessonDocumentID)
        VALUES (@Content, @Page, @LessonDocumentID);

        PRINT 'Page document added successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while adding page document.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-- EXEC add_page_document 
--     @LessonDocumentID = 6,
--     @Content = 'This is the codntsfdefntd ofddc the 999first page.',
--     @Page = 2;

--17. Create the procedure update page document
IF OBJECT_ID('update_page_document', 'P') IS NOT NULL
    DROP PROCEDURE update_page_document;
GO
CREATE PROCEDURE update_page_document
    @PageDocumentID integer,
    @Content nvarchar(500),
    @Page integer,
    @LessonDocumentID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the page document exists
        IF NOT EXISTS (SELECT 1 FROM [PageDocument] WHERE PageDocumentID = @PageDocumentID)
        BEGIN
            PRINT 'Page document does not exist.';
            RETURN;
        END
        -- Check if the page number already exists for the given lesson document (excluding the current page document)
        IF EXISTS (SELECT 1 FROM [PageDocument] WHERE LessonDocumentID = @LessonDocumentID AND Page = @Page AND PageDocumentID <> @PageDocumentID)
        BEGIN
            PRINT 'Page number already exists for this lesson document.';
            RETURN;
        END
        -- Update the page document
        UPDATE [PageDocument]
        SET Content = @Content, Page = @Page, LessonDocumentID = @LessonDocumentID
        WHERE PageDocumentID = @PageDocumentID;

        PRINT 'Page document updated successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating page document.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


--18. Create the procedure delete page document
IF OBJECT_ID('create_lesson_test', 'P') IS NOT NULL
    DROP PROCEDURE create_lesson_test;
GO
CREATE PROCEDURE create_lesson_test
    @Title varchar(255),
    @Duration integer,
    @ComplexityLevel nvarchar(255),
    @CourseID integer,
    @TopicID integer
AS
BEGIN
    BEGIN TRY
        -- Check if a lesson with the same title already exists (case insensitive)
        IF EXISTS (SELECT 1 FROM [Lessons] WHERE LOWER(Title) = LOWER(@Title))
        BEGIN
            PRINT 'A lesson with this title already exists.';
            RETURN;
        END
        BEGIN TRANSACTION;
        DECLARE @LessonsID integer;
        -- Insert new lesson
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, UpdatedTime, LessonType, CourseID, TopicID)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), GETDATE(), 'Test', @CourseID, @TopicID);
        -- Get the ID of the newly created lesson
        SET @LessonsID = SCOPE_IDENTITY();
        -- Insert new lesson test
        INSERT INTO [LessonTest] (LessonsID)
        VALUES (@LessonsID);

        COMMIT TRANSACTION;

        PRINT 'Lesson test created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while creating lesson test.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-- EXEC create_lesson_test 
--     @Title = 'Final Exam',
--     @Duration = 90,
--     @ComplexityLevel = 'Hard',
--     @CourseID = 4,
--     @TopicID = 3;



--19. Create the procedure add question to lesson test
IF OBJECT_ID('create_question', 'P') IS NOT NULL
    DROP PROCEDURE create_question;
GO
CREATE PROCEDURE create_question
    @QuestionContent nvarchar(500),
    @Title varchar(255),
    @LessonTestID integer,
    @Answer1 nvarchar(255),
    @Answer2 nvarchar(255),
    @Answer3 nvarchar(255),
    @CorrectAnswer nvarchar(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @QuestionID integer;

        -- Insert new question entry
        INSERT INTO [Question] (QuestionContent, Title, LessonTestID)
        VALUES (@QuestionContent, @Title, @LessonTestID);

        -- Get the ID of the newly created question
        SET @QuestionID = SCOPE_IDENTITY();

        -- Insert answers
        INSERT INTO [Answer] (AnswerText, IsCorrect, QuestionID)
        VALUES (@Answer1, CASE WHEN @Answer1 = @CorrectAnswer THEN 1 ELSE 0 END, @QuestionID),
               (@Answer2, CASE WHEN @Answer2 = @CorrectAnswer THEN 1 ELSE 0 END, @QuestionID),
               (@Answer3, CASE WHEN @Answer3 = @CorrectAnswer THEN 1 ELSE 0 END, @QuestionID);

        COMMIT TRANSACTION;

        PRINT 'Question and answers created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while creating question and answers.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- EXEC create_question 
--     @QuestionContent = 'What is the capital of France?',
--     @Title = 'Geography Question',
--     @LessonTestID = 1,
--     @Answer1 = 'Paris',
--     @Answer2 = 'London',
--     @Answer3 = 'Berlin',
--     @CorrectAnswer = 'Paris';

--20. Create the procedure update question
IF OBJECT_ID('update_lesson', 'P') IS NOT NULL
    DROP PROCEDURE update_lesson;
GO
CREATE PROCEDURE update_lesson
    @LessonsID integer,
    @Title varchar(255),
    @Duration integer,
    @ComplexityLevel nvarchar(255),
    @CourseID integer,
    @TopicID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the lesson exists
        IF NOT EXISTS (SELECT 1 FROM [Lessons] WHERE LessonsID = @LessonsID)
        BEGIN
            PRINT 'Lesson does not exist.';
            RETURN;
        END

        -- Update the lesson
        UPDATE [Lessons]
        SET Title = @Title,
            Duration = @Duration,
            ComplexityLevel = @ComplexityLevel,
            CourseID = @CourseID,
            TopicID = @TopicID,
            UpdatedTime = GETDATE()
        WHERE LessonsID = @LessonsID;

        PRINT 'Lesson updated successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating lesson.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


--21. Create the procedure delete lesson
IF OBJECT_ID('delete_lesson', 'P') IS NOT NULL
    DROP PROCEDURE delete_lesson;
GO
CREATE PROCEDURE delete_lesson
    @LessonsID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the lesson exists
        IF NOT EXISTS (SELECT 1 FROM [Lessons] WHERE LessonsID = @LessonsID)
        BEGIN
            PRINT 'Lesson does not exist.';
            RETURN;
        END
        BEGIN TRANSACTION;
        -- Delete related entries in LessonVideo, LessonDocument, LessonTest, and PageDocument
        DELETE FROM [PageDocument] WHERE LessonDocumentID IN (SELECT LessonDocumentID FROM [LessonDocument] WHERE LessonsID = @LessonsID);
        DELETE FROM [LessonDocument] WHERE LessonsID = @LessonsID;
        DELETE FROM [LessonVideo] WHERE LessonsID = @LessonsID;
        DELETE FROM [LessonTest] WHERE LessonsID = @LessonsID;
        -- Delete the lesson
        DELETE FROM [Lessons] WHERE LessonsID = @LessonsID;

        COMMIT TRANSACTION;

        PRINT 'Lesson and related entries deleted successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while deleting lesson.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 22. Create the procedure update question
IF OBJECT_ID('update_question', 'P') IS NOT NULL
    DROP PROCEDURE update_question;
GO
CREATE PROCEDURE update_question
    @QuestionID integer,
    @QuestionContent nvarchar(500),
    @Title varchar(255),
    @Answer1 nvarchar(255),
    @Answer2 nvarchar(255),
    @Answer3 nvarchar(255),
    @CorrectAnswer nvarchar(255)
AS
BEGIN
    BEGIN TRY
        -- Check if the question exists
        IF NOT EXISTS (SELECT 1 FROM [Question] WHERE QuestionID = @QuestionID)
        BEGIN
            PRINT 'Question does not exist.';
            RETURN;
        END
        BEGIN TRANSACTION;
        -- Update the question
        UPDATE [Question]
        SET QuestionContent = @QuestionContent,
            Title = @Title
        WHERE QuestionID = @QuestionID;

        -- Update the answers
        DECLARE @AnswerID1 integer;
        DECLARE @AnswerID2 integer;
        DECLARE @AnswerID3 integer;

        -- Retrieve Answer IDs associated with the QuestionID
        SELECT TOP 1 @AnswerID1 = AnswerID FROM [Answer] WHERE QuestionID = @QuestionID ORDER BY AnswerID;
        SELECT TOP 1 @AnswerID2 = AnswerID FROM [Answer] WHERE QuestionID = @QuestionID AND AnswerID > @AnswerID1 ORDER BY AnswerID;
        SELECT TOP 1 @AnswerID3 = AnswerID FROM [Answer] WHERE QuestionID = @QuestionID AND AnswerID > @AnswerID2 ORDER BY AnswerID;

        -- Update Answer1
        UPDATE [Answer]
        SET AnswerText = @Answer1,
            IsCorrect = CASE WHEN @Answer1 = @CorrectAnswer THEN 1 ELSE 0 END
        WHERE AnswerID = @AnswerID1;

        -- Update Answer2
        UPDATE [Answer]
        SET AnswerText = @Answer2,
            IsCorrect = CASE WHEN @Answer2 = @CorrectAnswer THEN 1 ELSE 0 END
        WHERE AnswerID = @AnswerID2;

        -- Update Answer3
        UPDATE [Answer]
        SET AnswerText = @Answer3,
            IsCorrect = CASE WHEN @Answer3 = @CorrectAnswer THEN 1 ELSE 0 END
        WHERE AnswerID = @AnswerID3;

        COMMIT TRANSACTION;

        PRINT 'Question and answers updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while updating question and answers.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


--23. Create the procedure delete question
IF OBJECT_ID('delete_question', 'P') IS NOT NULL
    DROP PROCEDURE delete_question;
GO
CREATE PROCEDURE delete_question
    @QuestionID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the question exists
        IF NOT EXISTS (SELECT 1 FROM [Question] WHERE QuestionID = @QuestionID)
        BEGIN
            PRINT 'Question does not exist.';
            RETURN;
        END

        BEGIN TRANSACTION;

        -- Delete associated answers
        DELETE FROM [Answer] WHERE QuestionID = @QuestionID;

        -- Delete the question
        DELETE FROM [Question] WHERE QuestionID = @QuestionID;

        COMMIT TRANSACTION;

        PRINT 'Question and associated answers deleted successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while deleting question and answers.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 24. Create the procedure get lesson test questions  --err001
IF OBJECT_ID('get_lesson_test_questions', 'P') IS NOT NULL
    DROP PROCEDURE get_lesson_test_questions;
GO
CREATE PROCEDURE get_lesson_test_questions
    @LessonTestID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the lesson test exists
        IF NOT EXISTS (SELECT 1 FROM [LessonTest] WHERE LessonTestID = @LessonTestID)
        BEGIN
            PRINT 'Lesson test does not exist.';
            RETURN;
        END

        -- Select questions and answers for the given lesson test
        SELECT 
            q.QuestionID,
            q.QuestionContent,
            q.Title AS QuestionTitle,
            a.AnswerID,
            a.AnswerText,
            a.IsCorrect
        FROM 
            [Question] q
        JOIN 
            [Answer] a ON q.QuestionID = a.QuestionID
        WHERE 
            q.LessonTestID = @LessonTestID
        ORDER BY 
            q.QuestionID, a.AnswerID;

        PRINT 'Questions and answers retrieved successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while retrieving questions and answers.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


--25 Create the procedure start lessons process --err002
IF OBJECT_ID('start_lessons_process', 'P') IS NOT NULL
    DROP PROCEDURE start_lessons_process;
GO
CREATE PROCEDURE start_lessons_process
    @LessonsID integer,
    @LearnProcessID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the lesson exists
        IF NOT EXISTS (SELECT 1 FROM [Lessons] WHERE LessonsID = @LessonsID)
        BEGIN
            PRINT 'Lesson does not exist.';
            RETURN;
        END

        -- Check if the learn process exists
        IF NOT EXISTS (SELECT 1 FROM [LearnProcess] WHERE LearnProcessID = @LearnProcessID)
        BEGIN
            PRINT 'Learn process does not exist.';
            RETURN;
        END

        -- Insert a new lesson process
        INSERT INTO [LessonsProcess] (LessonsID, LearnProcessID, Status, StartTime)
        VALUES (@LessonsID, @LearnProcessID, 'InProcess', GETDATE());

        PRINT 'Lesson process started successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while starting lesson process.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 26. Create the procedure done lesson process
IF OBJECT_ID('done_lesson_process', 'P') IS NOT NULL
    DROP PROCEDURE done_lesson_process;
GO
CREATE PROCEDURE done_lesson_process
    @LessonsProcessID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the lesson process exists
        IF NOT EXISTS (SELECT 1 FROM [LessonsProcess] WHERE LessonsProcessID = @LessonsProcessID)
        BEGIN
            PRINT 'Lesson process does not exist.';
            RETURN;
        END

        -- Update the lesson process to mark it as done
        UPDATE [LessonsProcess]
        SET Status = 'Done',
            EndTime = GETDATE()
        WHERE LessonsProcessID = @LessonsProcessID;

        PRINT 'Lesson process marked as done successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while marking lesson process as done.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 27. Create the procedure start learn process
IF OBJECT_ID('start_learn_process', 'P') IS NOT NULL
    DROP PROCEDURE start_learn_process;
GO
CREATE PROCEDURE start_learn_process
    @StudentID integer,
    @CourseID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the student exists
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE StudentID = @StudentID)
        BEGIN
            PRINT 'Student does not exist.';
            RETURN;
        END

        -- Check if the course exists
        IF NOT EXISTS (SELECT 1 FROM [Course] WHERE CourseID = @CourseID)
        BEGIN
            PRINT 'Course does not exist.';
            RETURN;
        END

        -- Insert a new learn process
        INSERT INTO [LearnProcess] (StudentID, CourseID, Status)
        VALUES (@StudentID, @CourseID, 0);  -- Assuming 0 means InProcess

        PRINT 'Learn process started successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while starting learn process.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 28. Create the procedure update learn process
IF OBJECT_ID('update_learn_process', 'P') IS NOT NULL
    DROP PROCEDURE update_learn_process;
GO
CREATE PROCEDURE update_learn_process
    @LearnProcessID integer,
    @Status bit,
    @StudentID integer,
    @CourseID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the learn process exists
        IF NOT EXISTS (SELECT 1 FROM [LearnProcess] WHERE LearnProcessID = @LearnProcessID)
        BEGIN
            PRINT 'Learn process does not exist.';
            RETURN;
        END

        -- Check if the student exists
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE StudentID = @StudentID)
        BEGIN
            PRINT 'Student does not exist.';
            RETURN;
        END

        -- Check if the course exists
        IF NOT EXISTS (SELECT 1 FROM [Course] WHERE CourseID = @CourseID)
        BEGIN
            PRINT 'Course does not exist.';
            RETURN;
        END

        -- Update the learn process
        UPDATE [LearnProcess]
        SET Status = @Status,
            StudentID = @StudentID,
            CourseID = @CourseID
        WHERE LearnProcessID = @LearnProcessID;

        PRINT 'Learn process updated successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating learn process.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 29. Create the procedure create_message_forum
IF OBJECT_ID('create_message_forum', 'P') IS NOT NULL
    DROP PROCEDURE create_message_forum;
GO
CREATE PROCEDURE create_message_forum
    @MessageContent nvarchar(500),
    @UserID integer,
    @DiscussionForumID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the user exists
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserID = @UserID)
        BEGIN
            PRINT 'User does not exist.';
            RETURN;
        END

        -- Check if the discussion forum exists
        IF NOT EXISTS (SELECT 1 FROM [DiscussionForum] WHERE ForumID = @DiscussionForumID)
        BEGIN
            PRINT 'Discussion forum does not exist.';
            RETURN;
        END

        -- Insert a new forum message
        INSERT INTO [ForumMessage] (MessageContent, SendTime, UserID, DiscussionForumID)
        VALUES (@MessageContent, GETDATE(), @UserID, @DiscussionForumID);

        PRINT 'Forum message created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating forum message.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 30. Create the procedure delete_message_forum
IF OBJECT_ID('delete_message_forum', 'P') IS NOT NULL
    DROP PROCEDURE delete_message_forum;
GO
CREATE PROCEDURE delete_message_forum
    @ForumMessageID integer,
    @UserID integer
AS
BEGIN
    BEGIN TRY
        -- Check if the forum message exists and belongs to the user
        IF NOT EXISTS (SELECT 1 FROM [ForumMessage] WHERE ForumMessageID = @ForumMessageID AND UserID = @UserID)
        BEGIN
            PRINT 'Forum message does not exist or you do not have permission to delete this message.';
            RETURN;
        END

        -- Delete the forum message
        DELETE FROM [ForumMessage] WHERE ForumMessageID = @ForumMessageID;

        PRINT 'Forum message deleted successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting forum message.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-----------

-- 31. Create the procedure create_admin
IF OBJECT_ID('create_admin', 'P') IS NOT NULL
    DROP PROCEDURE create_admin;
GO
CREATE PROCEDURE create_admin
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100)
AS
BEGIN
    BEGIN TRY
        -- Check if the username already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
        BEGIN
            PRINT 'Username already exists.';
            RETURN;
        END

        -- Check if the email already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
        BEGIN
            PRINT 'Email already exists.';
            RETURN;
        END

        BEGIN TRANSACTION;

        DECLARE @UserID integer;

        -- Insert new user
        INSERT INTO [User] (UserName, Password, Email, FullName, Phone, Address, Role, CreatedTime, UpdateTime)
        VALUES (@UserName, @Password, @Email, @FullName, @Phone, @Address, 'Admin', GETDATE(), GETDATE());

        -- Get the ID of the newly created user
        SET @UserID = SCOPE_IDENTITY();

        -- Insert into Admin table
        INSERT INTO [Admin] (UserID)
        VALUES (@UserID);

        COMMIT TRANSACTION;

        PRINT 'Admin created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while creating admin.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 32. Create the procedure create_student
IF OBJECT_ID('create_instructor', 'P') IS NOT NULL
    DROP PROCEDURE create_instructor;
GO
CREATE PROCEDURE create_instructor
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100)
AS
BEGIN
    BEGIN TRY
        -- Check if the username already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
        BEGIN
            PRINT 'Username already exists.';
            RETURN;
        END

        -- Check if the email already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
        BEGIN
            PRINT 'Email already exists.';
            RETURN;
        END

        BEGIN TRANSACTION;

        DECLARE @UserID integer;

        -- Insert new user
        INSERT INTO [User] (UserName, Password, Email, FullName, Phone, Address, Role, CreatedTime, UpdateTime)
        VALUES (@UserName, @Password, @Email, @FullName, @Phone, @Address, 'Instructor', GETDATE(), GETDATE());

        -- Get the ID of the newly created user
        SET @UserID = SCOPE_IDENTITY();

        -- Insert into Instructor table
        INSERT INTO [Instructor] (UserID, Level, Status)
        VALUES (@UserID, 'Beginner', null);

        COMMIT TRANSACTION;

        PRINT 'Instructor created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while creating instructor.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 33. Create the procedure update_admin
IF OBJECT_ID('update_admin', 'P') IS NOT NULL
    DROP PROCEDURE update_admin;
GO
CREATE PROCEDURE update_admin
    @UserID integer,
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100)
AS
BEGIN
    BEGIN TRY
        -- Check if the admin exists
        IF NOT EXISTS (SELECT 1 FROM [Admin] WHERE UserID = @UserID)
        BEGIN
            PRINT 'Admin does not exist.';
            RETURN;
        END

        -- Check if the username is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName AND UserID <> @UserID)
        BEGIN
            PRINT 'Username already exists for another user.';
            RETURN;
        END

        -- Check if the email is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email AND UserID <> @UserID)
        BEGIN
            PRINT 'Email already exists for another user.';
            RETURN;
        END

        BEGIN TRANSACTION;

        -- Update the user
        UPDATE [User]
        SET UserName = @UserName,
            Password = @Password,
            Email = @Email,
            FullName = @FullName,
            Phone = @Phone,
            Address = @Address,
            UpdateTime = GETDATE()
        WHERE UserID = @UserID;

        COMMIT TRANSACTION;

        PRINT 'Admin updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while updating admin.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 34. Create the procedure create_student
IF OBJECT_ID('create_student', 'P') IS NOT NULL
    DROP PROCEDURE create_student;
GO
CREATE PROCEDURE create_student
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100),
    @SchoolYear varchar(20)
AS
BEGIN
    BEGIN TRY
        -- Check if the username already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
        BEGIN
            PRINT 'Username already exists.';
            RETURN;
        END

        -- Check if the email already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
        BEGIN
            PRINT 'Email already exists.';
            RETURN;
        END

        BEGIN TRANSACTION;

        DECLARE @UserID integer;

        -- Insert new user
        INSERT INTO [User] (UserName, Password, Email, FullName, Phone, Address, Role, CreatedTime, UpdateTime)
        VALUES (@UserName, @Password, @Email, @FullName, @Phone, @Address, 'Student', GETDATE(), GETDATE());

        -- Get the ID of the newly created user
        SET @UserID = SCOPE_IDENTITY();

        -- Insert into Student table
        INSERT INTO [Student] (UserID, SchoolYear)
        VALUES (@UserID, @SchoolYear);

        COMMIT TRANSACTION;

        PRINT 'Student created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while creating student.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
--  35. Create the procedure update_student
IF OBJECT_ID('update_student', 'P') IS NOT NULL
    DROP PROCEDURE update_student;
GO
CREATE PROCEDURE update_student
    @UserID integer,
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100),
    @SchoolYear varchar(20)
AS
BEGIN
    BEGIN TRY
        -- Check if the student exists
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE UserID = @UserID)
        BEGIN
            PRINT 'Student does not exist.';
            RETURN;
        END

        -- Check if the username is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName AND UserID <> @UserID)
        BEGIN
            PRINT 'Username already exists for another user.';
            RETURN;
        END

        -- Check if the email is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email AND UserID <> @UserID)
        BEGIN
            PRINT 'Email already exists for another user.';
            RETURN;
        END

        BEGIN TRANSACTION;

        -- Update the user
        UPDATE [User]
        SET UserName = @UserName,
            Password = @Password,
            Email = @Email,
            FullName = @FullName,
            Phone = @Phone,
            Address = @Address,
            UpdateTime = GETDATE()
        WHERE UserID = @UserID;

        -- Update the student
        UPDATE [Student]
        SET SchoolYear = @SchoolYear
        WHERE UserID = @UserID;

        COMMIT TRANSACTION;

        PRINT 'Student updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while updating student.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 36. Create the procedure create_course
IF OBJECT_ID('update_instructor', 'P') IS NOT NULL
    DROP PROCEDURE update_instructor;
GO
CREATE PROCEDURE update_instructor
    @UserID integer,
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100),
    @Level nvarchar(255),
    @Status nvarchar(255)
AS
BEGIN
    BEGIN TRY
        -- Check if the instructor exists
        IF NOT EXISTS (SELECT 1 FROM [Instructor] WHERE UserID = @UserID)
        BEGIN
            PRINT 'Instructor does not exist.';
            RETURN;
        END

        -- Check if the username is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName AND UserID <> @UserID)
        BEGIN
            PRINT 'Username already exists for another user.';
            RETURN;
        END

        -- Check if the email is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email AND UserID <> @UserID)
        BEGIN
            PRINT 'Email already exists for another user.';
            RETURN;
        END

        BEGIN TRANSACTION;

        -- Update the user
        UPDATE [User]
        SET UserName = @UserName,
            Password = @Password,
            Email = @Email,
            FullName = @FullName,
            Phone = @Phone,
            Address = @Address,
            UpdateTime = GETDATE()
        WHERE UserID = @UserID;

        -- Update the instructor
        UPDATE [Instructor]
        SET Level = @Level,
            Status = @Status
        WHERE UserID = @UserID;

        COMMIT TRANSACTION;

        PRINT 'Instructor updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while updating instructor.';
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
