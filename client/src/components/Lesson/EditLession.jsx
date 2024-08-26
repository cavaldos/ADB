import React, { useState, useEffect } from "react";
import { Tag } from "antd";
import { List, Card } from "antd";
import { useParams } from "react-router-dom";
import EditLessonDocument from "./edit/EditLessonDoc";
import EditLessonVideo from "./edit/EditLessonVideo";
import EditLessonTest from "./edit/EditLessonTest";
import { useSelector } from "react-redux";
import LessonService from "../../services/Lesson.Service";

function EditLession() {
  const { lessonID } = useParams();

  const [type, setType] = useState("");
  const [lesson, setLesson] = useState({});
  const [detail, setDetail] = useState([]);
  const resetState = useSelector((state) => state.resetState.state);
  useEffect(() => {
    LessonService.getLessonDetail(lessonID).then((res) => {
      if (res.status === 200) {
        setLesson(res.data.lesson);
        setType(res.data.type);
        setDetail(res.data.detail);
      }
    });
  }, [lessonID, resetState]);
  return (
    <div className=" w-full h-full">
      {type === "Video" ? (
        <EditLessonVideo
          LessonsID={lesson.LessonsID}
          Title={lesson.Title}
          Duration={lesson.Duration}
          ComplexityLevel={lesson.ComplexityLevel}
          CreatedTime={lesson.CreatedTime}
          UpdatedTime={lesson.UpdatedTime}
          LessonType={lesson.LessonType}
          Topic={lesson.Topic}
          OrderLessons={lesson.OrderLessons}
          LessonVideoID={lesson.LessonVideoID}
          CourseID={lesson.CourseID}
          URL={lesson.URL}
        />
      ) : type === "Document" ? (
        <EditLessonDocument lesson={lesson} detail={detail} />
      ) : type === "Test" ? (
        <EditLessonTest lesson={lesson} detail={detail} />
      ) : null}
    </div>
  );
}

export default EditLession;
