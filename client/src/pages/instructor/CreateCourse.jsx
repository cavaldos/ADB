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
import LessonListView from "../../components/Lesson/LessonListView";
const InforCourse = () => {
  //   {
  //   "title": "Introduction to Scien cdde 8nt h",
  //   "subtitle": "A beginner's guide",
  //   "description": "This course covers the basics of science.",
  //   "language": "English",
  //   "image": "science.jpg",
  //   "price": 99.99,
  //   "status": "Hide",
  //   "categoryID": 2,
  //   "instructorID": 19
  // }

  return (
    <div className="bg-orange-600 w-1/6 flex items-start justify-center text-black  border-[1px] border-[#D1D7DB]">
      <div className="w-4/5 mt-5">
        <h1 className="text-2xl font-bold">Create new course</h1>
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="Subtitle"
            className="p-2 outline-none border border-gray-400"
          />
          <textarea
            placeholder="Description"
            className="p-2 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="Language"
            className="p-2 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="Image"
            className="p-2 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="Price"
            className="p-2 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="Status"
            className="p-2 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="CategoryID"
            className="p-2 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="InstructorID"
            className="p-2 outline-none border border-gray-400"
          />
        </div>
        <button className="bg-[#A535F0] h-full w-[120px] mt-4 text-white font-bold">
          Create
        </button>
      </div>
    </div>
  );
};

const CreateLessonVideo = () => {
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
};

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
const CreateLessonDocument = () => {
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
};

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

const CreateLesson = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "video":
        return <CreateLessonVideo />;
      case "document":
        return <CreateLessonDocument />;
      case "test":
        return <CreateLessonTest />;
      default:
        return null;
    }
  };

  return (
    <div className="w-2/3  flex items-center justify-center text-black p-4 border-[1px] border-[#D1D7DB]">
      <div className="min-h-screen items-center justify-center flex flex-col  bg-gray-50 p-8">
        <main className="w-full  text-center">
          {activeComponent === null ? (
            <div>
              <div className="flex justify-center space-x-4 mb-8 ">
                <div
                  onClick={() => setActiveComponent("video")}
                  className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                >
                  <MdOndemandVideo className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-semibold mt-4">Lesson Video</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Create rich learning experiences with the help of video
                    lectures, quizzes, coding exercises, etc.
                  </p>
                </div>
                <div
                  onClick={() => setActiveComponent("document")}
                  className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                >
                  <GrDocumentText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-semibold mt-4">
                    Lesson Document
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Help students prepare for certification exams by providing
                    practice questions.
                  </p>
                </div>
                <div
                  onClick={() => setActiveComponent("test")}
                  className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                >
                  <SiSpeedtest className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-semibold mt-4">Lesson Test</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Help students prepare for certification exams by providing
                    practice questions.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              {renderActiveComponent()}
              <button
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => setActiveComponent(null)}
              >
                Exit
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const LessonList = () => {
  return (
    <Box
      sx={{
        width: "33.33%",
        p: 4,
        border: "1px solid #D1D7DB",
        color: "white",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Bên này là danh sách bài học
      </Typography>
      <LessonListView />
    </Box>
  );
};
const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "English",
    image: "",
    price: "",
    status: "Hide",
    categoryID: "",
    instructorID: "",
  });

  return (
    <div className="flex flex-row min-h-screen gap-3 ">
      <InforCourse />
      <CreateLesson />
      <LessonList />
    </div>
  );
};

export default CreateCourse;
