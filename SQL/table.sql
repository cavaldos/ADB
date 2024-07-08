-- drop DATABASE Course
-- create database Course;


CREATE TABLE [LessonsProcess] (
  [LessonsProcessID] integer PRIMARY KEY IDENTITY(1, 1),
  [Status] nvarchar(255) NOT NULL CHECK ([Status] IN ('NotStarted', 'InProcess', 'Done')),
  [StartTime] datetime,
  [EndTime] datetime,
  [LessonsID] integer,
  [LearnProcess] integer
)
GO

CREATE TABLE [Lessons] (
  [LessonsID] integer PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(255),
  [Duration] integer,
  [ComplexityLevel] nvarchar(255) NOT NULL CHECK ([ComplexityLevel] IN ('Easy', 'Medium', 'Hard')),
  [CreatedTime] datetime,
  [UpdatedTime] datetime,
  [LessonType] nvarchar(255),
  [CourseID] integer,
  [TopicID] integer
)
GO

CREATE TABLE [QuizResults] (
  [QuizResultsID] integer PRIMARY KEY IDENTITY(1, 1),
  [Status] nvarchar(255) NOT NULL CHECK ([Status] IN ('NotStarted', 'InProcess', 'Done')),
  [TimeTaken] integer,
  [UserAnswer] nvarchar(1000),
  [LessonsProcessID] integer
)
GO

CREATE TABLE [Question] (
  [QuestionID] integer PRIMARY KEY IDENTITY(1, 1),
  [QuestionContent] nvarchar(500),
  [Title] varchar(255),
  [QuizResultsID] integer
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
  [LessonTestID] integer PRIMARY KEY IDENTITY(1, 1) ,
  [EnrollmentTime] datetime,
  [LessonsID] integer UNIQUE,
  FOREIGN KEY (LessonsID) REFERENCES [Lessons](LessonsID) ON DELETE CASCADE


)
GO

CREATE TABLE [LessonVideo] (
  [LessonVideoID] integer PRIMARY KEY IDENTITY(1, 1) ,
  [URL] varchar(255),
  [LessonsID] integer UNIQUE 
  FOREIGN KEY (LessonsID) REFERENCES [Lessons](LessonsID) ON DELETE CASCADE

)
GO

CREATE TABLE [LessonDocument] (
  [LessonDocumentID] integer PRIMARY KEY IDENTITY(1, 1) ,
  [LessonsID] integer UNIQUE
  FOREIGN KEY (LessonsID) REFERENCES [Lessons](LessonsID) ON DELETE CASCADE
)
GO

CREATE TABLE [PageDocument] (
  [PageDocumentID] integer PRIMARY KEY IDENTITY(1, 1),
  [Content] nvarchar(500),
  [Page] integer,
  [LessonDocumentID] integer UNIQUE
)
GO

CREATE TABLE [LearnProcess] (
  [LearnProcessID] integer PRIMARY KEY IDENTITY(1, 1),
  [Status] bit,
  [StudentID] integer,
  [CourseID] integer
)
GO
CREATE TABLE [User] (
  [UserID] integer PRIMARY KEY IDENTITY(1, 1),
  [UserName] varchar(20) UNIQUE,
  [Password] varchar(20),
  [Email] varchar(20),
  [FullName] varchar(20),
  [Phone] varchar(20),
  [Address] varchar(50),
  [Role] nvarchar(255) NOT NULL CHECK ([Role] IN ('Student', 'Instructor', 'Admin')),
  [CreatedTime] datetime,
  [UpdateTime] datetime
)
GO

CREATE TABLE [Admin] (
  [AdminID] integer PRIMARY KEY IDENTITY(1, 1),
  [UserID] integer UNIQUE,
  FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
)
GO

CREATE TABLE [Student] (
  [StudentID] integer PRIMARY KEY IDENTITY(1, 1),
  [SchoolYear] varchar(20),
  [UserID] integer UNIQUE,
  FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
)
GO

CREATE TABLE [Instructor] (
  [InstructorID] integer PRIMARY KEY IDENTITY(1, 1),
  [Level] nvarchar(255) NOT NULL CHECK ([Level] IN ('Beginner', 'Intermediate', 'Advanced')),
  [Status] nvarchar(255) NOT NULL CHECK ([Status] IN ('Pending', 'Done')),
  [UserID] integer UNIQUE,
  FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
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
  [CategoryID] integer
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
  [UserUpdate] integer,
  [Version] integer NOT NULL,
  [HistoryMessage] nvarchar(255)
)
GO

CREATE TABLE [Category] (
  [CategoryID] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(20),
  [CategoryDescription] nvarchar(500),
  [ParentCategoryID] integer
)
GO

