CREATE TABLE [Lessons] (
  [LessonsID] integer PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(255),
  [Duration] integer,
  [ComplexityLevel] nvarchar(255) NOT NULL CHECK ([ComplexityLevel] IN ('Easy', 'Medium', 'Hard')),
  [CreatedTime] datetime,
  [UpdatedTime] datetime,
  [LessonType] nvarchar(255),
  [Topic] varchar(255),
  [OrderLesson] integer,
  [CourseID] integer
)
GO

CREATE TABLE [Question] (
  [QuestionID] integer PRIMARY KEY IDENTITY(1, 1),
  [QuestionContent] nvarchar(500),
  [Title] varchar(255),
  [LessonTestID] integer
)
GO

CREATE TABLE [Answer] (
  [AnswerID] integer PRIMARY KEY IDENTITY(1, 1),
  [IsCorrect] bit,
  [AnswerText] varchar(255),
  [QuestionID] integer
)
GO

CREATE TABLE [LessonTest] (
  [LessonTestID] integer PRIMARY KEY IDENTITY(1, 1),
  [LessonsID] integer UNIQUE
)
GO

CREATE TABLE [LessonVideo] (
  [LessonVideoID] integer PRIMARY KEY IDENTITY(1, 1),
  [URL] varchar(255),
  [LessonsID] integer UNIQUE
)
GO

CREATE TABLE [LessonDocument] (
  [LessonDocumentID] integer PRIMARY KEY IDENTITY(1, 1),
  [LessonsID] integer UNIQUE
)
GO

CREATE TABLE [PageDocument] (
  [PageDocumentID] integer PRIMARY KEY IDENTITY(1, 1),
  [Content] nvarchar(500),
  [Page] integer,
  [LessonDocumentID] integer
)
GO

CREATE TABLE [LearnProcess] (
  [LearnProcessID] integer PRIMARY KEY IDENTITY(1, 1),
  [StatusProcess] nvarchar(255) NOT NULL CHECK ([StatusProcess] IN ('NotStarted', 'InProcess', 'Done')),
  [LessonsID] integer,
  [StudentID] integer,
  [CourseID] integer
)
GO

CREATE TABLE [User] (
  [UserID] integer PRIMARY KEY IDENTITY(1, 1),
  [UserName] varchar(50) UNIQUE,
  [Password] varchar(255),
  [Email] varchar(255),
  [FullName] varchar(255),
  [Phone] varchar(255),
  [Address] varchar(255),
  [Role] nvarchar(255) NOT NULL CHECK ([Role] IN ('Student', 'Instructor', 'Admin')),
  [CreatedTime] datetime,
  [UpdateTime] datetime
)
GO

CREATE TABLE [Admin] (
  [AdminID] integer PRIMARY KEY IDENTITY(1, 1),
  [UserID] integer UNIQUE
)
GO

CREATE TABLE [Student] (
  [StudentID] integer PRIMARY KEY IDENTITY(1, 1),
  [UserID] integer UNIQUE
)
GO

CREATE TABLE [Instructor] (
  [InstructorID] integer PRIMARY KEY IDENTITY(1, 1),
  [Level] nvarchar(255) NOT NULL CHECK ([Level] IN ('Beginner', 'Intermediate', 'Advanced')),
  [Status] nvarchar(255) NOT NULL CHECK ([Status] IN ('Pending', 'Done')),
  [UserID] integer UNIQUE
)
GO

CREATE TABLE [Education] (
  [EducationID] integer PRIMARY KEY IDENTITY(1, 1),
  [Level] varchar(20),
  [Major] varchar(20),
  [SchoolName] varchar(20),
  [UserID] integer
)
GO

CREATE TABLE [Certificate] (
  [CertificateID] integer PRIMARY KEY IDENTITY(1, 1),
  [CertificateName] nvarchar(100),
  [StartDate] datetime NOT NULL,
  [EndDate] datetime,
  [InstructorID] integer
)
GO

CREATE TABLE [Company] (
  [CompanyID] integer PRIMARY KEY IDENTITY(1, 1),
  [CompanyName] varchar(20),
  [Position] varchar(50),
  [InstructorID] integer
)
GO

CREATE TABLE [Course] (
  [CourseID] integer PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(255),
  [Subtitle] varchar(255),
  [Description] nvarchar(max),
  [Language] varchar(20),
  [Image] varchar(50),
  [Price] float,
  [Status] nvarchar(255) NOT NULL CHECK ([Status] IN ('Hide', 'Free', 'Plus')),
  [CreateTime] datetime,
  [CategoryID] integer,
  [InstructorID] integer
)
GO

