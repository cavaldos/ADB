-- Tạo chỉ mục cho bảng Invoice
CREATE INDEX idx_invoice_invoiceid_status ON Invoice(InvoiceID, InvoiceStatus);
CREATE INDEX idx_invoice_studentid_status ON Invoice(StudentID, InvoiceStatus);

-- Tạo chỉ mục cho bảng BankAccount
CREATE INDEX idx_bankaccount_userid ON BankAccount(UserID);

-- Tạo chỉ mục cho bảng InvoiceDetail
CREATE INDEX idx_invoicedetail_invoiceid_courseid ON InvoiceDetail(InvoiceID, CourseID);

-- Tạo chỉ mục cho bảng Course
CREATE INDEX idx_course_courseid ON Course(CourseID);

-- Tạo chỉ mục cho bảng User
CREATE INDEX idx_user_username_email ON [User](UserName, Email);

-- Tạo chỉ mục cho bảng Student
CREATE INDEX idx_student_studentid ON Student(StudentID);

-- Tạo chỉ mục cho bảng Lessons
CREATE INDEX idx_lessons_courseid ON Lessons(CourseID);

-- Tạo chỉ mục cho bảng LearnProcess
CREATE INDEX idx_learnprocess_learnprocessid ON LearnProcess(LearnProcessID);

-- Tạo chỉ mục cho bảng Cart
CREATE INDEX idx_cart_studentid ON Cart(StudentID);

-- Tạo chỉ mục cho bảng CartDetail
CREATE INDEX idx_cartdetail_cartid_courseid ON CartDetail(CartID, CourseID);