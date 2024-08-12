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

function CreateLessonVideo() {
  const [lesson, setLesson] = useState({
    title: "",
    duration: "",
    complexityLevel: "Medium",
    courseID: "",
    topicID: "",
    url: "",
  });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(lesson);
    e.preventDefault();
    try {
      const response = await axios.post(
        "{{host_course}}/instructor/create_lesson_video",
        lesson
      );
      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("There was an error creating the lesson video!", error);
    }
  };

  return (
    <Box
      sx={{
        minWidth: 700,
        padding: 4,
        border: 1,
        borderColor: "#D1D7DB",
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Create Lesson Video
      </Typography>
      <form onSubmit={handleSubmit}>
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
          <FormControl fullWidth variant="outlined">
            <InputLabel id="complexity-label">Complexity Level</InputLabel>
            <Select
              labelId="complexity-label"
              id="complexity"
              name="complexityLevel"
              value={lesson.complexityLevel}
              onChange={handleChange}
              label="Complexity Level"
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
          <TextField
            label="URL"
            name="url"
            value={lesson.url}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Lesson Video
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CreateLessonVideo;
