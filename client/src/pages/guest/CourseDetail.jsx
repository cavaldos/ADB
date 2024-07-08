import React, { useState } from "react";
import "./CourseDetail.css";
import { ResetTvRounded } from "@mui/icons-material";

const CourseHeader = () => {
  return (
    <>
      <div className="course-header">
        <div className="course-header-content">
          <div className="breadcrumb">
            <span>Kinh doanh</span> &gt; <span>Giao tiếp</span> &gt;{" "}
            <span>Viết bài thương mại</span>
          </div>
          <h1>Powerful Business Writing: How to Write Concisely</h1>
          <p>
            A concise business writing course for punchy, professional and
            powerful writing – at work, at university, on your blog
          </p>
          <div className="rating">
            <span>4,4</span> ★★★★☆ (<a href="xephang">290 xếp hạng</a>) 1.889
            học viên
          </div>
          <div className="author">
            Được tạo bởi <a href="tentacgia">Caroline McDevitt</a>
          </div>
          <div className="update-info">
            Lần cập nhật gần đây nhất 2/2024 &nbsp;|&nbsp; Tiếng Anh
            &nbsp;|&nbsp; Tiếng Anh
          </div>
        </div>
      </div>
    </>
  );
};

const LessonContent = () => {
  return (
    <>
      <div className="p-5 border border-[#ccc] rounded-md">
        <h2 className="font-bold">Nội dung bài học</h2>
        <div className="flex justify-between">
          <ul className="left">
            <li>Write punchier, more concise messages – with confidence.</li>
            <li>
              Transform your writing into powerful, professional written
              communication.
            </li>
            <li>Uncover the secrets to eliminating wordiness.</li>
          </ul>
          <ul className="w-[45%]">
            <li>Craft simple, elegant content that’s easy to understand.</li>
            <li>Learn how to select the most compelling words.</li>
            <li>Download cheat sheets to keep beside your computer.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

const LessonContentDetail = () => {
  return (
    <>
      <div className="course-section-content bg-red-400">
        <div className="lesson">
          <div className="lesson-header">
            <span className="lesson-title">
              Introduction to Concise Business Writing
            </span>
            <span className="lesson-preview">Xem trước</span>
            <span className="lesson-duration">02:16</span>
          </div>
          <ul className="lesson-description">
            <li>Overview of this concise business writing course</li>
            <li>How to get the most out of the course</li>
            <li>A little more about me as a professional writer</li>
          </ul>
        </div>
        <div className="lesson">
          <div className="lesson-header">
            <span className="lesson-title">Course Workbook</span>
            <span className="lesson-preview">Xem trước</span>
            <span className="lesson-duration">00:35</span>
          </div>
        </div>
      </div>
    </>
  );
};

const CourseContentPage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <>
      <div className="pt-8 bg-slate-400">
        <h2 style={{ fontWeight: "bold" }}>Nội dung khóa học</h2>
        <p>5 phần • 14 bài giảng • 1 giờ 10 phút tổng thời lượng</p>
        <LessonContentDetail />
      </div>
    </>
  );
};
const CourseDetail = () => {
  const [showMoreRecommendations, setShowMoreRecommendations] = useState(false);

  const toggleShowMoreRecommendations = () => {
    setShowMoreRecommendations(!showMoreRecommendations);
  };

  return (
    <div className="">
      <CourseHeader />
      <div className="course-content">
        <div className="lesson-description">
          <LessonContent />
          <CourseContentPage />
          {/* Recommendations Section */}
          <div className="mt-8">dsdsfgdfsgdfg</div>
          <div className="frequently-bought-together">
            <h2>Thường xuyên được mua cùng nhau</h2>
            <div className="course-list">
              <div className="course-item">
                <img src="image1_url" alt="Course 1" />
                <div className="course-info">
                  <h3>Powerful Business Writing: How to Write Concisely</h3>
                  <p>Caroline McDevitt</p>
                  <div className="course-rating">
                    <span>4,4 ★★★★★</span> <span>(291)</span>
                  </div>
                </div>
                <div className="course-price">
                  <span className="current-price">đ 249.000</span>
                  <span className="original-price">đ 849.000</span>
                </div>
              </div>
              <div className="plus-icon">+</div>
              <div className="course-item">
                <img src="image2_url" alt="Course 2" />
                <div className="course-info">
                  <h3>Editing Mastery: How To Edit Writing To Perfection</h3>
                  <p>Shani Raja</p>
                  <div className="course-rating">
                    <span>4,7 ★★★★★</span> <span>(6.386)</span>
                    <span className="badge">Bán chạy nhất</span>
                  </div>
                </div>
                <div className="course-price">
                  <span className="current-price">đ 249.000</span>
                  <span className="original-price">đ 1.299.000</span>
                </div>
              </div>
              <div className="plus-icon">+</div>
              <div className="course-item">
                <img src="image3_url" alt="Course 3" />
                <div className="course-info">
                  <h3>Punctuation Mastery</h3>
                  <p>Shani Raja</p>
                  <div className="course-rating">
                    <span>4,4 ★★★★★</span> <span>(6.080)</span>
                    <span className="badge">Bán chạy nhất</span>
                  </div>
                </div>
                <div className="course-price">
                  <span className="current-price">đ 249.000</span>
                  <span className="original-price">đ 399.000</span>
                </div>
              </div>
            </div>
            <div className="total-price">
              <span>Tổng: đ 747.000</span>
              <span className="original-total-price">đ 2.547.000</span>
            </div>
            <button className="add-all-to-cart">
              Thêm tất cả vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="course-price">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="price">đ 849.000</div>
          <button className="add-to-cart">Thêm vào giỏ hàng</button>
          <button className="buy-now">Mua ngay</button>
          <div className="guarantee">Đảm bảo hoàn tiền trong 30 ngày</div>
          <div className="course-includes">
            <h3>Khóa học này bao gồm:</h3>
            <ul>
              <li>1 giờ video theo yêu cầu</li>
              <li>2 tài nguyên có thể tải xuống</li>
              <li>Truy cập trên thiết bị di động và TV</li>
              <li>Quyền truy cập đầy đủ suốt đời</li>
              <li>Giấy chứng nhận hoàn thành</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
