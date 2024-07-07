export interface VW_LessonsProcess {
  LessonsProcessID: number;
  Status: "NotStarted" | "InProcess" | "Done";
  StartTime: Date | null;
  EndTime: Date | null;
  LessonsID: number;
  LearnProcess: number;
}

export interface VW_LessonsList {
  LessonsID: number;
  Title: string;
  Duration: number;
  ComplexityLevel: "Easy" | "Medium" | "Hard";
  CreatedTime: Date;
  UpdatedTime: Date;
  LessonType: string;
  CourseID: number;
  TopicID: number;
  LesssonList : VW_LessonsProcess[];
}

export interface VW_Question {
  QuestionID: number;
  QuestionContent: string;
  Title: string;
  LessonTestID: number;
}

export interface VW_Answer {
  AnswerID: number;
  IsCorrect: boolean;
  AnswerText: string;
  QuestionID: number;
}

export interface VW_LessonTest {
  LessonTestID: number;
  LessonsID: number;
}

export interface VW_LessonVideo {
  LessonVideoID: number;
  URL: string;
  LessonsID: number;
}

export interface VW_LessonDocument {
  LessonDocumentID: number;
  LessonsID: number;
}

export interface VW_PageDocument {
  PageDocumentID: number;
  Content: string;
  Page: number;
  LessonDocumentID: number;
}

export interface VW_LearnProcess {
  LearnProcessID: number;
  Status: boolean;
  StudentID: number;
  CourseID: number;
}

export interface VW_User {
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

export interface VW_Admin {
  AdminID: number;
  UserID: number;
}

export interface VW_Student {
  StudentID: number;
  SchoolYear: string;
  UserID: number;
}

export interface VW_Instructor {
  InstructorID: number;
  Level: "Beginner" | "Intermediate" | "Advanced";
  Status: "Pending" | "Done";
  UserID: number;
}

export interface VW_Education {
  EducationID: number;
  Level: string;
  Major: string;
  SchoolName: string;
  UserID: number;
}

export interface VW_Certificate {
  CertificateID: number;
  CertificateName: string;
  StartDate: Date;
  EndDate: Date | null;
  InstructorID: number;
}

export interface VW_Company {
  CompanyID: number;
  CompanyName: string;
  Position: string;
  InstructorID: number;
}

export interface VW_Course {
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

export interface VW_CourseHistory {
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

export interface VW_Category {
  CategoryID: number;
  Name: string;
  CategoryDescription: string;
  ParentCategoryID: number;
}

export interface VW_Advertisement {
  AdvertisementID: number;
  CreatedTime: Date;
  Title: string;
  Description: string;
  UserID: number;
}

export interface VW_Discount {
  DiscountID: number;
  Code: string;
  Percentage: number;
  ExpiryDate: Date;
  Quantity: number;
  CourseID: number;
}

export interface VW_Topic {
  TopicID: number;
  TopicName: string;
  CourseID: number;
}

export interface VW_Cart {
  CartID: number;
  CartStatus: "Pending" | "Done";
  UserID: number;
}

export interface VW_CartDetail {
  CartDetailID: number;
  CartID: number;
  CourseID: number;
}

export interface VW_Review {
  ReviewID: number;
  Comment: string;
  Rating: number;
  CreatedDate: Date;
  StudentID: number;
  CourseID: number;
}

export interface VW_Notifications {
  NotificationID: number;
  CreatedDate: Date;
  Message: string;
  LearnProcessID: number | null;
  SendUserID: number;
  ReceiveUserID: number;
}

export interface VW_DiscussionForum {
  ForumID: number;
  CreatedDate: Date;
  CourseID: number;
}

export interface VW_ForumMessage {
  ForumMessageID: number;
  MessageContent: string;
  SendTime: Date;
  UserID: number;
  DiscussionForumID: number;
}

export interface VW_Chat {
  ChatID: number;
  ChatContent: string;
  SendTime: Date;
  SendChatID: number;
  ReceiveChatID: number;
}

export interface VW_Transfer {
  TransferID: number;
  TransactionTime: Date;
  Amount: number;
  TransferType: "Deposit" | "Withdrawal";
  TransferDescription: string;
  BankBeneficiaryID: number;
  BankOrderingID: number;
  UserID: number;
}

export interface VW_BankAccount {
  BankAccountID: number;
  AccountNumber: string;
  AccountHolderName: string;
  AccountBalance: number;
  BankName: string;
  UserID: number;
}

export interface VW_Invoice {
  InvoiceID: number;
  InvoiceDate: Date;
  TotalAmount: number;
  Status: "Paied" | "UnPaied";
  TransferID: number | null;
  StudentID: number;
}

export interface VW_InvoiceDetail {
  InvoiceDetailID: number;
  Price: number;
  DiscountPrice: number;
  DiscountID: number | null;
  InvoiceID: number;
  CourseID: number;
}

export interface VW_TaxSetting {
  TaxSettingID: number;
  TaxPercentage: number;
  EffectiveDate: Date;
  UpdateDate: Date;
}

export interface VW_TaxReport {
  TaxReportID: number;
  CreateDate: Date;
  TaxRate: number;
  TaxCode: string;
  TaxSettingID: number;
  RevenueID: number;
  InstructorID: number;
}

export interface VW_Revenue {
  RevenueID: number;
  InvoiceID: number;
  TaxReportID: number;
}
