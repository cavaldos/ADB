SELECT 
    InvoiceID, 
    TotalAmount,
    (SELECT SUM(TotalAmount) FROM Invoice) AS TotalRevenue
FROM Invoice;


SELECT 
    FORMAT(InvoiceDate, 'yyyy-MM') AS MonthYear, 
    SUM(TotalAmount) AS MonthlyRevenue
FROM 
    Invoice
GROUP BY 
    FORMAT(InvoiceDate, 'yyyy-MM')
ORDER BY 
    MonthYear;



SELECT 
    DATEPART(YEAR, InvoiceDate) AS Year, 
    DATEPART(MONTH, InvoiceDate) AS Month, 
    SUM(TotalAmount) AS MonthlyRevenue
FROM 
    Invoice
GROUP BY 
    DATEPART(YEAR, InvoiceDate), 
    DATEPART(MONTH, InvoiceDate)
ORDER BY 
    Year, Month;


SELECT 
    CAST(InvoiceDate AS DATE) AS InvoiceDate, 
    SUM(TotalAmount) AS DailyRevenue
FROM 
    Invoice
GROUP BY 
    CAST(InvoiceDate AS DATE)
ORDER BY 
    InvoiceDate;
