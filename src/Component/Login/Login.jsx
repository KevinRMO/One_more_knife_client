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
import Alert from "@mui/material/Alert";
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

const Login = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [loginError, setLoginError] = useState(false);
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
    // Vérifier si tous les champs requis sont remplis
    if (!formData.email || !formData.password) {
      setShowMessage(true); // Afficher l'alerte de message si un champ est manquant
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      if (response.data.category === "Entreprise") {
        localStorage.setItem("isCompany", "true");
      }
      setShowAlert(true);
      setTimeout(() => {
        navigateToHome();
      }, 1500);
      // Gérer la réponse de l'API ici (par exemple, rediriger l'utilisateur)
    } catch (error) {
      setLoginError(true);
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
                label=" Se souvenir de moi"
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
              {showAlert && (
                <Alert severity="success">
                  Vous êtes connecté, redirection vers l'accueil.
                </Alert>
              )}
              {loginError && (
                <Alert severity="error" onClose={() => setLoginError(false)}>
                  Adresse e-mail ou mot de passe incorrect.
                </Alert>
              )}
              {showMessage && (
                <Alert severity="warning">
                  Veuillez remplir tous les champs.
                </Alert>
              )}
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
