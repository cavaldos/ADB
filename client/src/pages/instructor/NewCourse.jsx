import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InstructorService from "../../services/Instructor.service";
import { useSelector } from "react-redux";
import { message } from "antd";

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
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add a loading state
  const profile = useSelector((state) => state.profile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevState) => ({ ...prevState, [name]: value }));
  };

  const fetchCategories = () => {
    InstructorService.Category.getAllCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true
    const response = await InstructorService.createCourse(
      course.title,
      course.subtitle,
      course.description,
      course.language,
      course.image,
      course.price,
      course.status,
      course.categoryID,
      profile.InstructorID
    );
    if (response.status === 200) {
      setLoading(false); // Set loading state to false
      message.success("Course created successfully!");
      navigate(-1);
    } else {
      setLoading(false); // Set loading state to false
      message.error("Failed to create course.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryID"
            value={course.categoryID}
            onChange={handleChange}
            label="Category"
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.CategoryID} value={category.CategoryID}>
                {category.CategoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </div>
  );
}

export default NewCourse;
