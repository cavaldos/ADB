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

const AddPageDocument = ({ onAddPage }) => {
  const [pageData, setPageData] = useState({
    lessonDocumentID: "",
    content: "",
    page: "",
  });

  const handleChange = (e) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPage(pageData);
    setPageData({ lessonDocumentID: "", content: "", page: "" }); // Reset form
  };

  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        p: 4,
        border: "1px solid #D1D7DB",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add Page to Document
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Lesson Document ID"
            type="number"
            name="lessonDocumentID"
            value={pageData.lessonDocumentID}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Content"
            name="content"
            value={pageData.content}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Page Number"
            type="number"
            name="page"
            value={pageData.page}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Page
          </Button>
        </Box>
      </form>
    </Box>
  );
};
function CreateLessonDocument() {
  const [lesson, setLesson] = useState({
    title: "",
    duration: "",
    complexityLevel: "Medium",
    courseID: "",
    topicID: "",
  });

  const [pages, setPages] = useState([]);

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "{{host_course}}/instructor/create_lesson_document",
        lesson
      );
      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("There was an error creating the lesson document!", error);
    }
  };

  const handleAddPage = (pageData) => {
    setPages([...pages, pageData]);
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
        Create Lesson Document
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
            Create Lesson Document
          </Button>
        </Box>
      </form>

      <AddPageDocument onAddPage={handleAddPage} />

      <Box sx={{ mt: 8, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Pages
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {pages.map((page, index) => (
            <Box
              key={index}
              sx={{ p: 2, border: "1px solid #D1D7DB", borderRadius: 2 }}
            >
              <Typography>
                <strong>Lesson Document ID:</strong> {page.lessonDocumentID}
              </Typography>
              <Typography>
                <strong>Content:</strong> {page.content}
              </Typography>
              <Typography>
                <strong>Page Number:</strong> {page.page}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CreateLessonDocument;
