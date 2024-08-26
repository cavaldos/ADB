CREATE TABLE SearchLog (
    SearchID INT PRIMARY KEY IDENTITY(1,1),
    SearchString NVARCHAR(255),
    SearchCount INT,
    SearchTime DATETIME
);
GO

IF OBJECT_ID('log_search', 'P') IS NOT NULL
    DROP PROCEDURE log_search;
GO

CREATE PROCEDURE log_search
    @SearchString NVARCHAR(255)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM SearchLog WHERE SearchString = @SearchString)
    BEGIN
        -- Cập nhật số lượng tìm kiếm và thời gian tìm kiếm mới nhất
        UPDATE SearchLog
        SET 
            SearchCount = SearchCount + 1,
            SearchTime = GETDATE()
        WHERE 
            SearchString = @SearchString;
    END
    ELSE
    BEGIN
        -- Thêm bản ghi mới nếu chuỗi tìm kiếm chưa tồn tại
        INSERT INTO SearchLog (SearchString, SearchCount, SearchTime)
        VALUES (@SearchString, 1, GETDATE());
    END
END;
GO

EXEC log_search 'Pytff sadsaf  sadsfasfhdon';
EXEC log_search 'jaasdfdsvv  sf d f asdfva';
EXEC log_search 'scas asdafsdsfddafla';
EXEC log_search 'fsa';
EXEC log_search 'ass adsdafsfd';
EXEC log_search 'Pyts asasadfafssf dafhasfon';
EXEC log_search 'Pyts asassadfsdfasfasf dafhon';
EXEC log_search 'Pyts asassdsadfafsadff dasdfffhon';

IF OBJECT_ID('get_top_searches', 'P') IS NOT NULL
    DROP PROCEDURE get_top_searches;
GO

CREATE PROCEDURE get_top_searches
    @SearchString NVARCHAR(255)
AS
BEGIN
    -- Loại bỏ khoảng trống trong chuỗi tìm kiếm
    DECLARE @NormalizedSearchString NVARCHAR(255);
    SET @NormalizedSearchString = REPLACE(@SearchString, ' ', '');

    -- Tìm kiếm và trả về 5 kết quả có số lượng tìm kiếm nhiều nhất
    SELECT 
        SearchString, 
        SearchCount, 
        SearchTime
    FROM 
        SearchLog
    WHERE 
        REPLACE(SearchString, ' ', '') LIKE '%' + @NormalizedSearchString + '%'
    ORDER BY 
        SearchCount DESC, 
        SearchTime DESC;
END;
GO


EXEC get_top_searches "p y "


-- Check if the procedure already exists, and drop it if it does
IF OBJECT_ID('reset_log_search', 'P') IS NOT NULL
    DROP PROCEDURE reset_log_search;
GO

-- Create the reset_log_search procedure
CREATE PROCEDURE reset_log_search
AS
BEGIN
    -- Reset the SearchCount to 0 and SearchTime to the current date
    UPDATE SearchLog
    SET 
        SearchCount = 0,
        SearchTime = GETDATE();
END;
GO






-- Check if the procedure already exists, and drop it if it does
IF OBJECT_ID('sudo_reset_log_search', 'P') IS NOT NULL
    DROP PROCEDURE sudo_reset_log_search;
GO

-- Create the sudo_reset_log_search procedure
CREATE PROCEDURE sudo_reset_log_search
AS
BEGIN
    -- Delete all records from the SearchLog table
    DELETE FROM SearchLog;
END;
GO

-- Execute the sudo_reset_log_search procedure
EXEC sudo_reset_log_search;
