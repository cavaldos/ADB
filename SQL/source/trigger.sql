--1. trigger để kiểm tra trùng lặp OrderLesson trong cùng một CourseID
CREATE TRIGGER trg_UniqueOrderLesson
ON Lessons
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra trùng lặp OrderLesson trong cùng một CourseID
    IF EXISTS (
        SELECT 1
        FROM Lessons l
        INNER JOIN Inserted i ON l.CourseID = i.CourseID AND l.OrderLesson = i.OrderLesson AND l.LessonsID <> i.LessonsID
    )
    BEGIN
        -- Nếu có trùng lặp, trả về lỗi
        RAISERROR('OrderLesson must be unique within the same CourseID.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END
GO


-- 2. trigger để kiểm tra xem khóa học đã được thanh toán trong Invoice chưa
CREATE TRIGGER trg_PreventDuplicateCourseInInvoiceDetail
ON InvoiceDetail
BEFORE INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem khóa học đã có trong Invoice đã thanh toán
    IF EXISTS (
        SELECT 1
        FROM InvoiceDetail id
        INNER JOIN Invoice i ON id.InvoiceID = i.InvoiceID
        WHERE id.CourseID IN (SELECT CourseID FROM inserted)
        AND i.InvoiceStatus = 'Paied'
    )
    BEGIN
        RAISERROR('The course has already been paid for in an existing invoice.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- Kiểm tra xem khóa học đã có trong Cart của người dùng
    IF EXISTS (
        SELECT 1
        FROM CartDetail cd
        INNER JOIN Cart c ON cd.CartID = c.CartID
        INNER JOIN Student s ON c.StudentID = s.StudentID
        WHERE cd.CourseID IN (SELECT CourseID FROM inserted)
    )
    BEGIN
        RAISERROR('The course is already in the cart.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END
GO

-- 3. trigger để kiểm tra xem người gửi và người nhận trong Chat có phải là cùng một người không
CREATE TRIGGER trg_PreventSelfMessaging
ON Chat
BEFORE INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra nếu người gửi và người nhận là cùng một người
    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE SendChatID = ReceiveChatID
    )
    BEGIN
        RAISERROR('You cannot send a message to yourself.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END
GO

-- 4. trigger để kiểm tra xem mã giảm giá đã hết hạn chưa
CREATE TRIGGER trg_PreventExpiredDiscount
ON InvoiceDetail
BEFORE INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra nếu mã giảm giá đã hết hạn
    IF EXISTS (
        SELECT 1
        FROM inserted i
        JOIN Discount d ON i.DiscountID = d.DiscountID
        WHERE d.ExpiryDate < GETDATE()
    )
    BEGIN
        RAISERROR('The discount code has expired and cannot be applied.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END
GO