CREATE TABLE [Advertisement] (
  [AdvertisementID] integer PRIMARY KEY IDENTITY(1, 1),
  [CreatedTime] datetime,
  [Title] nvarchar(100),
  [Description] nvarchar(max),
  [UserID] integer
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

CREATE TABLE [Topic] (
  [TopicID] integer PRIMARY KEY IDENTITY(1, 1),
  [TopicName] varchar(255),
  [CourseID] integer
)
GO

CREATE TABLE [Cart] (
  [CartID] integer PRIMARY KEY IDENTITY(1, 1),
  [CartStatus] nvarchar(255) NOT NULL CHECK ([CartStatus] IN ('Pending', 'Done')),
  [UserID] integer
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

CREATE TABLE [Notifications] (
  [NotificationID] integer PRIMARY KEY IDENTITY(1, 1),
  [CreatedDate] datetime NOT NULL,
  [Message] nvarchar(500),
  [LearnProcessID] integer DEFAULT (null),
  [SendUserID] integer,
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
  [UserID] integer,
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
  [TransferType] nvarchar(255) NOT NULL CHECK ([TransferType] IN ('Deposit', 'Withdrawal')),
  [TransferDescription] nvarchar(500),
  [BankBeneficiaryID] integer,
  [BankOrderingID] integer,
  [UserID] integer
)
GO

CREATE TABLE [BankAccount] (
  [BankAccountID] integer PRIMARY KEY IDENTITY(1, 1),
  [AccountNumber] varchar(20) UNIQUE,
  [AccountHolderName] varchar(20),
  [AccountBalance] float,
  [BankName] varchar(10) UNIQUE,
  [UserID] integer
)
GO

CREATE TABLE [Invoice] (
  [InvoiceID] integer PRIMARY KEY IDENTITY(1, 1),
  [InvoiceDate] datetime,
  [TotalAmount] float,
  [Status] nvarchar(255) NOT NULL CHECK ([Status] IN ('Paied', 'UnPaied')),
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

CREATE TABLE [TaxSetting] (
  [TaxSettingID] integer PRIMARY KEY IDENTITY(1, 1),
  [TaxPercentage] float DEFAULT (0.1),
  [EffectiveDate] datetime,
  [UpdateDate] datetime
)
GO

CREATE TABLE [TaxReport] (
  [TaxReportID] integer PRIMARY KEY IDENTITY(1, 1),
  [CreateDate] datetime,
  [TaxRate] float,
  [TaxCode] varchar(20),
  [TaxSettingID] integer,
  [RevenueID] integer,
  [InstructorID] integer
)
GO

CREATE TABLE [Revenue] (
  [RevenueID] integer PRIMARY KEY IDENTITY(1, 1),
  [InvoiceID] integer,
  [TaxReportID] integer
)
GO

ALTER TABLE [LessonsProcess] ADD FOREIGN KEY ([LessonsID]) REFERENCES [Lessons] ([LessonsID])
GO

ALTER TABLE [LessonsProcess] ADD FOREIGN KEY ([LearnProcess]) REFERENCES [LearnProcess] ([LearnProcessID])
GO

ALTER TABLE [Lessons] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Lessons] ADD FOREIGN KEY ([TopicID]) REFERENCES [Topic] ([TopicID])
GO

ALTER TABLE [QuizResults] ADD FOREIGN KEY ([LessonsProcessID]) REFERENCES [LessonsProcess] ([LessonsProcessID])
GO

ALTER TABLE [Question] ADD FOREIGN KEY ([QuizResultsID]) REFERENCES [QuizResults] ([QuizResultsID])
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

ALTER TABLE [CourseHistory] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [CourseHistory] ADD FOREIGN KEY ([UserUpdate]) REFERENCES [Instructor] ([InstructorID])
GO

ALTER TABLE [Category] ADD FOREIGN KEY ([ParentCategoryID]) REFERENCES [Category] ([CategoryID])
GO

ALTER TABLE [Advertisement] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Discount] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Topic] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Cart] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [CartDetail] ADD FOREIGN KEY ([CartID]) REFERENCES [Cart] ([CartID])
GO

ALTER TABLE [CartDetail] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([StudentID]) REFERENCES [Student] ([StudentID])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [Notifications] ADD FOREIGN KEY ([LearnProcessID]) REFERENCES [LearnProcess] ([LearnProcessID])
GO

ALTER TABLE [Notifications] ADD FOREIGN KEY ([SendUserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [Notifications] ADD FOREIGN KEY ([ReceiveUserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [DiscussionForum] ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID])
GO

ALTER TABLE [ForumMessage] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
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

ALTER TABLE [Transfer] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
GO

ALTER TABLE [BankAccount] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID])
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

ALTER TABLE [TaxReport] ADD FOREIGN KEY ([TaxSettingID]) REFERENCES [TaxSetting] ([TaxSettingID])
GO

ALTER TABLE [TaxReport] ADD FOREIGN KEY ([RevenueID]) REFERENCES [Revenue] ([RevenueID])
GO

ALTER TABLE [TaxReport] ADD FOREIGN KEY ([InstructorID]) REFERENCES [Instructor] ([InstructorID])
GO

ALTER TABLE [Revenue] ADD FOREIGN KEY ([InvoiceID]) REFERENCES [Invoice] ([InvoiceID])
GO

ALTER TABLE [Revenue] ADD FOREIGN KEY ([TaxReportID]) REFERENCES [TaxReport] ([TaxReportID])
GO


--insert course
INSERT INTO [Course] ([Title], [Subtitle], [Description], [Language], [Image], [Price], [Status], [CreateTime], [CategoryID])
VALUES ('Java', 'Java for beginner', 'Java for beginner', 'English', 'java.jpg', 0, 'Free', '2021-01-01', 1);