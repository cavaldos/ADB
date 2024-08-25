
-- 5. Create the procedure to create category
IF OBJECT_ID('create_category', 'P') IS NOT NULL
    DROP PROCEDURE create_category;
GO
CREATE PROCEDURE create_category
    @CategoryName varchar(20),
    @CategoryDescription nvarchar(500),
    @ParentCategoryID integer = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Check if the parent category exists if ParentCategoryID is provided
        IF @ParentCategoryID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM [Category] WHERE CategoryID = @ParentCategoryID)
        BEGIN
            RAISERROR('Parent category does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Check if the category already exists
        IF EXISTS (SELECT 1 FROM [Category] WHERE CategoryName = @CategoryName AND ParentCategoryID = @ParentCategoryID)
        BEGIN
            RAISERROR('Category already exists.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        -- Check if the category already exists
        IF EXISTS (SELECT 1 FROM [Category] WHERE CategoryName = @CategoryName )
        BEGIN
            RAISERROR('Category already exists.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        -- Insert the new category if it does not exist
        INSERT INTO [Category] (CategoryName, CategoryDescription, ParentCategoryID)
        VALUES (@CategoryName, @CategoryDescription, @ParentCategoryID);
         RAISERROR ('Category created successfully.',16,1);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR ('Error occurred while creating category.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 6. Create the procedure to update category
IF OBJECT_ID('update_category', 'P') IS NOT NULL
    DROP PROCEDURE update_category;
GO
CREATE PROCEDURE update_category
    @CategoryID integer,
    @CategoryName varchar(20) = NULL,
    @CategoryDescription nvarchar(500) = NULL,
    @ParentCategoryID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        IF EXISTS (SELECT 1 FROM [Category] WHERE CategoryID = @CategoryID)
        BEGIN
            UPDATE [Category]
            SET CategoryName = @CategoryName,
                CategoryDescription = @CategoryDescription,
                ParentCategoryID = @ParentCategoryID
            WHERE CategoryID = @CategoryID
            RAISERROR ('Category updated successfully.',16,1);
        END
        ELSE
        BEGIN
            RAISERROR('Category does not exist.',16,1);
        END
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating category.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO




-- 7. Create the procedure to delete category
IF OBJECT_ID('delete_category', 'P') IS NOT NULL
    DROP PROCEDURE delete_category;
GO
CREATE PROCEDURE delete_category
    @CategoryID integer
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Kiểm tra xem danh mục có tồn tại không
        IF EXISTS (SELECT 1 FROM [Category] WHERE CategoryID = @CategoryID)
        BEGIN
            -- Kiểm tra xem danh mục có được sử dụng trong bảng Course không
            IF EXISTS (SELECT 1 FROM [Course] WHERE CategoryID = @CategoryID)
            BEGIN
                RAISERROR('Category is being used in Course table and cannot be deleted.',16,1);
            END
            ELSE
            BEGIN
                DELETE FROM [Category]
                WHERE CategoryID = @CategoryID;
                RAISERROR('Category deleted successfully.',16,1);
            END
        END
        ELSE
        BEGIN
            RAISERROR('Category does not exist.',16,1);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while deleting category.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 8. Create the procedure to create discussion forum
IF OBJECT_ID('create_discussion_forum', 'P') IS NOT NULL
    DROP PROCEDURE create_discussion_forum;
GO
CREATE PROCEDURE create_discussion_forum
    @CourseID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        IF NOT EXISTS (SELECT 1 FROM [DiscussionForum] WHERE CourseID = @CourseID)
        BEGIN
            INSERT INTO [DiscussionForum] (CreatedDate, CourseID)
            VALUES (GETDATE(), @CourseID);
            RAISERROR ('Discussion forum created successfully.',16,1);
        END
        ELSE
        BEGIN
        RAISERROR('Discussion forum already exists for this course.',16,1);
        END
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR ('Error occurred while creating discussion forum.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 9. Create the procedure to create course
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
        BEGIN TRANSACTION;
        
        -- Check if InstructorID exists
        IF NOT EXISTS (SELECT 1 FROM [Instructor] WHERE InstructorID = @InstructorID)
        BEGIN
            RAISERROR ('InstructorID does not exist.', 16, 1);
            RETURN;
        END
        
        -- Check if CategoryID exists
        IF NOT EXISTS (SELECT 1 FROM [Category] WHERE CategoryID = @CategoryID)
        BEGIN
            RAISERROR ('CategoryID does not exist.', 16, 1);
            RETURN;
        END
        
        -- Check if the course already exists for the given title and instructor
        IF EXISTS (SELECT 1 FROM [Course] WHERE Title = @Title AND InstructorID = @InstructorID)
        BEGIN
            RAISERROR ('This course has already been created by you.', 16, 1);
            RETURN;
        END
        
        -- Insert new course
        INSERT INTO [Course] (Title, Subtitle, Description, Language, Image, Price, Status, CreateTime, CategoryID, InstructorID)
        VALUES (@Title, @Subtitle, @Description, @Language, @Image, @Price, @Status, GETDATE(), @CategoryID, @InstructorID);
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR ('Error occurred while creating course: %s', 16, 1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 10. Create the procedure to update course
IF OBJECT_ID('update_course', 'P') IS NOT NULL
    DROP PROCEDURE update_course;
GO
CREATE PROCEDURE update_course
    @CourseID INTEGER,
    @Title VARCHAR(255),
    @Subtitle VARCHAR(255),
    @Description NVARCHAR(MAX),
    @Language VARCHAR(20),
    @Image VARCHAR(50),
    @Price FLOAT,
    @Status NVARCHAR(20),
    @HistoryMessage NVARCHAR(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @OldTitle VARCHAR(255),
                @OldSubtitle VARCHAR(255),
                @OldDescription NVARCHAR(MAX),
                @OldLanguage VARCHAR(20),
                @OldImage VARCHAR(50),
                @OldPrice FLOAT,
                @OldStatus NVARCHAR(20),
                @NewTitle VARCHAR(255),
                @NewSubtitle VARCHAR(255),
                @NewDescription NVARCHAR(MAX),
                @NewLanguage VARCHAR(20),
                @NewImage VARCHAR(50),
                @NewPrice FLOAT,
                @NewStatus NVARCHAR(20);

        -- Get the current course information
        SELECT @OldTitle = Title, @OldSubtitle = Subtitle, @OldDescription = Description, 
               @OldLanguage = Language, @OldImage = Image, @OldPrice = Price, @OldStatus = Status
        FROM [Course]
        WHERE CourseID = @CourseID;

        -- Set new values only if they are provided, otherwise use old values
        SET @NewTitle = ISNULL(NULLIF(@Title, ''), @OldTitle);
        SET @NewSubtitle = ISNULL(NULLIF(@Subtitle, ''), @OldSubtitle);
        SET @NewDescription = ISNULL(NULLIF(@Description, ''), @OldDescription);
        SET @NewLanguage = ISNULL(NULLIF(@Language, ''), @OldLanguage);
        SET @NewImage = ISNULL(NULLIF(@Image, ''), @OldImage);
        SET @NewPrice = ISNULL(NULLIF(@Price, 0), @OldPrice);
        SET @NewStatus = ISNULL(NULLIF(@Status, ''), @OldStatus);

        -- Check if any information has changed
        IF @OldTitle <> @NewTitle OR @OldSubtitle <> @NewSubtitle OR @OldDescription <> @NewDescription OR
           @OldLanguage <> @NewLanguage OR @OldImage <> @NewImage OR @OldPrice <> @NewPrice OR @OldStatus <> @NewStatus
        BEGIN
            -- Insert into CourseHistory
            INSERT INTO [CourseHistory] (Title, Subtitle, Description, Language, Image, Price, Status, 
                                         UpdateTime, CourseID, HistoryMessage, Version)
            VALUES (@OldTitle, @OldSubtitle, @OldDescription, @OldLanguage, @OldImage, @OldPrice, @OldStatus, 
                    GETDATE(), @CourseID, @HistoryMessage, (SELECT ISNULL(MAX(Version), 0) + 1 FROM CourseHistory WHERE CourseID = @CourseID));

            -- Update the course information
            UPDATE [Course]
            SET Title = @NewTitle,
                Subtitle = @NewSubtitle,
                Description = @NewDescription,
                Language = @NewLanguage,
                Image = @NewImage,
                Price = @NewPrice,
                Status = @NewStatus
            WHERE CourseID = @CourseID;

            PRINT 'Course updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'No changes were made as the information provided is the same as the existing one.';
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR ('Error occurred while updating course.', 16, 1);
        RETURN;
    END CATCH
END;
GO
-- 11. Create the procedure to create chat
IF OBJECT_ID('create_chat', 'P') IS NOT NULL
    DROP PROCEDURE create_chat;
GO
CREATE PROCEDURE create_chat
    @ChatContent nvarchar(250),
    @SendChatID integer,
    @ReceiveChatID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Insert new chat entry
        INSERT INTO [Chat] (ChatContent, SendTime, SendChatID, ReceiveChatID)
        VALUES (@ChatContent, GETDATE(), @SendChatID, @ReceiveChatID);

    COMMIT TRANSACTION;
    PRINT'Chat created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating chat.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
--EXEC create_chat 'Heleqrtqertlo', 6, 4;

-- 12. Create the procedure to get all chat
IF OBJECT_ID('get_all_chat', 'P') IS NOT NULL
    DROP PROCEDURE get_all_chat;
GO
CREATE PROCEDURE get_all_chat
    @SendChatID integer,
    @ReceiveChatID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        SELECT 
            c.ChatID AS ChatID,
            u1.UserID AS SenderID,
            c.ChatContent AS ChatContent,
            c.SendTime AS time,
            u1.FullName AS SenderName,
            u2.FullName AS ReceiverName
        FROM 
            [Chat] c
        full JOIN 
            [User] u1 ON c.SendChatID = u1.UserID
        full JOIN 
            [User] u2 ON c.ReceiveChatID = u2.UserID
        WHERE 
            c.SendChatID = @SendChatID AND c.ReceiveChatID = @ReceiveChatID
        ORDER BY 
            c.SendTime;--EXEC get_all_chat @SendChatID = 3, @ReceiveChatID = 4;
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 13. Create the procedure delete chat
IF OBJECT_ID('delete_chat', 'P') IS NOT NULL
    DROP PROCEDURE delete_chat;
GO
CREATE PROCEDURE delete_chat
    @ChatID integer,
    @UserID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the user is the sender of the chat
        IF EXISTS (SELECT 1 FROM [Chat] WHERE ChatID = @ChatID AND SendChatID = @UserID)
        BEGIN
            -- Delete the chat entry
            DELETE FROM [Chat]
            WHERE ChatID = @ChatID;

            -- Check if the delete was successful
            IF @@ROWCOUNT = 0
            BEGIN
                RAISERROR ('No chat found with the provided ChatID.',16,1);
            END
            ELSE
            BEGIN
                RAISERROR ('Chat deleted successfully.',16,1);
            END
        END
        ELSE
        BEGIN
            RAISERROR ('You can only delete your own chat messages.',16,1);
    COMMIT TRANSACTION;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while deleting chat.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 14. Create the procedure to create lesson video
IF OBJECT_ID('create_lesson_video', 'P') IS NOT NULL
    DROP PROCEDURE create_lesson_video;
GO
CREATE PROCEDURE create_lesson_video
    @Title varchar(255),
    @Duration integer,
    @ComplexityLevel nvarchar(255),
    @CourseID integer,
    @Topic nvarchar(255),
    @OrderLesson integer,
    @URL varchar(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check if a lesson with the same title and topic already exists (case insensitive)
        IF EXISTS (SELECT 1 FROM [Lessons] WHERE LOWER(Title) = LOWER(@Title) AND OrderLesson = @OrderLesson)
        BEGIN
            RAISERROR('A lesson with this title and topic already exists.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        
        DECLARE @LessonsID integer;

        -- Insert new lesson
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, UpdatedTime, LessonType, CourseID, Topic, OrderLesson)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), GETDATE(), 'Video', @CourseID, @Topic, @OrderLesson);

        -- Get the ID of the newly created lesson
        SET @LessonsID = SCOPE_IDENTITY();

        -- Insert new lesson video
        INSERT INTO [LessonVideo] (LessonsID, URL)
        VALUES (@LessonsID, @URL);

        COMMIT TRANSACTION;
        
        -- Success message (use PRINT or lower severity level)
        PRINT 'Lesson and lesson video created successfully.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        -- Capture and display the error
        DECLARE @ErrorMessage NVARCHAR(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- 15.  Create the procedure update lesson video
IF OBJECT_ID('update_lesson_video', 'P') IS NOT NULL
    DROP PROCEDURE update_lesson_video;
GO
CREATE PROCEDURE update_lesson_video
    @LessonVideoID integer,
    @URL varchar(255)
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the lesson video exists
        IF NOT EXISTS (SELECT 1 FROM [LessonVideo] WHERE LessonVideoID = @LessonVideoID)
        BEGIN
            RAISERROR ('Lesson video does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Update the lesson video
        UPDATE [LessonVideo]
        SET URL = @URL
        WHERE LessonVideoID = @LessonVideoID;

    COMMIT TRANSACTION;
    PRINT'Lesson video updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating lesson video.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

--- 16. Create the procedure create lesson document
IF OBJECT_ID('create_lesson_document', 'P') IS NOT NULL
    DROP PROCEDURE create_lesson_document;
GO

CREATE PROCEDURE create_lesson_document
    @Title varchar(255),
    @Duration integer,
    @ComplexityLevel nvarchar(255),
    @CourseID integer,
    @Topic nvarchar(255),
    @OrderLesson integer
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
       -- Check if a lesson with the same title already exists within the same course (case insensitive)
        IF EXISTS (SELECT 1 FROM [Lessons] 
                   WHERE LOWER(Title) = LOWER(@Title) AND CourseID = @CourseID)
        BEGIN
            RAISERROR('A lesson with this title already exists in the same course.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        DECLARE @LessonsID integer;

        -- Insert new lesson
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, UpdatedTime, LessonType, CourseID, Topic, OrderLesson)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), GETDATE(), 'Document', @CourseID, @Topic, @OrderLesson);

        -- Get the ID of the newly created lesson
        SET @LessonsID = SCOPE_IDENTITY();

        -- Insert new lesson document
        INSERT INTO [LessonDocument] (LessonsID)
        VALUES (@LessonsID);

        COMMIT TRANSACTION;
        
        -- Success message
        PRINT 'Lesson document created successfully.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        -- Capture and display the error
        DECLARE @ErrorMessage NVARCHAR(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- EXEC create_lesson_document 
--     @Title = 'Introduction to Databasesd',
--     @Duration = 60,
--     @ComplexityLevel = 'Easy',
--     @CourseID = 1,
--     @TopicID = 3;

-- 17. Create the procedure add page to lesson document
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
    BEGIN TRANSACTION;
        -- Check if the lesson document exists
        IF NOT EXISTS (SELECT 1 FROM [LessonDocument] WHERE LessonDocumentID = @LessonDocumentID)
        BEGIN
            RAISERROR('Lesson document does not exist.',16,1);
            RETURN;
        END

        -- Check if the page number already exists for the given lesson document
        IF EXISTS (SELECT 1 FROM [PageDocument] WHERE LessonDocumentID = @LessonDocumentID AND Page = @Page)
        BEGIN
            RAISERROR('Page number already exists for this lesson document.',16,1);
            RETURN;
        END

        -- Insert new page document entry
        INSERT INTO [PageDocument] (Content, Page, LessonDocumentID)
        VALUES (@Content, @Page, @LessonDocumentID);

    COMMIT TRANSACTION;
    PRINT'Page document added successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while adding page document.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-- EXEC add_page_document 
--     @LessonDocumentID = 6,
--     @Content = 'This is the codntsfdefntd ofddc the 999first page.',
--     @Page = 2;

-- 18. Create the procedure update page document --err
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
        BEGIN TRANSACTION;

        -- Check if the page document exists
        IF NOT EXISTS (SELECT 1 FROM [PageDocument] WHERE PageDocumentID = @PageDocumentID)
        BEGIN
            RAISERROR ('Page document does not exist.',16,1);
            RETURN;
        END

        -- If Content is empty or NULL, delete the page document
        IF @Content IS NULL OR LTRIM(RTRIM(@Content)) = ''
        BEGIN
            DELETE FROM [PageDocument] WHERE PageDocumentID = @PageDocumentID;
            RAISERROR ('Page document deleted successfully.',16,1);
        END
        ELSE
        BEGIN
            -- Check if the page number already exists for the given lesson document (excluding the current page document)
            IF EXISTS (SELECT 1 FROM [PageDocument] WHERE LessonDocumentID = @LessonDocumentID AND Page = @Page AND PageDocumentID <> @PageDocumentID)
            BEGIN
                RAISERROR ('Page number already exists for this lesson document.',16,1);
                RETURN;
            END
            
            -- Update the page document
            UPDATE [PageDocument]
            SET Content = @Content, Page = @Page, LessonDocumentID = @LessonDocumentID
            WHERE PageDocumentID = @PageDocumentID;
            RAISERROR ('Page document updated successfully.',16,1);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR ('Error occurred while updating page document.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 19. Create the procedure create lesson test
IF OBJECT_ID('create_lesson_test', 'P') IS NOT NULL
    DROP PROCEDURE create_lesson_test;
GO
CREATE PROCEDURE create_lesson_test
    @Title varchar(255),
    @Duration integer,
    @ComplexityLevel nvarchar(255),
    @CourseID integer,
    @Topic nvarchar(255),
    @OrderLesson integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if a lesson with the same title already exists (case insensitive)
        IF EXISTS (SELECT 1 FROM [Lessons] WHERE LOWER(Title) = LOWER(@Title))
        BEGIN
            RAISERROR('A lesson with this title already exists.',16,1);
            RETURN;
        END
        
        DECLARE @LessonsID integer;
        -- Insert new lesson
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, UpdatedTime, LessonType, CourseID, Topic, OrderLesson)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), GETDATE(), 'Test', @CourseID, @Topic , @OrderLesson);
        -- Get the ID of the newly created lesson
        SET @LessonsID = SCOPE_IDENTITY();
        -- Insert new lesson test
        INSERT INTO [LessonTest] (LessonsID)
        VALUES (@LessonsID);


    COMMIT TRANSACTION;
    PRINT'Lesson test created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating lesson test.',16,1);
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



-- 20. Create the procedure add question to lesson test
IF OBJECT_ID('add_question_lessontest', 'P') IS NOT NULL
    DROP PROCEDURE add_question_lessontest;
GO
CREATE PROCEDURE add_question_lessontest
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
    PRINT'Question and answers created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating question and answers.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- EXEC add_question_lessontest 
--     @QuestionContent = 'What is the capital of France?',
--     @Title = 'Geography Question',
--     @LessonTestID = 1,
--     @Answer1 = 'Paris',
--     @Answer2 = 'London',
--     @Answer3 = 'Berlin',
--     @CorrectAnswer = 'Paris';


-- 21. Create the procedure update question lessontest
IF OBJECT_ID('update_question_lessontest', 'P') IS NOT NULL
    DROP PROCEDURE update_question_lessontest;
GO
CREATE PROCEDURE update_question_lessontest
    @QuestionID integer,
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
        
        -- Update the question entry
        UPDATE [Question]
        SET QuestionContent = @QuestionContent,
            Title = @Title,
            LessonTestID = @LessonTestID
        WHERE QuestionID = @QuestionID;

        -- Update answers
        UPDATE [Answer]
        SET AnswerText = @Answer1,
            IsCorrect = CASE WHEN @Answer1 = @CorrectAnswer THEN 1 ELSE 0 END
        WHERE QuestionID = @QuestionID AND AnswerText = @Answer1;

        UPDATE [Answer]
        SET AnswerText = @Answer2,
            IsCorrect = CASE WHEN @Answer2 = @CorrectAnswer THEN 1 ELSE 0 END
        WHERE QuestionID = @QuestionID AND AnswerText = @Answer2;

        UPDATE [Answer]
        SET AnswerText = @Answer3,
            IsCorrect = CASE WHEN @Answer3 = @CorrectAnswer THEN 1 ELSE 0 END
        WHERE QuestionID = @QuestionID AND AnswerText = @Answer3;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating question and answers.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 22. Create the procedure update question
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
    BEGIN TRANSACTION;
        -- Check if the lesson exists
        IF NOT EXISTS (SELECT 1 FROM [Lessons] WHERE LessonsID = @LessonsID)
        BEGIN
            RAISERROR('Lesson does not exist.',16,1);
            RETURN;
        END

        -- Update the lesson
        UPDATE [Lessons]
        SET Title = @Title,
            Duration = @Duration,
            ComplexityLevel = @ComplexityLevel,
            CourseID = @CourseID,
            UpdatedTime = GETDATE()
        WHERE LessonsID = @LessonsID;

    COMMIT TRANSACTION;
    PRINT'Lesson updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating lesson.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 23. Create the procedure delete lesson
IF OBJECT_ID('delete_lesson', 'P') IS NOT NULL
    DROP PROCEDURE delete_lesson;
GO
CREATE PROCEDURE delete_lesson
    @LessonsID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the lesson exists
        IF NOT EXISTS (SELECT 1 FROM [Lessons] WHERE LessonsID = @LessonsID)
        BEGIN
            RAISERROR('Lesson does not exist.',16,1);
            RETURN;
        END
        
        -- Delete related entries in LessonVideo, LessonDocument, LessonTest, and PageDocument
        DELETE FROM [PageDocument] WHERE LessonDocumentID IN (SELECT LessonDocumentID FROM [LessonDocument] WHERE LessonsID = @LessonsID);
        DELETE FROM [LessonDocument] WHERE LessonsID = @LessonsID;
        DELETE FROM [LessonVideo] WHERE LessonsID = @LessonsID;
        DELETE FROM [LessonTest] WHERE LessonsID = @LessonsID;
        -- Delete the lesson
        DELETE FROM [Lessons] WHERE LessonsID = @LessonsID;


    COMMIT TRANSACTION;
    PRINT'Lesson and related entries deleted successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while deleting lesson.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 24. Create the procedure update question
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
    BEGIN TRANSACTION;
        -- Check if the question exists
        IF NOT EXISTS (SELECT 1 FROM [Question] WHERE QuestionID = @QuestionID)
        BEGIN
            RAISERROR('Question does not exist.',16,1);
            RETURN;
        END
        
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
    PRINT'Question and answers updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating question and answers.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 25. Create the procedure delete question
IF OBJECT_ID('delete_question', 'P') IS NOT NULL
    DROP PROCEDURE delete_question;
GO
CREATE PROCEDURE delete_question
    @QuestionID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the question exists
        IF NOT EXISTS (SELECT 1 FROM [Question] WHERE QuestionID = @QuestionID)
        BEGIN
            RAISERROR('Question does not exist.',16,1);
            RETURN;
        END

        

        -- Delete associated answers
        DELETE FROM [Answer] WHERE QuestionID = @QuestionID;

        -- Delete the question
        DELETE FROM [Question] WHERE QuestionID = @QuestionID;


    COMMIT TRANSACTION;
    PRINT'Question and associated answers deleted successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while deleting question and answers.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 26. Create the procedure get lesson test questions  --err001
IF OBJECT_ID('get_lesson_test_questions', 'P') IS NOT NULL
    DROP PROCEDURE get_lesson_test_questions;
GO
CREATE PROCEDURE get_lesson_test_questions
    @LessonTestID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the lesson test exists
        IF NOT EXISTS (SELECT 1 FROM [LessonTest] WHERE LessonTestID = @LessonTestID)
        BEGIN
            RAISERROR('Lesson test does not exist.',16,1);
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

    COMMIT TRANSACTION;
    PRINT'Questions and answers retrieved successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while retrieving questions and answers.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 29. Create the procedure start learn process
IF OBJECT_ID('start_learn_process', 'P') IS NOT NULL
    DROP PROCEDURE start_learn_process;
GO

CREATE PROCEDURE start_learn_process
    @StudentID integer,
    @CourseID integer
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;

        -- Kiểm tra xem CourseID có tồn tại hay không
        IF NOT EXISTS (SELECT 1 FROM Course WHERE CourseID = @CourseID)
        BEGIN
            RAISERROR('Invalid CourseID', 16, 1);
            RETURN;
        END

        -- Kiểm tra xem StudentID có tồn tại hay không
        IF NOT EXISTS (SELECT 1 FROM Student WHERE StudentID = @StudentID)
        BEGIN
            RAISERROR('Invalid StudentID', 16, 1);
            RETURN;
        END

        -- Thêm một quá trình học mới cho khóa học
        INSERT INTO LearnProcess (StatusProcess, LessonsID, StudentID, CourseID)
        SELECT 'NotStarted', LessonsID, @StudentID, @CourseID
        FROM Lessons
        WHERE CourseID = @CourseID;

        -- Hoàn thành giao dịch
        COMMIT TRANSACTION;
        PRINT'Learn process started successfully.';
    END TRY
    BEGIN CATCH
        -- Hủy bỏ giao dịch nếu có lỗi xảy ra
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        -- Hiển thị thông tin lỗi
        RAISERROR('Error occurred while starting learn process.', 16, 1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO




-- 30. Create the procedure update learn process
IF OBJECT_ID('update_learn_process', 'P') IS NOT NULL
    DROP PROCEDURE update_learn_process;
GO
CREATE PROCEDURE update_learn_process
    @LearnProcessID integer,
    @Status nvarchar(20),
    @StudentID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the learn process exists
        IF NOT EXISTS (SELECT 1 FROM [LearnProcess] WHERE LearnProcessID = @LearnProcessID)
        BEGIN
            RAISERROR('Learn process does not exist.',16,1);
            RETURN;
        END

        -- Check if the student exists
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE StudentID = @StudentID)
        BEGIN
            RAISERROR('Student does not exist.',16,1);
            RETURN;
        END

        -- Update the learn process
        UPDATE [LearnProcess]
        SET [StatusProcess] = @Status,
            StudentID = @StudentID
        WHERE LearnProcessID = @LearnProcessID;

    COMMIT TRANSACTION;
    PRINT'Learn process updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating learn process.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 31. Create the procedure create_message_forum
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
    BEGIN TRANSACTION;
        -- Check if the user exists
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserID = @UserID)
        BEGIN
            RAISERROR('User does not exist.',16,1);
            RETURN;
        END

        -- Check if the discussion forum exists
        IF NOT EXISTS (SELECT 1 FROM [DiscussionForum] WHERE ForumID = @DiscussionForumID)
        BEGIN
            RAISERROR('Discussion forum does not exist.',16,1);
            RETURN;
        END

        -- Insert a new forum message
        INSERT INTO [ForumMessage] (MessageContent, SendTime, SenderID, DiscussionForumID)
        VALUES (@MessageContent, GETDATE(), @UserID, @DiscussionForumID);

    COMMIT TRANSACTION;
    PRINT'Forum message created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating forum message.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 32. Create the procedure delete message forum
IF OBJECT_ID('delete_message_forum', 'P') IS NOT NULL
    DROP PROCEDURE delete_message_forum;
GO
CREATE PROCEDURE delete_message_forum
    @ForumMessageID integer,
    @DiscussionForumID integer,
    @UserID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the forum message exists and belongs to the user
        IF NOT EXISTS (SELECT 1 FROM [ForumMessage] WHERE ForumMessageID = @ForumMessageID AND SenderID = @UserID)
        BEGIN
            RAISERROR('Forum message does not exist or you do not have permission to delete this message.',16,1);
            RETURN;
        END

        -- Check if the discussion forum exists
        IF NOT EXISTS (SELECT 1 FROM [DiscussionForum] WHERE ForumID = @DiscussionForumID)
        BEGIN
        RAISERROR('Discussion forum does not exist.',16,1);
            RETURN;
        END
        
        -- Delete the forum message
        DELETE FROM [ForumMessage] WHERE ForumMessageID = @ForumMessageID;

    COMMIT TRANSACTION;
    PRINT'Forum message deleted successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while deleting forum message.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-----------

-- 33. Create the procedure create admin
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
    BEGIN TRANSACTION;
        -- Check if the username already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
        BEGIN
            RAISERROR('Username already exists.',16,1);
            RETURN;
        END

        -- Check if the email already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
        BEGIN
            RAISERROR('Email already exists.',16,1);
            RETURN;
        END

        

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
    PRINT'Admin created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating admin.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 34. Create the procedure create instructor
IF OBJECT_ID('create_instructor', 'P') IS NOT NULL
    DROP PROCEDURE create_instructor;
GO
CREATE PROCEDURE create_instructor
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100),
    @Level nvarchar(255) = 'Beginner', -- Add default value for Level
    @Status nvarchar(255) = 'Pending'  -- Add default value for Status
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the username already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
        BEGIN
            RAISERROR('Username already exists.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Check if the email already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
        BEGIN
        RAISERROR('Email already exists.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        DECLARE @UserID integer;

        -- Insert new user
        INSERT INTO [User] (UserName, Password, Email, FullName, Phone, Address, Role, CreatedTime, UpdateTime)
        VALUES (@UserName, @Password, @Email, @FullName, @Phone, @Address, 'Instructor', GETDATE(), GETDATE());

        -- Get the ID of the newly created user
        SET @UserID = SCOPE_IDENTITY();

        -- Insert into Instructor table
        INSERT INTO [Instructor] (UserID, Level, Status)
        VALUES (@UserID, @Level, @Status);

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Instructor created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while creating instructor.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 35. Create the procedure update admin
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
    BEGIN TRANSACTION;
        -- Check if the admin exists
        IF NOT EXISTS (SELECT 1 FROM [Admin] WHERE UserID = @UserID)
        BEGIN
            RAISERROR('Admin does not exist.',16,1);
            RETURN;
        END

        -- Check if the username is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName AND UserID <> @UserID)
        BEGIN
            RAISERROR('Username already exists for another user.',16,1);
            RETURN;
        END

        -- Check if the email is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email AND UserID <> @UserID)
        BEGIN
            RAISERROR('Email already exists for another user.',16,1);
            RETURN;
        END

        

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
    PRINT'Admin updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating admin.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 36. Create the procedure create student

IF OBJECT_ID('create_student', 'P') IS NOT NULL
    DROP PROCEDURE create_student;
GO
CREATE PROCEDURE create_student
    @UserName varchar(20),
    @Password varchar(20),
    @Email varchar(50),
    @FullName varchar(50),
    @Phone varchar(20),
    @Address varchar(100)
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the username already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
        BEGIN
            RAISERROR('Username already exists.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Check if the email already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
        BEGIN
            RAISERROR('Email already exists.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        DECLARE @UserID integer;

        -- Insert new user
        INSERT INTO [User] (UserName, Password, Email, FullName, Phone, Address, Role, CreatedTime, UpdateTime)
        VALUES (@UserName, @Password, @Email, @FullName, @Phone, @Address, 'Student', GETDATE(), GETDATE());

        -- Get the ID of the newly created user
        SET @UserID = SCOPE_IDENTITY();

        -- Insert into Student table
        INSERT INTO [Student] (UserID)
        VALUES (@UserID);

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Student created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while creating student.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

--- 37. Create the procedure update student
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
    @Address varchar(100)
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the student exists
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE UserID = @UserID)
        BEGIN
            RAISERROR('Student does not exist.',16,1);
            RETURN;
        END

        -- Check if the username is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName AND UserID <> @UserID)
        BEGIN
            RAISERROR('Username already exists for another user.',16,1);
            RETURN;
        END

        -- Check if the email is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email AND UserID <> @UserID)
        BEGIN
            RAISERROR('Email already exists for another user.',16,1);
            RETURN;
        END

        

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
    PRINT'Student updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating student.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 38. Create the procedure update instructor
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
    BEGIN TRANSACTION;
        -- Check if the instructor exists
        IF NOT EXISTS (SELECT 1 FROM [Instructor] WHERE UserID = @UserID)
        BEGIN
            RAISERROR('Instructor does not exist.',16,1);
            RETURN;
        END

        -- Check if the username is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName AND UserID <> @UserID)
        BEGIN
            RAISERROR('Username already exists for another user.',16,1);
            RETURN;
        END

        -- Check if the email is unique for other users
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email AND UserID <> @UserID)
        BEGIN
            RAISERROR('Email already exists for another user.',16,1);
            RETURN;
        END

        

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
    PRINT'Instructor updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating instructor.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 39. Create the procedure create review
