-- Trigger checkrole
CREATE TRIGGER trg_Instructor_Insert_Update
ON Instructor
INSTEAD OF INSERT, UPDATE
AS
BEGIN
    BEGIN TRY
        DECLARE @UserID INT;

        -- Lấy UserID từ bản ghi mới chèn hoặc cập nhật
        SELECT @UserID = UserID FROM inserted;

        -- Kiểm tra xem UserID có tồn tại trong bảng Admin hoặc Student không
        IF EXISTS (SELECT 1 FROM Admin WHERE UserID = @UserID)
            OR EXISTS (SELECT 1 FROM Student WHERE UserID = @UserID)
        BEGIN
            -- Nếu tồn tại, không cho phép chèn hoặc cập nhật và trả về lỗi
            RAISERROR ('User cannot be both Instructor and Admin or Student', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        ELSE
        BEGIN
            -- Nếu không tồn tại, thực hiện chèn hoặc cập nhật
            INSERT INTO Instructor (Level, Status, UserID)
            SELECT Level, Status, UserID FROM inserted;
        END
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Gửi thông báo lỗi
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO

CREATE TRIGGER trg_Student_Insert_Update
ON Student
INSTEAD OF INSERT, UPDATE
AS
BEGIN
    BEGIN TRY
        DECLARE @UserID INT;

        -- Lấy UserID từ bản ghi mới chèn hoặc cập nhật
        SELECT @UserID = UserID FROM inserted;

        -- Kiểm tra xem UserID có tồn tại trong bảng Admin hoặc Instructor không
        IF EXISTS (SELECT 1 FROM Admin WHERE UserID = @UserID)
            OR EXISTS (SELECT 1 FROM Instructor WHERE UserID = @UserID)
        BEGIN
            -- Nếu tồn tại, không cho phép chèn hoặc cập nhật và trả về lỗi
            RAISERROR ('User cannot be both Student and Admin or Instructor', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        ELSE
        BEGIN
            -- Nếu không tồn tại, thực hiện chèn hoặc cập nhật
            INSERT INTO Student (SchoolYear, UserID)
            SELECT SchoolYear, UserID FROM inserted;
        END
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Gửi thông báo lỗi
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO
CREATE TRIGGER trg_Admin_Insert_Update
ON Admin
INSTEAD OF INSERT, UPDATE
AS
BEGIN
    BEGIN TRY
        DECLARE @UserID INT;

        -- Lấy UserID từ bản ghi mới chèn hoặc cập nhật
        SELECT @UserID = UserID FROM inserted;

        -- Kiểm tra xem UserID có tồn tại trong bảng Student hoặc Instructor không
        IF EXISTS (SELECT 1 FROM Student WHERE UserID = @UserID)
            OR EXISTS (SELECT 1 FROM Instructor WHERE UserID = @UserID)
        BEGIN
            -- Nếu tồn tại, không cho phép chèn hoặc cập nhật và trả về lỗi
            RAISERROR ('User cannot be both Admin and Student or Instructor', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        ELSE
        BEGIN
            -- Nếu không tồn tại, thực hiện chèn hoặc cập nhật
            INSERT INTO Admin (UserID)
            SELECT UserID FROM inserted;
        END
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Gửi thông báo lỗi
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO


-- Triger lesson check
CREATE TRIGGER trg_Lessons_Integrity
ON Lessons
AFTER INSERT, UPDATE
AS
BEGIN
    BEGIN TRY
        DECLARE @LessonsID INT;

        -- Lấy LessonsID từ bản ghi mới chèn hoặc cập nhật
        SELECT @LessonsID = LessonsID FROM inserted;

        -- Đếm số lần LessonsID xuất hiện trong các bảng LessonTest, LessonVideo, và LessonDocument
        DECLARE @Count INT;
        SELECT @Count = (
            (SELECT COUNT(*) FROM LessonTest WHERE LessonsID = @LessonsID) +
            (SELECT COUNT(*) FROM LessonVideo WHERE LessonsID = @LessonsID) +
            (SELECT COUNT(*) FROM LessonDocument WHERE LessonsID = @LessonsID)
        );

        -- Kiểm tra xem LessonsID có xuất hiện trong nhiều hơn một bảng hay không
        IF @Count > 1
        BEGIN
            -- Nếu tồn tại trong nhiều hơn một bảng, không cho phép chèn hoặc cập nhật và trả về lỗi
            RAISERROR ('Lesson cannot be in multiple types: LessonTest, LessonVideo, or LessonDocument', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Gửi thông báo lỗi
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO

--
CREATE TRIGGER trg_LessonTest_Insert
ON [LessonTest]
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @LessonsID INT;
    SELECT @LessonsID = LessonsID FROM inserted;

    -- Kiểm tra xem LessonsID có tồn tại trong bảng LessonVideo hoặc LessonDocument không
    IF EXISTS (SELECT 1 FROM LessonVideo WHERE LessonsID = @LessonsID)
       OR EXISTS (SELECT 1 FROM LessonDocument WHERE LessonsID = @LessonsID)
    BEGIN
        -- Nếu tồn tại, không cho phép chèn và trả về lỗi
        RAISERROR ('A lesson cannot be in multiple types: Video, Document, or Test', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
    ELSE
    BEGIN
        -- Nếu không tồn tại, thực hiện chèn
        INSERT INTO LessonTest (EnrollmentTime, LessonsID)
        SELECT EnrollmentTime, LessonsID FROM inserted;
    END
END;
GO


CREATE TRIGGER trg_LessonDocument_Insert
ON [LessonDocument]
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @LessonsID INT;
    SELECT @LessonsID = LessonsID FROM inserted;

    -- Kiểm tra xem LessonsID có tồn tại trong bảng LessonVideo hoặc LessonTest không
    IF EXISTS (SELECT 1 FROM LessonVideo WHERE LessonsID = @LessonsID)
       OR EXISTS (SELECT 1 FROM LessonTest WHERE LessonsID = @LessonsID)
    BEGIN
        -- Nếu tồn tại, không cho phép chèn và trả về lỗi
        RAISERROR ('A lesson cannot be in multiple types: Video, Document, or Test', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
    ELSE
    BEGIN
        -- Nếu không tồn tại, thực hiện chèn
        INSERT INTO LessonDocument (LessonsID)
        SELECT LessonsID FROM inserted;
    END
END;
GO

CREATE TRIGGER trg_LessonVideo_Insert
ON [LessonVideo]
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @LessonsID INT;
    SELECT @LessonsID = LessonsID FROM inserted;

    -- Kiểm tra xem LessonsID có tồn tại trong bảng LessonDocument hoặc LessonTest không
    IF EXISTS (SELECT 1 FROM LessonDocument WHERE LessonsID = @LessonsID)
       OR EXISTS (SELECT 1 FROM LessonTest WHERE LessonsID = @LessonsID)
    BEGIN
        -- Nếu tồn tại, không cho phép chèn và trả về lỗi
        RAISERROR ('A lesson cannot be in multiple types: Video, Document, or Test', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
    ELSE
    BEGIN
        -- Nếu không tồn tại, thực hiện chèn
        INSERT INTO LessonVideo (URL, LessonsID)
        SELECT URL, LessonsID FROM inserted;
    END
END;
GO
