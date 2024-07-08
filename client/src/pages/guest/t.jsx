import React, { useState } from "react";
import "./CourseDetail.css";

const CourseDetail = () => {
  const [openSection, setOpenSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showMoreRecommendations, setShowMoreRecommendations] = useState(false);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleShowMoreRecommendations = () => {
    setShowMoreRecommendations(!showMoreRecommendations);
  };

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

export default CourseDetail;
