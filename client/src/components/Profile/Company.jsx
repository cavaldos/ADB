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

function Company() {
  const [companies, setCompanies] = useState([
    {
      companyName: "ABC Corp",
      position: "Software Engineer",
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    position: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleSave = (index) => {
    setIsEditing(null);
  };

  const handleAddCompany = () => {
    setCompanies([...companies, newCompany]);
    setNewCompany({ companyName: "", position: "" });
    setOpenModal(false);
  };

  return (
    <div>
      {companies.map((company, index) => (
        <Card key={index} className="m-4 p-4 bg-white shadow-md ">
          <CardContent>
            {isEditing === index ? (
              <div className="flex flex-col gap-2">
                <TextField
                  label="Company Name"
                  variant="outlined"
                  value={company.companyName}
                  onChange={(e) => {
                    const newCompanies = [...companies];
                    newCompanies[index].companyName = e.target.value;
                    setCompanies(newCompanies);
                  }}
                  className="mb-2"
                  fullWidth
                />
                <TextField
                  label="Position"
                  variant="outlined"
                  value={company.position}
                  onChange={(e) => {
                    const newCompanies = [...companies];
                    newCompanies[index].position = e.target.value;
                    setCompanies(newCompanies);
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
                  Company
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Company Name: {company.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Position: {company.position}
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
        Add Company
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="flex flex-col gap-2" sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Add Company
          </Typography>
          <TextField
            label="Company Name"
            variant="outlined"
            value={newCompany.companyName}
            onChange={(e) =>
              setNewCompany({
                ...newCompany,
                companyName: e.target.value,
              })
            }
            className="mb-2"
            fullWidth
          />
          <TextField
            label="Position"
            variant="outlined"
            value={newCompany.position}
            onChange={(e) =>
              setNewCompany({
                ...newCompany,
                position: e.target.value,
              })
            }
            className="mb-2"
            fullWidth
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleAddCompany}
            className="mt-2"
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Company;
