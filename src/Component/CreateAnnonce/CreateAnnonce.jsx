import React, { useState, useEffect } from "react";
import "./CreateAnnonce.css";
import NavBar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import axios from "axios";

function CreateAnnonce() {
  const navigate = useNavigate();
  const currentDate = new Date()
    .toLocaleDateString("fr-CA")
    .split("/")
    .reverse()
    .join("-");
  const [formData, setFormData] = React.useState({
    title: "",
    date_start: "",
    date_end: "",
    salary: "",
    description_job: "",
  });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigateToHome = () => {
    navigate("/");
  };

  //////////////////////////////////////// Créé une offre d'emploi ////////////////////////////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier si tous les champs sont remplis
    const formElements = event.currentTarget.elements;
    let allFieldsFilled = true;
    for (const element of formElements) {
      if (element.required && element.value.trim() === "") {
        allFieldsFilled = false;
        break;
      }
    }

    if (!allFieldsFilled) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    // Vérifier si le champ de salaire ne contient que des chiffres
    if (!/^\d*\.?\d*$/.test(formData.salary)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    // Vérifier si la date de fin est postérieure à la date de début
    if (formData.date_end < formData.date_start) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/jobs",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json", // spécifier le type de contenu JSON
          },
        }
      );
      if (response.status === 200) {
        console.log("Emploi créé avec succès");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigateToHome();
        }, 1500);
      } else {
        console.error("Erreur lors de la création du lieu");
      }
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  //////////////////////////////////////// Affichage des titres des Etablissements dans le select ////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/api/locations`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLocations(data.locations);
        } else {
          console.error("Error fetching location data");
        }
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "location_id") {
      setSelectedLocation(value);
    }

    if (name === "date_start") {
      setFormData({
        ...formData,
        date_start: value,
        // Si la date de fin est antérieure à la date de début, la date de fin est réinitialisée
        date_end: value > formData.date_end ? value : formData.date_end,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
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
            Créer une offre d'emploi
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Titre de l'emploi"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
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
                  inputProps={{ min: currentDate }}
                  value={formData.date_start}
                  onChange={handleChange}
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
                  inputProps={{ min: currentDate }}
                  value={formData.date_end}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="salary"
                  required
                  fullWidth
                  type="text"
                  label="Salaire"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description de l'emploi"
                  name="description_job"
                  multiline
                  rows={10}
                  fullWidth
                  required
                  value={formData.description_job}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Etablissement
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLocation}
                    label="Etablissement"
                    name="location_id"
                    onChange={handleChange}
                    required
                  >
                    {/* Options de sélection des établissements */}
                    {locations.map((location) => (
                      <MenuItem key={location.id} value={location.id}>
                        {location.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
            {showSuccess && (
              <Alert severity="success" onClose={() => setShowSuccess(false)}>
                Votre offre d'emploi a été créer, redirection vers l'accueil
              </Alert>
            )}
            {showError && (
              <Alert severity="error" onClose={() => setShowError(false)}>
                {formData.salary.trim() === ""
                  ? "Veuillez remplir tous les champs."
                  : isNaN(formData.salary)
                  ? "Le champ du salaire doit contenir uniquement des chiffres."
                  : "La date de fin ne peut pas être antérieure à la date de début."}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default CreateAnnonce;
