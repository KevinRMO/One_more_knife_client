import * as React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
// const user = "Candidat";
// const company = "Entreprise";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToRegisterUser = () => {
    navigate("/Register-user");
  };

  const navigateToRegisterCompany = () => {
    navigate("/Register-company");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigateToHome();
      }, 1500);
      // Gérer la réponse de l'API ici (par exemple, rediriger l'utilisateur)
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      // Gérer les erreurs ici
    }
  };

  return (
    <div className="backgroundColor">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              className="logoLogin"
              src="/One-more-Knife.png"
              alt="Logo"
              onClick={navigateToHome}
            />
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Vous êtes ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.category}
                  label="Vous êtes ?"
                  onChange={handleChange}
                  name="category"
                >
                  <MenuItem value={user}>Candidat</MenuItem>
                  <MenuItem value={company}>Entreprise</MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse e-mail"
                name="email"
                value={formData.email}
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                value={formData.password}
                autoComplete="current-password"
                onChange={handleChange}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Ce souvenir"
              />
              <Button
                className="buttonConnexion"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connexion
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Mot de passe oublié ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={navigateToRegisterUser}
                    variant="body2"
                    style={{ cursor: "pointer" }}
                  >
                    {"Candidat ? Inscris-toi ici"}
                    <br />
                  </Link>
                  <Link
                    onClick={navigateToRegisterCompany}
                    variant="body2"
                    style={{ cursor: "pointer" }}
                  >
                    {"Entreprise ? Inscris-toi ici"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default Login;
