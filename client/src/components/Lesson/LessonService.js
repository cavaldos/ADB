import React, { useState,useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function LessonService() {
    const [course, setCourse] = useState({});
    const [lesson, setLesson] = useState({});
    const [lessons, setLessons] = useState([]);
    const { courseID, lessonID } = useParams();
    const navigate = useNavigate();
    return {
        course,
        setCourse,
        lesson,
        setLesson,
        lessons,
        setLessons,
        courseID,
        lessonID,
        navigate
    }
}

export default LessonService