CREATE TABLE [CourseHistory] (
  [CourseHistoryID] integer PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(255),
  [Subtitle] varchar(255),
  [Description] nvarchar(max),
  [Language] varchar(20),
  [Image] varchar(50),
  [Price] float,
  [Status] nvarchar(255) NOT NULL CHECK ([Status] IN ('Hide', 'Free', 'Plus')),
  [UpdateTime] datetime,
  [CourseID] integer,
  [Version] integer NOT NULL,
  [HistoryMessage] nvarchar(255)
)
GO

CREATE TABLE [Category] (
  [CategoryID] integer PRIMARY KEY IDENTITY(1, 1),
  [CategoryName] varchar(20) UNIQUE,
  [CategoryDescription] nvarchar(500),
  [ParentCategoryID] integer DEFAULT (null)
)
GO

CREATE TABLE [Advertisement] (
  [AdvertisementID] integer PRIMARY KEY IDENTITY(1, 1),
  [CreatedTime] datetime,
  [Title] nvarchar(100),
  [Description] nvarchar(max),
  [CourseID] integer,
  [InstructorID] integer,
  [Discount] integer
)
GO

CREATE TABLE [Discount] (
  [DiscountID] integer PRIMARY KEY IDENTITY(1, 1),
  [Code] varchar(20) UNIQUE,
  [Percentage] float,
  [ExpiryDate] datetime,
  [Quantity] integer,
  [CourseID] integer
)
GO

CREATE TABLE [Cart] (
  [CartID] integer PRIMARY KEY IDENTITY(1, 1),
  [StudentID] integer
)
GO

CREATE TABLE [CartDetail] (
  [CartDetailID] integer PRIMARY KEY IDENTITY(1, 1),
  [CartID] integer,
  [CourseID] integer
)
GO

CREATE TABLE [Review] (
  [ReviewID] integer PRIMARY KEY IDENTITY(1, 1),
  [Comment] nvarchar(250) NOT NULL,
  [Rating] float NOT NULL,
  [CreatedDate] datetime,
  [StudentID] integer,
  [CourseID] integer
)
GO

CREATE TABLE [Notify] (
  [NotifyID] integer PRIMARY KEY IDENTITY(1, 1),
  [CreatedDate] datetime NOT NULL,
  [MessageNotify] nvarchar(500),
  [StatusNotify] nvarchar(255) NOT NULL CHECK ([StatusNotify] IN ('Seen', 'UnSee')),
  [ReceiveUserID] integer NOT NULL
)
GO

CREATE TABLE [DiscussionForum] (
  [ForumID] integer PRIMARY KEY IDENTITY(1, 1),
  [CreatedDate] datetime,
  [CourseID] integer NOT NULL
)
GO

CREATE TABLE [ForumMessage] (
  [ForumMessageID] integer PRIMARY KEY IDENTITY(1, 1),
  [MessageContent] nvarchar(500),
  [SendTime] datetime,
  [SenderID] integer,
  [DiscussionForumID] integer
)
GO

CREATE TABLE [Chat] (
  [ChatID] integer PRIMARY KEY IDENTITY(1, 1),
  [ChatContent] nvarchar(250),
  [SendTime] datetime,
  [SendChatID] integer NOT NULL,
  [ReceiveChatID] integer NOT NULL
)
GO

CREATE TABLE [Transfer] (
  [TransferID] integer PRIMARY KEY IDENTITY(1, 1),
  [TransactionTime] datetime,
  [Amount] float,
  [TransferDescription] nvarchar(500),
  [BankBeneficiaryID] integer,
  [BankOrderingID] integer,
  [InvoiceID] integer
)
GO

CREATE TABLE [BankAccount] (
  [BankAccountID] integer PRIMARY KEY IDENTITY(1, 1),
  [AccountNumber] varchar(20) UNIQUE,
  [AccountHolderName] varchar(50),
  [AccountBalance] float,
  [BankName] varchar(50),
  [UserID] integer UNIQUE
)
GO

CREATE TABLE [HistoryBanking] (
  [HistoryBankingID] integer PRIMARY KEY IDENTITY(1, 1),
  [Amount] float,
  [TransferContent] nvarchar(255),
  [TransferCode] nvarchar(255) UNIQUE,
  [TransferType] nvarchar(255) NOT NULL CHECK ([TransferType] IN ('Deposit', 'Withdrawal')),
  [AccountBlanceNow] float,
  [CreateTime] datetime,
  [BankAccountID] integer
)
GO

CREATE TABLE [Invoice] (
  [InvoiceID] integer PRIMARY KEY IDENTITY(1, 1),
  [InvoiceDate] datetime,
  [TotalAmount] float,
  [InvoiceStatus] nvarchar(255) NOT NULL CHECK ([InvoiceStatus] IN ('Paied', 'UnPaied')),
  [TransferID] integer DEFAULT (null),
  [StudentID] integer
)
GO

