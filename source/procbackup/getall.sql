
 
CREATE PROCEDURE get_all_course 
    @Offset INT, 
    @PageSize INT 
AS 
BEGIN 
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
        Category c ON co.CategoryID = c.CategoryID; 
END; 