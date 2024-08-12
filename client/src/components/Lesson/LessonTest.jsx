import React, { useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { SiSpeedtest } from "react-icons/si";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";

const AddQuestion = ({ lessonTestID }) => {
  const [questionData, setQuestionData] = useState({
    lessonTestID: lessonTestID || "",
    title: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    answer: "",
  });

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "{{host_course}}/instructor/add_question_to_lesson_test",
        questionData
      );
      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("There was an error adding the question!", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 4,
        border: "1px solid #D1D7DB",
        borderRadius: 2,
        mt: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add Question to Lesson Test
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Lesson Test ID"
            type="number"
            name="lessonTestID"
            value={questionData.lessonTestID}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Title"
            name="title"
            value={questionData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Question"
            name="question"
            value={questionData.question}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Option 1"
            name="option1"
            value={questionData.option1}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Option 2"
            name="option2"
            value={questionData.option2}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Option 3"
            name="option3"
            value={questionData.option3}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Answer"
            name="answer"
            value={questionData.answer}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Question
          </Button>
        </Box>
      </form>
    </Box>
  );
};
const CreateLessonTest = () => {
  const [lesson, setLesson] = useState({
    title: "",
    duration: "",
    complexityLevel: "Medium",
    courseID: "",
    topicID: "",
    lessonTestID: "",
  });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "{{host_course}}/instructor/create_lesson_test",
        lesson
      );
      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("There was an error creating the lesson test!", error);
    }
  };

  return (
    <Box
      sx={{
        minWidth: 700,
        p: 4,
        border: "1px solid #D1D7DB",
        borderRadius: 1,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Create Lesson Test
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Duration (in minutes)"
            type="number"
            name="duration"
            value={lesson.duration}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Complexity Level</InputLabel>
            <Select
              name="complexityLevel"
              value={lesson.complexityLevel}
              onChange={handleChange}
              label="Complexity Level"
              fullWidth
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Course ID"
            type="number"
            name="courseID"
            value={lesson.courseID}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Topic ID"
            type="number"
            name="topicID"
            value={lesson.topicID}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Lesson Test
          </Button>
        </Box>
      </form>
      <AddQuestion lessonTestID={lesson.lessonTestID} />
    </Box>
  );
};


export default CreateLessonTest;