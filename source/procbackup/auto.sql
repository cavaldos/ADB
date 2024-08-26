CREATE PROCEDURE auto_complete_search 
    @SearchTerm NVARCHAR(255) 
AS 
BEGIN 
    -- Normalize the search term by removing spaces 
    SET @SearchTerm = REPLACE(@SearchTerm, ' ', ''); 
 
    -- Query to find phrases containing the search term 
    SELECT DISTINCT SUBSTRING(Title, PATINDEX('%' + @SearchTerm + '%', REPLACE(Title, ' ', '')), LEN(Title)) AS Phrase 
    FROM Course 
    WHERE REPLACE(Title, ' ', '') LIKE '%' + @SearchTerm + '%' 
    UNION 
    SELECT DISTINCT SUBSTRING(Subtitle, PATINDEX('%' + @SearchTerm + '%', REPLACE(Subtitle, ' ', '')), LEN(Subtitle)) AS Phrase 
    FROM Course 
    WHERE REPLACE(Subtitle, ' ', '') LIKE '%' + @SearchTerm + '%' 
    UNION 
    SELECT DISTINCT SUBSTRING(Description, PATINDEX('%' + @SearchTerm + '%', REPLACE(Description, ' ', '')), LEN(Description)) AS Phrase 
    FROM Course 
    WHERE REPLACE(Description, ' ', '') LIKE '%' + @SearchTerm + '%' 
    UNION 
    SELECT DISTINCT SUBSTRING(Language, PATINDEX('%' + @SearchTerm + '%', REPLACE(Language, ' ', '')), LEN(Language)) AS Phrase 
    FROM Course 
    WHERE REPLACE(Language, ' ', '') LIKE '%' + @SearchTerm + '%' 
    UNION 
    SELECT DISTINCT SUBSTRING(Image, PATINDEX('%' + @SearchTerm + '%', REPLACE(Image, ' ', '')), LEN(Image)) AS Phrase 
    FROM Course 
    WHERE REPLACE(Image, ' ', '') LIKE '%' + @SearchTerm + '%' 
    UNION 
    SELECT DISTINCT SUBSTRING(Status, PATINDEX('%' + @SearchTerm + '%', REPLACE(Status, ' ', '')), LEN(Status)) AS Phrase 
    FROM Course 
    WHERE REPLACE(Status, ' ', '') LIKE '%' + @SearchTerm + '%'; 
END; 
