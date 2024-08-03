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

function Certificate() {
  const [certificates, setCertificates] = useState([
    {
      certificateName: "Certified React Developer",
      startDate: "2021-01-01",
      endDate: "2023-01-01",
    },
    {
      certificateName: "Certified JavaScript Developer",
      startDate: "2020-01-01",
      endDate: "2022-01-01",
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [newCertificate, setNewCertificate] = useState({
    certificateName: "",
    startDate: "",
    endDate: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleSave = (index) => {
    setIsEditing(null);
  };

  const handleAddCertificate = () => {
    setCertificates([...certificates, newCertificate]);
    setNewCertificate({ certificateName: "", startDate: "", endDate: "" });
    setOpenModal(false);
  };

  return (
    <div>
      {certificates.map((certificate, index) => (
        <Card key={index} className="m-4 p-4 bg-white shadow-2xl ">
          <CardContent>
            {isEditing === index ? (
              <div className="flex flex-col gap-2">
                <TextField
                  label="Certificate Name"
                  variant="outlined"
                  value={certificate.certificateName}
                  onChange={(e) => {
                    const newCertificates = [...certificates];
                    newCertificates[index].certificateName = e.target.value;
                    setCertificates(newCertificates);
                  }}
                  className="mb-2"
                  fullWidth
                />
                <TextField
                  label="Start Date"
                  type="date"
                  variant="outlined"
                  value={certificate.startDate}
                  onChange={(e) => {
                    const newCertificates = [...certificates];
                    newCertificates[index].startDate = e.target.value;
                    setCertificates(newCertificates);
                  }}
                  className="mb-2"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="End Date"
                  type="date"
                  variant="outlined"
                  value={certificate.endDate}
                  onChange={(e) => {
                    const newCertificates = [...certificates];
                    newCertificates[index].endDate = e.target.value;
                    setCertificates(newCertificates);
                  }}
                  className="mb-2"
                  InputLabelProps={{ shrink: true }}
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
                  Certificate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Certificate Name: {certificate.certificateName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Date: {certificate.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Date: {certificate.endDate}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(index)}
                  className="mt-4 "
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
        Add Certificate
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="flex flex-col gap-2" sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Add Certificate
          </Typography>
          <TextField
            label="Certificate Name"
            variant="outlined"
            value={newCertificate.certificateName}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                certificateName: e.target.value,
              })
            }
            className="mb-2"
            fullWidth
          />
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            value={newCertificate.startDate}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                startDate: e.target.value,
              })
            }
            className="mb-2"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            value={newCertificate.endDate}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                endDate: e.target.value,
              })
            }
            className="mb-2"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleAddCertificate}
            className="mt-2"
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Certificate;