CREATE TABLE [InvoiceDetail] (
  [InvoiceDetailID] integer PRIMARY KEY IDENTITY(1, 1),
  [Price] float,
  [DiscountPrice] float,
  [DiscountID] integer DEFAULT (null),
  [InvoiceID] integer,
  [CourseID] integer
)
GO

CREATE TABLE [Tax] (
  [TaxID] integer PRIMARY KEY IDENTITY(1, 1),
  [TaxCode] nvarchar(25),
  [TaxPercentage] float DEFAULT (10),
  [EffectiveDate] datetime,
  [InstructorID] integer
)
GO

ALTER TABLE [Lessons] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Question] ADD FOREIGN KEY ([LessonTestID]) REFERENCES [LessonTest] ([LessonTestID])
GO

ALTER TABLE [Answer] ADD FOREIGN KEY ([QuestionID]) REFERENCES [Question] ([QuestionID])
GO

ALTER TABLE [LessonTest] ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID])
GO

ALTER TABLE [LessonVideo] ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID])
GO

ALTER TABLE [LessonDocument] ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID])
GO

ALTER TABLE [PageDocument] ADD FOREIGN KEY ([LessonDocumentID]) REFERENCES [LessonDocument] ([LessonDocumentID])
GO

ALTER TABLE [LearnProcess] ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID])
GO

ALTER TABLE [LearnProcess] ADD FOREIGN KEY ([StudentID]) REFERENCES [Student] ([StudentID])
GO

ALTER TABLE [LearnProcess] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Admin] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Student] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Instructor] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Education] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Certificate] ADD FOREIGN KEY ([InstructorID]) REFERENCES [Instructor] ([InstructorID])
GO

ALTER TABLE [Company] ADD FOREIGN KEY ([InstructorID]) REFERENCES [Instructor] ([InstructorID])
GO

ALTER TABLE [Course] ADD FOREIGN KEY ([CategoryID]) REFERENCES [Category] ([CategoryID])
GO

ALTER TABLE [Course] ADD FOREIGN KEY ([InstructorID]) REFERENCES [Instructor] ([InstructorID])
GO

ALTER TABLE [CourseHistory] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Category] ADD FOREIGN KEY ([ParentCategoryID]) REFERENCES [Category] ([CategoryID])
GO

ALTER TABLE [Advertisement] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Advertisement] ADD FOREIGN KEY ([InstructorID]) REFERENCES [Instructor] ([InstructorID])
GO

ALTER TABLE [Advertisement] ADD FOREIGN KEY ([Discount]) REFERENCES [Discount] ([DiscountID])
GO

ALTER TABLE [Discount] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Cart] ADD FOREIGN KEY ([StudentID]) REFERENCES [Student] ([StudentID])
GO

ALTER TABLE [CartDetail] ADD FOREIGN KEY ([CartID]) REFERENCES [Cart] ([CartID])
GO

ALTER TABLE [CartDetail] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([StudentID]) REFERENCES [Student] ([StudentID])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Notify] ADD FOREIGN KEY ([ReceiveUserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [DiscussionForum] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [ForumMessage] ADD FOREIGN KEY ([SenderID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [ForumMessage] ADD FOREIGN KEY ([DiscussionForumID]) REFERENCES [DiscussionForum] ([ForumID])
GO

ALTER TABLE [Chat] ADD FOREIGN KEY ([SendChatID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Chat] ADD FOREIGN KEY ([ReceiveChatID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Transfer] ADD FOREIGN KEY ([BankBeneficiaryID]) REFERENCES [BankAccount] ([BankAccountID])
GO

ALTER TABLE [Transfer] ADD FOREIGN KEY ([BankOrderingID]) REFERENCES [BankAccount] ([BankAccountID])
GO

ALTER TABLE [Transfer] ADD FOREIGN KEY ([InvoiceID]) REFERENCES [Invoice] ([InvoiceID])
GO

ALTER TABLE [BankAccount] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [HistoryBanking] ADD FOREIGN KEY ([BankAccountID]) REFERENCES [BankAccount] ([BankAccountID])
GO

ALTER TABLE [Invoice] ADD FOREIGN KEY ([TransferID]) REFERENCES [Transfer] ([TransferID])
GO

ALTER TABLE [Invoice] ADD FOREIGN KEY ([StudentID]) REFERENCES [Student] ([StudentID])
GO

ALTER TABLE [InvoiceDetail] ADD FOREIGN KEY ([DiscountID]) REFERENCES [Discount] ([DiscountID])
GO

ALTER TABLE [InvoiceDetail] ADD FOREIGN KEY ([InvoiceID]) REFERENCES [Invoice] ([InvoiceID])
GO

ALTER TABLE [InvoiceDetail] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Tax] ADD FOREIGN KEY ([InstructorID]) REFERENCES [Instructor] ([InstructorID])
GO
