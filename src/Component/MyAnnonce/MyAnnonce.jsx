import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
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
  const [openEditModal, setOpenEditModal] = useState(false); // Ajout de l'état pour contrôler l'ouverture du modal de modification
  const [selectedJob, setSelectedJob] = useState(null); // Ajout de l'état pour stocker les données de l'emploi sélectionné pour la modification

  //////////////////////////////////////// Afficher les jobs de l'utilisateur connecté ////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/jobs{id}", {
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

  //////////////////////////////////////// Modification des jobs  ////////////////////////////////////////

  const handleOpenModal = (jobId) => {
    setOpenModalId(jobId);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  // Fonction pour ouvrir le modal de modification et préremplir les données de l'emploi sélectionné
  const handleOpenEditModal = (job) => {
    setSelectedJob(job);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedJob(null);
    setOpenEditModal(false);
  };

  // Logique de modification de l'emploi
  const handleEditJob = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/jobs/${selectedJob.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedJob), // Utiliser selectedJob au lieu de formData
        }
      );

      if (response.status === 200) {
        // Mettre à jour l'état des emplois ou afficher une notification de réussite
        console.log("Job updated successfully");
        handleCloseEditModal();
        window.location.reload(); // Recharger la page après la modification réussie
      } else {
        console.error("Error updating job");
      }
    } catch (error) {
      console.error("Error updating job", error);
    }
  };
  //////////////////////////////////////// Supprimer les postes ////////////////////////////////////////

  const handleDeleteLocation = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Mettre à jour l'état des emplois en filtrant l'emploi supprimé
        setJobs(jobs.filter((job) => job.id !== jobId));
        console.log("Job deleted successfully");
      } else {
        console.error("Error deleting job");
      }
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  return (
    <div className="annonce-container-deux">
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
            {/* Bouton pour ouvrir le modal de modification */}
            <Button onClick={() => handleOpenEditModal(job)}>Modifier</Button>
            <Button onClick={() => handleDeleteLocation(job.id)}>
              Supprimer
            </Button>
          </CardActions>
        </Card>
      ))}
      {/* Modal pour afficher les détails de l'emploi */}
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
              {jobs.find((job) => job.id === openModalId).description_location}
            </Typography>
          </Box>
        </Modal>
      )}
      {/* Modal pour la modification de l'emploi */}
      {selectedJob && (
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container component="main" maxWidth="xs">
            <Box sx={style}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Modifier l'emploi
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleEditJob}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="title"
                        type="text"
                        id="title"
                        label="Titre de l'emploi"
                        value={selectedJob.title}
                        onChange={(e) =>
                          setSelectedJob({
                            ...selectedJob,
                            title: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="salary"
                        required
                        fullWidth
                        type="number"
                        id="salary"
                        label="Salaire (€)"
                        value={selectedJob.salary}
                        onChange={(e) =>
                          setSelectedJob({
                            ...selectedJob,
                            salary: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="date_start"
                        type="date"
                        required
                        fullWidth
                        id="date_start"
                        label="Date de début"
                        value={selectedJob.date_start}
                        onChange={(e) =>
                          setSelectedJob({
                            ...selectedJob,
                            date_start: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="date_end"
                        type="date"
                        required
                        fullWidth
                        id="date_end"
                        label="Date de fin"
                        value={selectedJob.date_end}
                        onChange={(e) =>
                          setSelectedJob({
                            ...selectedJob,
                            date_end: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Description de l'emploi"
                        name="description_job"
                        multiline
                        rows={6}
                        fullWidth
                        required
                        value={selectedJob.description_job}
                        onChange={(e) =>
                          setSelectedJob({
                            ...selectedJob,
                            description_job: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Enregistrer les modifications
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Modal>
      )}
    </div>
  );
};

export default MyAnnonce;
