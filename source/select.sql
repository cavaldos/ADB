-- signin procedure

IF OBJECT_ID('check_user_login', 'P') IS NOT NULL
    DROP PROCEDURE check_user_login;
GO
CREATE PROCEDURE check_user_login
    @UserName VARCHAR(50),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserID INT;
    DECLARE @Role NVARCHAR(255);

    -- Bắt đầu giao dịch
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Kiểm tra tên người dùng và mật khẩu trong cơ sở dữ liệu
        SELECT 
            @UserID = [UserID],
            @Role = [Role]
        FROM 
            [User]
        WHERE 
            [UserName] = @UserName 
            AND [Password] = @Password;

        -- Nếu không tìm thấy bản ghi khớp, đặt các giá trị đầu ra thành NULL
        IF @UserID IS NULL OR @Role IS NULL
        BEGIN
            SET @UserID = NULL;
            SET @Role = NULL;
        END

        -- Trả về kết quả
        SELECT @UserID AS UserID, @Role AS Role;

        -- Commit giao dịch nếu không có lỗi
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback giao dịch nếu có lỗi
        ROLLBACK TRANSACTION;

        -- Tùy chọn: Trả về thông tin lỗi nếu cần thiết
        THROW;
    END CATCH
END
GO

