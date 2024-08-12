import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NewCourse() {
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "English",
    image: "",
    price: 0,
    status: "Hide",
    categoryID: 0,
    instructorID: 0,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(course);
  };
  // khi bam new course thi se nhan lai id coures
  const handleNewCourse = () => {
    navigate(`/new-course/${1}/create-lesson/${2}`);
  }
  return (
    <div className="">
      <div className="flex gap-3">
    
        <h1 className="text-2xl font-bold">Create new course</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: 600, margin: "auto" }}
      >
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={course.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Subtitle"
          variant="outlined"
          name="subtitle"
          value={course.subtitle}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={course.description}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Language</InputLabel>
          <Select
            name="language"
            value={course.language}
            onChange={handleChange}
            label="Language"
            required
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Vietnamese">Vietnamese</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Price"
          variant="outlined"
          name="price"
          type="number"
          value={course.price}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Category ID"
          variant="outlined"
          name="categoryID"
          type="number"
          value={course.categoryID}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Instructor ID"
          variant="outlined"
          name="instructorID"
          type="number"
          value={course.instructorID}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleNewCourse}
        >
          Create Course
        </Button>
      </form>
    </div>
  );
}

export default NewCourse;
