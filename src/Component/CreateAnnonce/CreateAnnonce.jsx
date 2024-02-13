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

function CreateAnnonce() {
  const currentDate = new Date()
    .toLocaleDateString("fr-CA")
    .split("/")
    .reverse()
    .join("-");

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  //////////////////////////////////////// Affichage des titres des Etablissements ////////////////////////////////////////

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

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
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
            // onSubmit={handleSubmit}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="salary"
                  required
                  fullWidth
                  type="text"
                  label="Salaire"
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Etablissement
                  </InputLabel>
                  <Select
                    padd
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLocation}
                    label="Etablissement"
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
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default CreateAnnonce;
