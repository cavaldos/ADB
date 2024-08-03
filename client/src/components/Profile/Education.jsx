import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Education() {
  const [educationList, setEducationList] = useState([
    {
      level: "Bachelor",
      major: "Computer Science",
      schoolName: "XYZ University",
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [newEducation, setNewEducation] = useState({
    level: "",
    major: "",
    schoolName: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleSave = (index) => {
    setIsEditing(null);
  };

  const handleAddEducation = () => {
    setEducationList([...educationList, newEducation]);
    setNewEducation({ level: "", major: "", schoolName: "" });
    setOpenModal(false);
  };

  return (
    <div>
      {educationList.map((education, index) => (
        <Card key={index} className="m-4 p-4 bg-white shadow-md">
          <CardContent>
            {isEditing === index ? (
              <div className="flex flex-col gap-2">
                <TextField
                  label="Level"
                  variant="outlined"
                  value={education.level}
                  onChange={(e) => {
                    const newEducationList = [...educationList];
                    newEducationList[index].level = e.target.value;
                    setEducationList(newEducationList);
                  }}
                  className="mb-2"
                  fullWidth
                />
                <TextField
                  label="Major"
                  variant="outlined"
                  value={education.major}
                  onChange={(e) => {
                    const newEducationList = [...educationList];
                    newEducationList[index].major = e.target.value;
                    setEducationList(newEducationList);
                  }}
                  className="mb-2"
                  fullWidth
                />
                <TextField
                  label="School Name"
                  variant="outlined"
                  value={education.schoolName}
                  onChange={(e) => {
                    const newEducationList = [...educationList];
                    newEducationList[index].schoolName = e.target.value;
                    setEducationList(newEducationList);
                  }}
                  className="mb-2"
                  fullWidth
                />
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave(index)}
                  className="mt-2"
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <Typography variant="h5" component="div">
                  Education
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level: {education.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Major: {education.major}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  School Name: {education.schoolName}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(index)}
                  className="mt-2"
                >
                  Edit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}

      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add Education
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="flex flex-col gap-2" sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Add Education
          </Typography>
          <TextField
            label="Level"
            variant="outlined"
            value={newEducation.level}
            onChange={(e) =>
              setNewEducation({
                ...newEducation,
                level: e.target.value,
              })
            }
            className="mb-2"
            fullWidth
          />
          <TextField
            label="Major"
            variant="outlined"
            value={newEducation.major}
            onChange={(e) =>
              setNewEducation({
                ...newEducation,
                major: e.target.value,
              })
            }
            className="mb-2"
            fullWidth
          />
          <TextField
            label="School Name"
            variant="outlined"
            value={newEducation.schoolName}
            onChange={(e) =>
              setNewEducation({
                ...newEducation,
                schoolName: e.target.value,
              })
            }
            className="mb-2"
            fullWidth
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleAddEducation}
            className="mt-2"
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Education;
