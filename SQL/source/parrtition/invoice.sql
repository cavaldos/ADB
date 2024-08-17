

CREATE PARTITION FUNCTION pfInvoiceDate (datetime)
AS RANGE LEFT FOR VALUES (
    '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', 
    '2024-06-01', '2024-07-01', '2024-08-01', '2024-09-01', '2024-10-01', 
    '2024-11-01', '2024-12-01'
);


CREATE PARTITION SCHEME psInvoiceDate
AS PARTITION pfInvoiceDate
TO ([PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], 
    [PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], 
    [PRIMARY], [PRIMARY], [PRIMARY]);


CREATE TABLE Invoices (
    InvoiceID integer PRIMARY KEY IDENTITY(1, 1),
    InvoiceDate datetime,
    TotalAmount float,
    InvoiceStatus nvarchar(255) NOT NULL CHECK ([InvoiceStatus] IN ('Paid', 'Unpaid')),
    TransferID integer DEFAULT (null),
    StudentID integer
) ON psInvoiceDate(InvoiceDate);

ALTER TABLE Invoice
ADD FOREIGN KEY ([TransferID]) REFERENCES [Transfer] ([TransferID]);

ALTER TABLE Invoice
ADD FOREIGN KEY ([StudentID]) REFERENCES [Student] ([StudentID]);

-- sử dụng Partition Function để chia các hoá đơn theo tháng
-- Vì các hoá đơn sẽ được tạo hàng ngày, và được dùng để thống kê doanh thu hàng tháng, nên sẽ được chia theo tháng