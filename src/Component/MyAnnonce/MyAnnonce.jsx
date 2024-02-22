import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./MyAnnonce.css";
import NavBar from "../Navbar/Navbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "white",
  boxShadow: 24,
  p: 4,
};

const MyAnnonce = () => {
  const [jobs, setJobs] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setJobs(response.data.jobs);
        } else {
          console.error("Error fetching jobs data");
        }
      } catch (error) {
        console.error("Error fetching jobs data", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (jobId) => {
    setOpenModalId(jobId);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  return (
    <div className="annonce-container">
      <NavBar />
      {jobs.map((job) => (
        <Card key={job.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h4">{job.title}</Typography>
            <Typography variant="h5">{job.location_title}</Typography>
            <Typography variant="h6" color="text.secondary">
              {job.location_zip_code}, {job.location_city}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Du {job.date_start} au {job.date_end}
            </Typography>
            <Typography variant="h6">{job.salary} €</Typography>
            <Typography variant="body2">
              {job.description_job}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => handleOpenModal(job.id)}>Voir plus</Button>
          </CardActions>
        </Card>
      ))}
      {/* Modal */}
      {openModalId && (
        <Modal
          open={true}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h4" component="h2">
              {jobs.find((job) => job.id === openModalId).title}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {jobs.find((job) => job.id === openModalId).location_zip_code},{" "}
              {jobs.find((job) => job.id === openModalId).location_city}
            </Typography>
            <Typography variant="h6">
              Salaire: {jobs.find((job) => job.id === openModalId).salary} €
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Du {jobs.find((job) => job.id === openModalId).date_start} au{" "}
              {jobs.find((job) => job.id === openModalId).date_end}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <p className="poste">Description du poste :</p>
              {jobs.find((job) => job.id === openModalId).description_job}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <p className="location">Description de l'emplacement :</p>
              {
                jobs.find((job) => job.id === openModalId).description_location
              }{" "}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default MyAnnonce;
