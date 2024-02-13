import * as React from "react";
import "./CreateAnnonce.css";
import NavBar from "../Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function CreateAnnonce() {
  const currentDate = new Date()
    .toLocaleDateString("fr-CA")
    .split("/")
    .reverse()
    .join("-");
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
            Créée une offre d'emploi
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
                  name=" salary"
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
    </>
  );
}
export default CreateAnnonce;
