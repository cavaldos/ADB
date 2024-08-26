
CREATE PROCEDURE search_course 
    @SearchString NVARCHAR(255), 
    @Offset INT, 
    @PageSize INT 
AS 
BEGIN 
    -- Normalize the search string by removing all spaces 
    DECLARE @NormalizedSearchString NVARCHAR(255); 
    SET @NormalizedSearchString = REPLACE(@SearchString, ' ', ''); 
 
    -- Query to get paginated results 
    SELECT  
        [CourseID],  
        [Title],  
        [Description],  
        [Language],  
        co.[Status],  
        [Image],  
        [Price],  
        CreateTime,  
        c.CategoryName,  
        u.FullName 
    FROM  
        [Course] co 
    JOIN  
        [Instructor] i ON co.InstructorID = i.InstructorID 
    JOIN  
        [User] u ON u.UserID = i.UserID 
    JOIN  
        Category c ON co.CategoryID = c.CategoryID 
    WHERE  
        REPLACE(co.Title, ' ', '') LIKE '%' + @NormalizedSearchString + '%' 
        OR REPLACE(co.Description, ' ', '') LIKE '%' + @NormalizedSearchString + '%' 
        OR REPLACE(c.CategoryName, ' ', '') LIKE '%' + @NormalizedSearchString + '%' 
        OR REPLACE(u.FullName, ' ', '') LIKE '%' + @NormalizedSearchString + '%' 
    ORDER BY  
        co.CreateTime DESC 
    OFFSET  
        @Offset ROWS 
    FETCH NEXT  
        @PageSize ROWS ONLY; 
 
    -- Query to get total count 
    SELECT  
        COUNT(*) AS TotalCount 
    FROM  
        [Course] co 
    JOIN  
        [Instructor] i ON co.InstructorID = i.InstructorID 
    JOIN  
        [User] u ON u.UserID = i.UserID 
    JOIN  
        Category c ON co.CategoryID = c.CategoryID 
    WHERE  
        REPLACE(co.Title, ' ', '') LIKE '%' + @NormalizedSearchString + '%' 
        OR REPLACE(co.Description, ' ', '') LIKE '%' + @NormalizedSearchString + '%' 
        OR REPLACE(c.CategoryName, ' ', '') LIKE '%' + @NormalizedSearchString + '%' 
        OR REPLACE(u.FullName, ' ', '') LIKE '%' + @NormalizedSearchString + '%'; 
END; 
-- EXEC search_course 'Python', 6, 3; 