IF OBJECT_ID('create_review', 'P') IS NOT NULL
    DROP PROCEDURE create_review;
GO
CREATE PROCEDURE create_review
    @Comment nvarchar(250),
    @Rating float,
    @StudentID integer,
    @CourseID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the student exists
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE StudentID = @StudentID)
        BEGIN
            RAISERROR('Student does not exist.',16,1);
            RETURN;
        END

        -- Check if the course exists
        IF NOT EXISTS (SELECT 1 FROM [Course] WHERE CourseID = @CourseID)
        BEGIN
            RAISERROR('Course does not exist.',16,1);
            RETURN;
        END

        -- Insert a new review
        INSERT INTO [Review] (Comment, Rating, CreatedDate, StudentID, CourseID)
        VALUES (@Comment, @Rating, GETDATE(), @StudentID, @CourseID);

    COMMIT TRANSACTION;
    PRINT'Review created successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR ('Error occurred while creating review.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 40. Create the procedure update review
IF OBJECT_ID('update_review', 'P') IS NOT NULL
    DROP PROCEDURE update_review;
GO
CREATE PROCEDURE update_review
    @ReviewID integer,
    @Comment nvarchar(250),
    @Rating float
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the review exists
        IF NOT EXISTS (SELECT 1 FROM [Review] WHERE ReviewID = @ReviewID)
        BEGIN
            RAISERROR('Review does not exist.',16,1);
            RETURN;
        END
      
        -- Update the review
        UPDATE [Review]
        SET Comment = @Comment,
            Rating = @Rating,
            CreatedDate = GETDATE() -- Updating the created date to current date and time
        WHERE ReviewID = @ReviewID;

    COMMIT TRANSACTION;
    PRINT'Review updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating review.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 41. Create the procedure add to cart
