
Enum LessonType {
  Test
  Video
  Document
}
Enum ProcessStatus {
  NotStarted
  InProcess
  Done
}
Enum ComplexityLevel {
  Easy
  Medium
  Hard
}
Enum Role {
  Student
  Instructor
  Admin
}
Enum TransferType{
  Deposit // tien vao
  Withdrawal // tien ra
}
Enum InstructorLevel{
  Beginner
  Intermediate
  Advanced
}
Enum ConfirmStatus{
  Pending
  Done
}
Enum CourseStatus{
  Hide
  Free
  Plus
}
Enum AdvertisementStatus{
  On
  Off
}




Table Lessons {
  LessonsID integer [primary key , increment]
  Title varchar(255)
  Duration integer
  ComplexityLevel ComplexityLevel
  CreatedTime datetime
  UpdatedTime datetime
  LessonType varchar
  Topic varchar(255)
  OrderLesson integer
  CourseID integer [ref:> Course.CourseID]
}

Table Question {
  QuestionID integer [primary key , increment]
  QuestionContent nvarchar(500)
  Title varchar(255)
  LessonTestID integer [ref: > LessonTest.LessonTestID]
}

Table Answer {
  AnswerID integer [primary key , increment]
  IsCorrect bit
  AnswerText varchar(255)
  QuestionID integer [ref: > Question.QuestionID]
}

Table LessonTest {
  LessonTestID integer [primary key , increment]
  LessonsID integer [ref: > Lessons.LessonsID, unique]
}

Table LessonVideo {
  LessonVideoID integer [primary key , increment]
  URL varchar(255)
  LessonsID integer [ref: > Lessons.LessonsID, unique]
}

Table LessonDocument {
  LessonDocumentID integer [primary key , increment]
  LessonsID integer [ref: > Lessons.LessonsID, unique]
}

Table PageDocument {
  PageDocumentID integer [primary key , increment]
  Content nvarchar(500)
  Page integer 
  LessonDocumentID integer [ref: > LessonDocument.LessonDocumentID]
}

Table LearnProcess {
  LearnProcessID integer [primary key , increment]
  StatusProcess ProcessStatus
  LessonsID integer [ref:> Lessons.LessonsID]
  StudentID integer [ref: > Student.StudentID]
  CourseID integer [ref: > Course.CourseID]
}

Table User {
  UserID integer [primary key , increment]
  UserName varchar(50) [unique]
  Password varchar(255)
  Email varchar(255)
  FullName varchar(255)
  Phone varchar(255)
  Address varchar(255)
  Role Role
  CreatedTime datetime
  UpdateTime datetime
}
Table Admin {
  AdminID integer [primary key , increment]
  UserID integer [ref: > User.UserID, unique]
}
Table Student {
  StudentID integer [primary key , increment]
  UserID integer [ref: > User.UserID, unique]
}
Table Instructor {
  InstructorID integer [primary key , increment]
  Level InstructorLevel 
  Status ConfirmStatus
  UserID integer [ref: > User.UserID, unique]
}
Table Education {
  EducationID integer [primary key , increment]
  Level varchar(20)
  Major varchar(20)
  SchoolName varchar(20)
  UserID integer [ref: > User.UserID]
}
Table Certificate {
  CertificateID integer [primary key , increment]
  CertificateName nvarchar(100)
  StartDate datetime [not null]
  EndDate datetime 
  InstructorID integer [ref: > Instructor.InstructorID]
}

Table Company {
  CompanyID integer [primary key , increment]
  CompanyName varchar(20)
  Position varchar(50) [null]
  InstructorID integer [ref: > Instructor.InstructorID]

}
//
Table Course {
  CourseID integer [primary key , increment]
  Title varchar(255)
  Subtitle varchar(255)
  Description nvarchar(max)
  Language varchar(20)
  Image varchar(50)
  Price float
  Status CourseStatus
  CreateTime datetime
  CategoryID integer [ref: > Category.CategoryID]
  InstructorID integer [ref: > Instructor.InstructorID]
}


Table CourseHistory {
  CourseHistoryID integer [primary key , increment]
  Title varchar(255)
  Subtitle varchar(255)
  Description nvarchar(max)
  Language varchar(20)
  Image varchar(50)
  Price float
  Status CourseStatus
//
  UpdateTime datetime
  CourseID integer [ref:> Course.CourseID]
  Version integer [not null]
  HistoryMessage nvarchar(255)
}
Table Category {
  CategoryID integer [primary key , increment] 
  CategoryName varchar(20) [unique]
  CategoryDescription nvarchar(500)
  ParentCategoryID integer [ref: > Category.CategoryID, default: null]
}
Table Advertisement {
  AdvertisementID integer [primary key , increment]
  CreatedTime datetime
  Title nvarchar(100)
  Description nvarchar(max)
  CourseID integer [ref: > Course.CourseID]
  InstructorID integer [ref:> Instructor.InstructorID]
  Discount integer [ref:> Discount.DiscountID]
}

Table Discount {
  DiscountID integer [primary key , increment]
  Code varchar(20) [unique]
  Percentage float
  ExpiryDate datetime
  Quantity integer
  CourseID integer [ref: > Course.CourseID]
}

Table Cart {
  CartID integer [primary key , increment]
  StudentID integer [ref: > Student.StudentID]
}
Table CartDetail {
  CartDetailID integer [primary key , increment]
  CartID integer [ref :> Cart.CartID]
  CourseID integer [ref: > Course.CourseID]
}
Table Review {
  ReviewID integer [primary key , increment]
  Comment nvarchar(250) [not null]
  Rating float [not null]
  CreatedDate datetime
  StudentID integer [ref: > Student.StudentID]
  CourseID integer [ref: > Course.CourseID]
}
Enum StatusNotify{
  Seen
  UnSee
}
Table Notify {
  NotifyID integer [primary key , increment]
  CreatedDate datetime [not null]
  MessageNotify nvarchar(500) 
  StatusNotify StatusNotify 
  ReceiveUserID integer [ref: > User.UserID, not null]
}

Table DiscussionForum {
  ForumID integer [primary key , increment]
  CreatedDate datetime
  CourseID integer [ref: > Course.CourseID, not null]
}

Table ForumMessage {
  ForumMessageID integer [primary key , increment]
  MessageContent nvarchar(500)
  SendTime datetime
  SenderID integer [ref :> User.UserID]
  DiscussionForumID integer [ref: > DiscussionForum.ForumID]
}
Table Chat {
  ChatID integer [primary key , increment]
  ChatContent nvarchar(250)
  SendTime datetime // trigger id nguoi gui va id nguoi nhan khong duoc giong nhau
  SendChatID integer [ref: > User.UserID , not null]
  ReceiveChatID integer [ref: > User.UserID, not null]
}
//
Table Transfer {
  TransferID integer [primary key , increment]
  TransactionTime datetime
  Amount float
  TransferDescription nvarchar(500)
  BankBeneficiaryID integer [ref:> BankAccount.BankAccountID]
  BankOrderingID integer [ref:> BankAccount.BankAccountID]
  InvoiceID integer [ref:> Invoice.InvoiceID] 
}


Table BankAccount {
  BankAccountID integer [primary key, increment]
  AccountNumber varchar(20) [unique]
  AccountHolderName varchar(50)
  AccountBalance float
  BankName varchar(50)
  UserID integer [ref: > User.UserID, unique]
}
Table HistoryBanking{
  HistoryBankingID integer [primary key, increment]
  Amount float
  TransferContent nvarchar(255)
  TransferCode nvarchar(255) [unique]
  TransferType TransferType
  AccountBlanceNow float
  CreateTime datetime
  BankAccountID integer [ref:> BankAccount.BankAccountID]
}

Enum InvoiceStatus{
  Paied
  UnPaied
}
Table Invoice {
  InvoiceID integer [primary key , increment]
  InvoiceDate datetime
  TotalAmount float
  InvoiceStatus InvoiceStatus //nếu chưa thanh toán sẽ không có giao dich
  TransferID integer [ref :> Transfer.TransferID, default: null]
  StudentID integer [ref: > Student.StudentID]
}
Table InvoiceDetail {
  InvoiceDetailID integer [primary key , increment]
  Price float
  DiscountPrice float 
  DiscountID integer [ref:> Discount.DiscountID, default: null]
  InvoiceID integer [ref: > Invoice.InvoiceID]
  CourseID integer [ref: > Course.CourseID]
}

Table Tax {
  TaxID integer [primary key , increment]
  TaxCode nvarchar(25)
  TaxPercentage float [default: 10]
  EffectiveDate datetime
  InstructorID integer [ref: > Instructor.InstructorID]
}



