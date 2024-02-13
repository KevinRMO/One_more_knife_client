import React, { useState, useEffect } from "react";
import "./ProfilCompany.css";
import NavBar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import PostedCompany from "../PostedCompany/PostedCompany";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

function ProfilCompany() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    zip_code: "",
    city: "",
    description_location: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/locations",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json", // spécifier le type de contenu JSON
          },
        }
      );

      console.log(formData);
      if (response.status === 200) {
        console.log("Lieu créé avec succès");
        handleClose(); // Fermer le modal après la création du lieu
        window.location.reload();
      } else {
        console.error("Erreur lors de la création du lieu");
      }
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  return (
    <div>
      <NavBar />
      <Button
        sx={{
          marginTop: 15,
          paddingLeft: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={handleOpen}
      >
        Ajouter un établissement
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={style}>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Etablissement
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
                    label="Nom de l'établissement"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="zip_code"
                    required
                    fullWidth
                    type="text"
                    pattern="[0-9]{5}"
                    id="zip_code"
                    label="Code postal"
                    title="Entrez un code postal français valide (5 chiffres)"
                    autoFocus
                    value={formData.zip_code}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    type="text"
                    id="city"
                    label="Ville"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Description de l'établissement"
                    name="description_location"
                    multiline
                    rows={10}
                    fullWidth
                    value={formData.description_location}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                className="buttonInscription"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Valider
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
      <PostedCompany />
    </div>
  );
}
export default ProfilCompany;