IF OBJECT_ID('add_to_cart', 'P') IS NOT NULL
    DROP PROCEDURE add_to_cart;
GO
CREATE PROCEDURE add_to_cart
    @StudentID integer,
    @CourseID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        DECLARE @CartID integer;
        -- Check if the student exists
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE StudentID = @StudentID)
        BEGIN
            RAISERROR('Student does not exist.',16,1);
            RETURN;
        END
        -- Check if the course exists
        IF NOT EXISTS (SELECT 1 FROM [Course] WHERE CourseID = @CourseID)
        BEGIN
            RAISERROR('Course does not exist.',16,1);
            RETURN;
        END
        -- Find a pending cart for the student
        SELECT TOP 1 @CartID = CartID
        FROM [Cart]
        WHERE StudentID = @StudentID;

        -- If no pending cart is found, create a new one
        IF @CartID IS NULL
        BEGIN
            INSERT INTO [Cart] (StudentID)
            VALUES (@StudentID);
            SET @CartID = SCOPE_IDENTITY();
        END

        -- Check if the course is already in the cart
        IF EXISTS (SELECT 1 FROM [CartDetail] WHERE CartID = @CartID AND CourseID = @CourseID)
        BEGIN
            RAISERROR('Course is already in the cart.',16,1);
            RETURN;
        END

        -- Insert a new cart detail
        INSERT INTO [CartDetail] (CartID, CourseID)
        VALUES (@CartID, @CourseID);

    COMMIT TRANSACTION;
    PRINT'Course added to cart successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while adding course to cart.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 43. Create the procedure remove_cart_detail
