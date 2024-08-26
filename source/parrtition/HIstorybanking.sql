CREATE PARTITION FUNCTION pfCreateTime_HistoryBanking (datetime)
AS RANGE LEFT FOR VALUES (
    '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', 
    '2024-06-01', '2024-07-01', '2024-08-01', '2024-09-01', '2024-10-01', 
    '2024-11-01', '2024-12-01'
);
CREATE PARTITION SCHEME psCreateTime_HistoryBanking
AS PARTITION pfCreateTime_HistoryBanking
TO ([PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], 
    [PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], 
    [PRIMARY], [PRIMARY], [PRIMARY]);
CREATE TABLE HistoryBanking (
    HistoryBankingID integer PRIMARY KEY IDENTITY(1, 1),
    Amount float,
    TransferContent nvarchar(255),
    TransferCode nvarchar(255) UNIQUE,
    TransferType nvarchar(255) NOT NULL CHECK ([TransferType] IN ('Deposit', 'Withdrawal')),
    AccountBalanceNow float,
    CreateTime datetime,
    BankAccountID integer
) ON psCreateTime_HistoryBanking(CreateTime);


ALTER TABLE HistoryBanking
ADD FOREIGN KEY ([BankAccountID]) REFERENCES [BankAccount] ([BankAccountID]);


-- Partition Function sẽ định nghĩa các phạm vi cho từng phân vùng (partition) dựa trên cột CreateTime. Mỗi giá trị trong Partition Function sẽ đại diện cho tháng đầu tiên của một tháng cụ thể.
-- Vì số lượng giao dịch sẽ được chia theo tháng, nên việc chia theo tháng sẽ giúp cho việc tìm kiếm và thống kê dễ dàng hơn.