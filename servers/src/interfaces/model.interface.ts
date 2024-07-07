export interface LessonsProcess {
  LessonsProcessID: number;
  Status: "NotStarted" | "InProcess" | "Done";
  StartTime: Date | null;
  EndTime: Date | null;
  LessonsID: number;
  LearnProcess: number;
}

export interface Lessons {
  LessonsID: number;
  Title: string;
  Duration: number;
  ComplexityLevel: "Easy" | "Medium" | "Hard";
  CreatedTime: Date;
  UpdatedTime: Date;
  LessonType: string;
  CourseID: number;
  TopicID: number;
}

export interface Question {
  QuestionID: number;
  QuestionContent: string;
  Title: string;
  LessonTestID: number;
}

export interface Answer {
  AnswerID: number;
  IsCorrect: boolean;
  AnswerText: string;
  QuestionID: number;
}

export interface LessonTest {
  LessonTestID: number;
  LessonsID: number;
}

export interface LessonVideo {
  LessonVideoID: number;
  URL: string;
  LessonsID: number;
}

export interface LessonDocument {
  LessonDocumentID: number;
  LessonsID: number;
}

export interface PageDocument {
  PageDocumentID: number;
  Content: string;
  Page: number;
  LessonDocumentID: number;
}

export interface LearnProcess {
  LearnProcessID: number;
  Status: boolean;
  StudentID: number;
  CourseID: number;
}

export interface User {
  UserID: number;
  UserName: string;
  Password: string;
  Email: string;
  FullName: string;
  Phone: string;
  Address: string;
  Role: "Student" | "Instructor" | "Admin";
  CreatedTime: Date;
  UpdateTime: Date;
}

export interface Admin {
  AdminID: number;
  UserID: number;
}

export interface Student {
  StudentID: number;
  SchoolYear: string;
  UserID: number;
}

export interface Instructor {
  InstructorID: number;
  Level: "Beginner" | "Intermediate" | "Advanced";
  Status: "Pending" | "Done";
  UserID: number;
}

export interface Education {
  EducationID: number;
  Level: string;
  Major: string;
  SchoolName: string;
  UserID: number;
}

export interface Certificate {
  CertificateID: number;
  CertificateName: string;
  StartDate: Date;
  EndDate: Date | null;
  InstructorID: number;
}

export interface Company {
  CompanyID: number;
  CompanyName: string;
  Position: string;
  InstructorID: number;
}

export interface Course {
  CourseID: number;
  Title: string;
  Subtitle: string;
  Description: string;
  Language: string;
  Image: string;
  Price: number;
  Status: "Hide" | "Free" | "Plus";
  CreateTime: Date;
  CategoryID: number;
  InstructorID: number;
}

export interface CourseHistory {
  CourseHistoryID: number;
  Title: string;
  Subtitle: string;
  Description: string;
  Language: string;
  Image: string;
  Price: number;
  Status: "Hide" | "Free" | "Plus";
  UpdateTime: Date;
  CourseID: number;
  Version: number;
  HistoryMessage: string;
}

export interface Category {
  CategoryID: number;
  Name: string;
  CategoryDescription: string;
  ParentCategoryID: number;
}

export interface Advertisement {
  AdvertisementID: number;
  CreatedTime: Date;
  Title: string;
  Description: string;
  UserID: number;
}

export interface Discount {
  DiscountID: number;
  Code: string;
  Percentage: number;
  ExpiryDate: Date;
  Quantity: number;
  CourseID: number;
}

export interface Topic {
  TopicID: number;
  TopicName: string;
  CourseID: number;
}

export interface Cart {
  CartID: number;
  CartStatus: "Pending" | "Done";
  UserID: number;
}

export interface CartDetail {
  CartDetailID: number;
  CartID: number;
  CourseID: number;
}

export interface Review {
  ReviewID: number;
  Comment: string;
  Rating: number;
  CreatedDate: Date;
  StudentID: number;
  CourseID: number;
}

export interface Notifications {
  NotificationID: number;
  CreatedDate: Date;
  Message: string;
  LearnProcessID: number | null;
  SendUserID: number;
  ReceiveUserID: number;
}

export interface DiscussionForum {
  ForumID: number;
  CreatedDate: Date;
  CourseID: number;
}

export interface ForumMessage {
  ForumMessageID: number;
  MessageContent: string;
  SendTime: Date;
  UserID: number;
  DiscussionForumID: number;
}

export interface Chat {
  ChatID: number;
  ChatContent: string;
  SendTime: Date;
  SendChatID: number;
  ReceiveChatID: number;
}

export interface Transfer {
  TransferID: number;
  TransactionTime: Date;
  Amount: number;
  TransferType: "Deposit" | "Withdrawal";
  TransferDescription: string;
  BankBeneficiaryID: number;
  BankOrderingID: number;
  UserID: number;
}

export interface BankAccount {
  BankAccountID: number;
  AccountNumber: string;
  AccountHolderName: string;
  AccountBalance: number;
  BankName: string;
  UserID: number;
}

export interface Invoice {
  InvoiceID: number;
  InvoiceDate: Date;
  TotalAmount: number;
  Status: "Paied" | "UnPaied";
  TransferID: number | null;
  StudentID: number;
}

export interface InvoiceDetail {
  InvoiceDetailID: number;
  Price: number;
  DiscountPrice: number;
  DiscountID: number | null;
  InvoiceID: number;
  CourseID: number;
}

export interface TaxSetting {
  TaxSettingID: number;
  TaxPercentage: number;
  EffectiveDate: Date;
  UpdateDate: Date;
}

export interface TaxReport {
  TaxReportID: number;
  CreateDate: Date;
  TaxRate: number;
  TaxCode: string;
  TaxSettingID: number;
  RevenueID: number;
  InstructorID: number;
}

export interface Revenue {
  RevenueID: number;
  InvoiceID: number;
  TaxReportID: number;
}