IF OBJECT_ID('remove_cart_detail', 'P') IS NOT NULL
    DROP PROCEDURE remove_cart_detail;
GO
CREATE PROCEDURE remove_cart_detail
    @CartID integer,
    @CourseID integer
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;
        -- Check if the cart detail exists
        IF NOT EXISTS (SELECT 1 FROM [CartDetail] WHERE CartID = @CartID AND CourseID = @CourseID)
        BEGIN
            RAISERROR('Cart detail does not exist.',16,1);
            RETURN;
        END

        -- Delete the cart detail
        DELETE FROM [CartDetail]
        WHERE CartID = @CartID AND CourseID = @CourseID;

    COMMIT TRANSACTION;
        PRINT'Cart detail removed successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while removing cart detail.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 45. Create the procedure create invoice
IF OBJECT_ID('create_invoice', 'P') IS NOT NULL
    DROP PROCEDURE create_invoice;
GO

CREATE PROCEDURE create_invoice
    @StudentID integer,
    @CourseID integer
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;

        -- Kiểm tra xem sinh viên có tồn tại không
        IF NOT EXISTS (SELECT 1 FROM [Student] WHERE StudentID = @StudentID)
        BEGIN
            RAISERROR('Student does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Kiểm tra xem sinh viên đã có hoá đơn 'Unpaid' chưa
        DECLARE @InvoiceID integer;
        SELECT @InvoiceID = InvoiceID
        FROM [Invoice]
        WHERE StudentID = @StudentID AND InvoiceStatus = 'Unpaied';

        -- Nếu không có hoá đơn 'Unpaid', tạo hoá đơn mới
        IF @InvoiceID IS NULL
        BEGIN
            INSERT INTO [Invoice] (InvoiceDate, InvoiceStatus, TransferID, StudentID, TotalAmount)
            VALUES (GETDATE(), 'Unpaied', NULL, @StudentID, 0);

            SET @InvoiceID = SCOPE_IDENTITY();
        END
        ELSE
        BEGIN
            -- Kiểm tra xem khoá học đã có trong chi tiết hoá đơn chưa
            IF EXISTS (SELECT 1 FROM [InvoiceDetail] WHERE InvoiceID = @InvoiceID AND CourseID = @CourseID)
            BEGIN
                RAISERROR('Course already exists in the unpaid invoice.',16,1);
                ROLLBACK TRANSACTION;
                RETURN;
            END
        END

        -- Kiểm tra xem khoá học đã có trong hoá đơn đã hoàn thành chưa
        IF EXISTS (SELECT 1 FROM [Invoice] iv 
        JOIN [InvoiceDetail] id ON iv.InvoiceID = id.InvoiceID 
        WHERE iv.StudentID = @StudentID AND iv.InvoiceStatus = 'Paied' AND id.CourseID = @CourseID)
        BEGIN
            RAISERROR('Course already exists in the paid invoice.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Thêm khoá học vào chi tiết hoá đơn
        INSERT INTO [InvoiceDetail] (InvoiceID, CourseID, Price, DiscountPrice)
        SELECT @InvoiceID, @CourseID, c.Price, 0
        FROM [Course] c
        WHERE c.CourseID = @CourseID;

        -- Tính tổng số tiền hoá đơn
        UPDATE [Invoice]
        SET TotalAmount = (SELECT SUM(Price - DiscountPrice) FROM [InvoiceDetail] WHERE InvoiceID = @InvoiceID)
        WHERE InvoiceID = @InvoiceID;

        -- Commit giao dịch
        COMMIT TRANSACTION;
        PRINT'Invoice updated successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback giao dịch nếu có lỗi xảy ra
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while creating/updating invoice.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 46 Create the procedure apply discount
IF OBJECT_ID('apply_discount', 'P') IS NOT NULL
    DROP PROCEDURE apply_discount;
GO

CREATE PROCEDURE apply_discount
    @DiscountCode varchar(20),
    @InvoiceDetailID integer
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;

        -- Kiểm tra mã giảm giá có hợp lệ và còn hạn sử dụng không
        DECLARE @DiscountID integer, @Percentage float, @ExpiryDate datetime, @Quantity integer;
        SELECT @DiscountID = DiscountID, @Percentage = Percentage, @ExpiryDate = ExpiryDate, @Quantity = Quantity
        FROM [Discount]
        WHERE [Code] = @DiscountCode;

        IF @DiscountID IS NULL
        BEGIN
            RAISERROR('Invalid discount code.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF @ExpiryDate < GETDATE()
        BEGIN
            RAISERROR('Discount code has expired.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF @Quantity <= 0
        BEGIN
            RAISERROR('Discount code is out of quantity.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Lấy giá của khoá học trong chi tiết hoá đơn
        DECLARE @CourseID integer, @OriginalPrice float, @DiscountPrice float;
        SELECT @CourseID = CourseID, @OriginalPrice = Price
        FROM [InvoiceDetail]
        WHERE InvoiceDetailID = @InvoiceDetailID;

        IF @CourseID IS NULL
        BEGIN
            RAISERROR('Invalid invoice detail ID.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Tính toán lại giá sau khi áp dụng giảm giá
        SET @DiscountPrice = @OriginalPrice * (1 - @Percentage / 100.0);

        -- Cập nhật giá trong chi tiết hoá đơn và thêm mã giảm giá
        UPDATE [InvoiceDetail]
        SET DiscountPrice = @DiscountPrice, DiscountID = @DiscountID
        WHERE InvoiceDetailID = @InvoiceDetailID;

        -- Giảm số lượng discount đi 1
        UPDATE [Discount]
        SET Quantity = Quantity - 1
        WHERE DiscountID = @DiscountID;

        -- Tính tổng số tiền hoá đơn mới
        DECLARE @InvoiceID integer;
        SELECT @InvoiceID = InvoiceID
        FROM [InvoiceDetail]
        WHERE InvoiceDetailID = @InvoiceDetailID;

        UPDATE [Invoice]
        SET TotalAmount = (
            SELECT SUM(Price - ISNULL(DiscountPrice, 0))
            FROM [InvoiceDetail]
            WHERE InvoiceID = @InvoiceID
        )
        WHERE InvoiceID = @InvoiceID;

        -- Commit giao dịch
        COMMIT TRANSACTION;
        PRINT'Discount applied successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback giao dịch nếu có lỗi xảy ra
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while applying discount.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 47. Create the procedure delete invoice detail
IF OBJECT_ID('delete_invoice_detail', 'P') IS NOT NULL
    DROP PROCEDURE delete_invoice_detail;
GO

CREATE PROCEDURE delete_invoice_detail
    @InvoiceDetailID integer
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;

        -- Kiểm tra xem InvoiceDetailID có tồn tại không
        IF NOT EXISTS (SELECT 1 FROM [InvoiceDetail] WHERE InvoiceDetailID = @InvoiceDetailID)
        BEGIN
            RAISERROR('Invoice detail does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Lấy InvoiceID từ InvoiceDetail
        DECLARE @InvoiceID integer;
        SELECT @InvoiceID = InvoiceID
        FROM [InvoiceDetail]
        WHERE InvoiceDetailID = @InvoiceDetailID;

        -- Xoá chi tiết hoá đơn
        DELETE FROM [InvoiceDetail]
        WHERE InvoiceDetailID = @InvoiceDetailID;

        -- Tính tổng số tiền hoá đơn mới
        UPDATE [Invoice]
        SET TotalAmount = (
            SELECT SUM(Price - ISNULL(DiscountPrice, 0))
            FROM [InvoiceDetail]
            WHERE InvoiceID = @InvoiceID
        )
        WHERE InvoiceID = @InvoiceID;

        -- Commit giao dịch
        COMMIT TRANSACTION;
        PRINT'Invoice detail deleted and total amount updated successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback giao dịch nếu có lỗi xảy ra
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while deleting invoice detail.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO




-- 48. Create the procedure create bank account
IF OBJECT_ID('create_bank_account', 'P') IS NOT NULL
    DROP PROCEDURE create_bank_account;
GO
CREATE PROCEDURE create_bank_account
    @AccountNumber varchar(20),
    @AccountHolderName varchar(50),
    @AccountBalance float,
    @BankName varchar(50),
    @UserID integer
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the user exists
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserID = @UserID)
        BEGIN
            RAISERROR('User does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Check if the account number already exists
        IF EXISTS (SELECT 1 FROM [BankAccount] WHERE AccountNumber = @AccountNumber)
        BEGIN
            RAISERROR('Account number already exists.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insert a new bank account
        INSERT INTO [BankAccount] (AccountNumber, AccountHolderName, AccountBalance, BankName, UserID)
        VALUES (@AccountNumber, @AccountHolderName, @AccountBalance, @BankName, @UserID);

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Bank account created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating bank account.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 49. Create the procedure update bank account (update account number, account holder name, account balance, bank name)
IF OBJECT_ID('update_bank_account', 'P') IS NOT NULL
    DROP PROCEDURE update_bank_account;
GO
CREATE PROCEDURE update_bank_account
    @UserID integer,
    @BankAccountID integer,
    @AccountNumber varchar(20) = NULL,
    @AccountHolderName varchar(50) = NULL,
    @AccountBalance float = NULL,
    @BankName varchar(50) = NULL
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the user exists
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserID = @UserID)
        BEGIN
        RAISERROR('User does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Check if the bank account exists for the user
        IF NOT EXISTS (SELECT 1 FROM [BankAccount] WHERE UserID = @UserID AND BankAccountID = @BankAccountID)
        BEGIN
            RAISERROR('Bank account does not exist for this user.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Update the bank account conditionally based on non-null input values
        UPDATE [BankAccount]
        SET 
            AccountNumber = COALESCE(@AccountNumber, AccountNumber),
            AccountHolderName = COALESCE(@AccountHolderName, AccountHolderName),
            AccountBalance = COALESCE(@AccountBalance, AccountBalance),
            BankName = COALESCE(@BankName, BankName)
        WHERE UserID = @UserID AND BankAccountID = @BankAccountID;

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Bank account updated successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating bank account.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 50. Create the procedure create history banking
IF OBJECT_ID('create_history_banking', 'P') IS NOT NULL
    DROP PROCEDURE create_history_banking;
GO
CREATE PROCEDURE create_history_banking
    @Amount float,
    @TransferContent nvarchar(255),
    @TransferType nvarchar(20),
    @BankAccountID integer,
    @NewBalance float
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the bank account exists
        IF NOT EXISTS (SELECT 1 FROM [BankAccount] WHERE BankAccountID = @BankAccountID)
        BEGIN
            RAISERROR('Bank account does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insert a new history banking record
        INSERT INTO [HistoryBanking] (Amount, TransferContent, TransferCode, TransferType, BankAccountID, CreateTime, AccountBlanceNow)
        VALUES (@Amount, @TransferContent, (UPPER(REPLACE(NEWID(), '-', ''))), @TransferType, @BankAccountID, GETDATE(), @NewBalance);

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'History banking record created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating history banking record.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 51. Create the procedure transfer money
IF OBJECT_ID('transfer_money', 'P') IS NOT NULL
    DROP PROCEDURE transfer_money;
GO
CREATE PROCEDURE transfer_money
    @BankAccountID integer,
    @Amount float,
    @Type nvarchar(50)
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the bank account exists for the user
        IF NOT EXISTS (SELECT 1 FROM [BankAccount] WHERE BankAccountID = @BankAccountID)
        BEGIN
            RAISERROR('Bank account does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Declare variables to hold the current balance and new balance
        DECLARE @CurrentBalance float;
        DECLARE @NewBalance float;

        -- Get the current balance
        SELECT @CurrentBalance = AccountBalance FROM [BankAccount] WHERE BankAccountID = @BankAccountID;

        -- Check the type of transaction and calculate the new balance
        IF @Type = 'Deposit'
        BEGIN
            SET @NewBalance = @CurrentBalance + @Amount;
        END
        ELSE IF @Type = 'Withdrawal'
        BEGIN
            -- Check if there are sufficient funds for withdrawal
            IF @CurrentBalance < @Amount
            BEGIN
                ROLLBACK TRANSACTION;
                RETURN;
            END
            SET @NewBalance = @CurrentBalance - @Amount;
        END
        ELSE
        BEGIN
            RAISERROR('Invalid transaction type. Please specify "Deposit" or "Withdrawal".',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Update the bank account with the new balance
        UPDATE [BankAccount]
        SET AccountBalance = @NewBalance
        WHERE BankAccountID = @BankAccountID;

        -- Create history banking record
        DECLARE @TransferContent nvarchar(255); 
        SET @TransferContent = 'Transfer money ' + CAST(@Type AS nvarchar(50)) + ' ' + CAST(@Amount AS nvarchar(50));
        EXEC create_history_banking @Amount, @TransferContent, @Type, @BankAccountID, @NewBalance;

        -- Commit the transaction
        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while processing transaction.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 52. Create the procedure create transfer course
IF OBJECT_ID('create_transfer_course', 'P') IS NOT NULL
    DROP PROCEDURE create_transfer_course;
GO
CREATE PROCEDURE create_transfer_course
    @Amount float,
    @TransferDescription nvarchar(255) = NULL,
    @BankBeneficiaryID integer = NULL,
    @BankOrderingID integer = NULL
AS
BEGIN
    BEGIN TRY
        -- Start a transaction @UserID
        BEGIN TRANSACTION;

       
        -- Check if the beneficiary bank account exists (if provided)
        IF @BankBeneficiaryID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM [BankAccount] WHERE BankAccountID = @BankBeneficiaryID)
        BEGIN
            RAISERROR('Beneficiary bank account does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Check if the ordering bank account exists (if provided)
        IF @BankOrderingID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM [BankAccount] WHERE BankAccountID = @BankOrderingID)
        BEGIN
            RAISERROR('Ordering bank account does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        DECLARE @NameBeneficiary nvarchar(255);
        DECLARE @NameOrdering nvarchar(255);

        -- Get the name of the beneficiary bank account
        SELECT @NameBeneficiary = AccountHolderName FROM [BankAccount] WHERE BankAccountID = @BankBeneficiaryID;
        SELECT @NameOrdering = AccountHolderName FROM [BankAccount] WHERE BankAccountID = @BankOrderingID;

        IF @TransferDescription IS NULL
        BEGIN
            SET @TransferDescription = 'Transfer from ' + ISNULL(@NameOrdering, 'Unknown') + ' to ' + ISNULL(@NameBeneficiary, 'Unknown') + ' for ' + CAST(@Amount AS nvarchar(50));
        END

        -- Insert a new transfer record
        INSERT INTO [Transfer] (TransactionTime, Amount, TransferDescription, BankBeneficiaryID, BankOrderingID, InvoiceID)
        VALUES (GETDATE(), @Amount, @TransferDescription, @BankBeneficiaryID, @BankOrderingID, NULL);

        -- Update the bank balances
        EXEC transfer_money @BankOrderingID, @Amount, 'Withdrawal';
        EXEC transfer_money @BankBeneficiaryID, @Amount, 'Deposit';

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Transfer created and balances updated successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating transfer and updating balances.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO



-- 53. Create the procedure process payment
IF OBJECT_ID('process_payment', 'P') IS NOT NULL
    DROP PROCEDURE process_payment;
GO

CREATE PROCEDURE process_payment
    @InvoiceID integer
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the invoice exists and is unpaid
        IF NOT EXISTS (SELECT 1 FROM [Invoice] WHERE InvoiceID = @InvoiceID AND InvoiceStatus = 'UnPaied')
        BEGIN
            RAISERROR('Invoice does not exist or is already paid.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Retrieve the total amount and student ID from the invoice
        DECLARE @TotalAmount float, @StudentID integer;
        SELECT @TotalAmount = TotalAmount, @StudentID = StudentID
        FROM [Invoice]
        WHERE InvoiceID = @InvoiceID;

        -- Retrieve the bank account ID of the student
        DECLARE @StudentBankAccountID integer;
        SELECT @StudentBankAccountID = ba.BankAccountID
        FROM [BankAccount] ba
        JOIN [Student] s ON ba.UserID = s.UserID
        WHERE s.StudentID = @StudentID;

        -- Check if the student has a bank account
        IF @StudentBankAccountID IS NULL
        BEGIN
            RAISERROR('Student does not have a bank account.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Retrieve the course and instructor details from the invoice
        DECLARE @CourseID integer, @InstructorID integer, @Amount float;

        DECLARE course_cursor CURSOR FOR
        SELECT id.CourseID, c.InstructorID, (id.Price - ISNULL(id.DiscountPrice, 0)) AS Amount
        FROM [InvoiceDetail] id
        JOIN [Course] c ON id.CourseID = c.CourseID
        WHERE id.InvoiceID = @InvoiceID;

        OPEN course_cursor;
        FETCH NEXT FROM course_cursor INTO @CourseID, @InstructorID, @Amount;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Retrieve the bank account ID of the instructor
            DECLARE @InstructorBankAccountID integer;
            SELECT @InstructorBankAccountID = ba.BankAccountID
            FROM [BankAccount] ba
            JOIN [Instructor] i ON ba.UserID = i.UserID
            WHERE i.InstructorID = @InstructorID;

            -- Check if the instructor has a bank account
            IF @InstructorBankAccountID IS NULL
            BEGIN
                RAISERROR('Instructor does not have a bank account.', 16, 1);
                ROLLBACK TRANSACTION;
                CLOSE course_cursor;
                DEALLOCATE course_cursor;
                RETURN;
            END

            -- Create a transfer from the student to the instructor
            DECLARE @TransferDescription nvarchar(255);
            SET @TransferDescription = 'Payment for course ' + CAST(@CourseID AS nvarchar(50));

            INSERT INTO [Transfer] (TransactionTime, Amount, TransferDescription, BankBeneficiaryID, BankOrderingID, InvoiceID)
            VALUES (GETDATE(), @Amount, @TransferDescription, @InstructorBankAccountID, @StudentBankAccountID, @InvoiceID);

            FETCH NEXT FROM course_cursor INTO @CourseID, @InstructorID, @Amount;
        END

        CLOSE course_cursor;
        DEALLOCATE course_cursor;

        -- Update the invoice status to 'Paid'
        UPDATE [Invoice]
        SET InvoiceStatus = 'Paied'
        WHERE InvoiceID = @InvoiceID;

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT 'Payments processed successfully and invoice status updated to paid.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while processing payments.', 16, 1) WITH NOWAIT;
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO






--=====================================================
-- 53. Create the procedure create certificate
IF OBJECT_ID('create_certificate', 'P') IS NOT NULL
    DROP PROCEDURE create_certificate;
GO
CREATE PROCEDURE create_certificate
    @CertificateName nvarchar(100),
    @StartDate datetime,
    @EndDate datetime,
    @InstructorID integer = NULL
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the instructor exists
        IF NOT EXISTS (SELECT 1 FROM [Instructor] WHERE InstructorID = @InstructorID)
        BEGIN
            RAISERROR('Instructor does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insert the new certificate
        INSERT INTO [Certificate] (CertificateName, StartDate, EndDate, InstructorID)
        VALUES (@CertificateName, @StartDate, @EndDate, @InstructorID);

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Certificate created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating certificate.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 54. Create the procedure update certificate
IF OBJECT_ID('update_certificate', 'P') IS NOT NULL
    DROP PROCEDURE update_certificate;
GO
CREATE PROCEDURE update_certificate
    @CertificateID integer,
    @CertificateName nvarchar(100),
    @StartDate datetime,
    @EndDate datetime
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the certificate exists
        IF NOT EXISTS (SELECT 1 FROM [Certificate] WHERE CertificateID = @CertificateID)
        BEGIN
            RAISERROR('Certificate does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Update the certificate
        UPDATE [Certificate]
        SET CertificateName = @CertificateName,
            StartDate = @StartDate,
            EndDate = @EndDate
        WHERE CertificateID = @CertificateID;

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Certificate updated successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating certificate.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 55. Create the procedure create education
IF OBJECT_ID('create_education', 'P') IS NOT NULL
    DROP PROCEDURE create_education;
GO
CREATE PROCEDURE create_education
    @Level varchar(20),
    @Major varchar(20),
    @SchoolName varchar(50),
    @UserID integer
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the user exists
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserID = @UserID)
        BEGIN
            RAISERROR('User does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insert a new education record
        INSERT INTO [Education] (Level, Major, SchoolName, UserID)
        VALUES (@Level, @Major, @SchoolName, @UserID);

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Education record created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating education record.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 56. Create the procedure update education
IF OBJECT_ID('update_education', 'P') IS NOT NULL
    DROP PROCEDURE update_education;
GO
CREATE PROCEDURE update_education
    @EducationID integer,
    @Level varchar(20),
    @Major varchar(20),
    @SchoolName varchar(50)
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the education record exists
        IF NOT EXISTS (SELECT 1 FROM [Education] WHERE EducationID = @EducationID)
        BEGIN
            RAISERROR('Education record does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Update the education record
        UPDATE [Education]
        SET Level = @Level,
            Major = @Major,
            SchoolName = @SchoolName
        WHERE EducationID = @EducationID;

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Education record updated successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while updating education record.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 57. Create the procedure create delete course
IF OBJECT_ID('delete_course', 'P') IS NOT NULL
    DROP PROCEDURE delete_course;
GO
CREATE PROCEDURE delete_course
    @CourseID integer
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Check if the course exists
        IF NOT EXISTS (SELECT 1 FROM [Course] WHERE CourseID = @CourseID)
        BEGIN
            RAISERROR( 'Course does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Delete the course
        DELETE FROM [Course]
        WHERE CourseID = @CourseID;

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Course deleted successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while deleting course.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-- 58. Create the procedure create notify
IF OBJECT_ID('create_notify', 'P') IS NOT NULL
    DROP PROCEDURE create_notify;
GO
CREATE PROCEDURE create_notify
    @MessageNotify nvarchar(500),
    @ReceiveUserID integer
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;

        -- Kiểm tra xem người dùng nhận có tồn tại không
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserID = @ReceiveUserID)
        BEGIN
            RAISERROR('Receive user does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Thêm một thông báo mới vào bảng Notify
        INSERT INTO [Notify] (CreatedDate, MessageNotify, StatusNotify, ReceiveUserID)
        VALUES (GETDATE(), @MessageNotify, 'UnSee', @ReceiveUserID);

        -- Commit giao dịch
        COMMIT TRANSACTION;
        PRINT'Notification created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback giao dịch nếu có lỗi xảy ra
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while creating notification.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- 58.1 Create the procedure create seen notify
IF OBJECT_ID('seen_notify', 'P') IS NOT NULL
    DROP PROCEDURE seen_notify;
GO
CREATE PROCEDURE seen_notify
    @NotifyID integer
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;
        -- Kiểm tra xem thông báo có tồn tại không
        IF NOT EXISTS (SELECT 1 FROM [Notify] WHERE NotifyID = @NotifyID)
        BEGIN
            RAISERROR('Notification does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        -- Cập nhật trạng thái của thông báo thành 'Seen'
        UPDATE [Notify]
        SET StatusNotify = 'Seen'
        WHERE NotifyID = @NotifyID;
        -- Commit giao dịch
        COMMIT TRANSACTION;
        PRINT'Notification status updated to Seen.';
    END TRY
    BEGIN CATCH
        -- Rollback giao dịch nếu có lỗi xảy ra
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while updating notification status.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO
-- 58.2 Create the procedure create get all notify
IF OBJECT_ID('get_all_notify', 'P') IS NOT NULL
    DROP PROCEDURE get_all_notify;
GO
CREATE PROCEDURE get_all_notify
    @ReceiveUserID integer
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;
        -- Kiểm tra xem người dùng nhận có tồn tại không
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserID = @ReceiveUserID)
        BEGIN
            RAISERROR('Receive user does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        -- Lấy tất cả thông báo của người dùng nhận
 
        BEGIN
            SELECT * FROM [Notify]
            WHERE ReceiveUserID = @ReceiveUserID;
        END
        -- Commit giao dịch
        COMMIT TRANSACTION;
        PRINT'Get all notification successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback giao dịch nếu có lỗi xảy ra
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        RAISERROR('Error occurred while getting all notification.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


-- 59. Create the procedure create discount
IF OBJECT_ID('create_discount', 'P') IS NOT NULL
    DROP PROCEDURE create_discount;
GO

CREATE PROCEDURE create_discount
    @Code varchar(20),
    @Percentage float,
    @ExpiryDate datetime = NULL,
    @Quantity integer,
    @CourseID integer
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Kiểm tra xem mã giảm giá có bị trùng không
        IF EXISTS (SELECT 1 FROM Discount WHERE Code = @Code)
        BEGIN
            RAISERROR ('Discount code already exists.', 16, 1);
            RETURN;
        END

        BEGIN TRANSACTION;

        -- Tạo ngày hết hạn tự động là 1 tuần kể từ ngày tạo
        DECLARE @ExpiryDates datetime;
        SET @ExpiryDates = DATEADD(WEEK, 1, GETDATE());

        INSERT INTO Discount (Code, Percentage, ExpiryDate, Quantity, CourseID)
        VALUES (@Code, @Percentage, @ExpiryDates, @Quantity, @CourseID);

        DECLARE @NewDiscountID int;
        SET @NewDiscountID = SCOPE_IDENTITY();

        COMMIT TRANSACTION;

        SELECT @NewDiscountID AS DiscountID;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage nvarchar(4000);
        DECLARE @ErrorSeverity int;
        DECLARE @ErrorState int;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO

-- 60. Create the procedure delete discount
IF OBJECT_ID('delete_discount', 'P') IS NOT NULL
    DROP PROCEDURE delete_discount;
GO

CREATE PROCEDURE delete_discount
    @DiscountID INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Kiểm tra xem mã giảm giá có tồn tại không
        IF EXISTS (SELECT 1 FROM Discount WHERE DiscountID = @DiscountID)
        BEGIN
            DELETE FROM Discount
            WHERE DiscountID = @DiscountID;
            RAISERROR('Discount deleted successfully.',16,1);
        END
        ELSE
        BEGIN
            RAISERROR('Discount does not exist.',16,1);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO

-- 61. Create the procedure update discount
IF OBJECT_ID('update_discount', 'P') IS NOT NULL
    DROP PROCEDURE update_discount;
GO

CREATE PROCEDURE update_discount
    @DiscountID INT,
    @Percentage FLOAT,
    @ExpiryDate DATETIME,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Kiểm tra xem ngày hết hạn có lớn hơn ngày hiện tại không
        IF @ExpiryDate <= GETDATE()
        BEGIN
            RAISERROR ('ExpiryDate must be greater than the current date.', 16, 1);
            RETURN;
        END

        -- Kiểm tra xem mã giảm giá có tồn tại không
        IF EXISTS (SELECT 1 FROM Discount WHERE DiscountID = @DiscountID)
        BEGIN
            -- Cập nhật mã giảm giá
            UPDATE Discount
            SET Percentage = @Percentage,
                ExpiryDate = @ExpiryDate,
                Quantity = @Quantity
            WHERE DiscountID = @DiscountID;
            RAISERROR('Discount updated successfully.',16,1);
        END
        ELSE
        BEGIN
            RAISERROR('Discount does not exist.',16,1);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO




-- 64. Create the procedure create tax
IF OBJECT_ID('create_tax', 'P') IS NOT NULL
    DROP PROCEDURE create_tax;
GO

CREATE PROCEDURE create_tax
    @InstructorID integer,
    @TaxPercentage integer,
    @EffectiveDate datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Kiểm tra xem InstructorID có tồn tại không
        IF NOT EXISTS (SELECT 1 FROM Instructor WHERE InstructorID = @InstructorID)
        BEGIN
            RAISERROR('Instructor does not exist.',16,1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        INSERT INTO Tax (EffectiveDate, TaxPercentage, InstructorID)
        VALUES (@EffectiveDate, @TaxPercentage, @InstructorID);

        -- Commit the transaction
        COMMIT TRANSACTION;
        PRINT'Tax report created successfully.';
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if an error occurs
        ROLLBACK TRANSACTION;
        RAISERROR('Error occurred while creating tax report.',16,1);
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO


