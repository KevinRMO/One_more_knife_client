import * as React from "react";
import "./RegisterUser.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

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
        One More Knife
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function RegisterUser() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCVError, setShowCVError] = useState(false);

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToCompany = () => {
    navigate("/register-company");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Vérifier si tous les champs sont remplis
    const formElements = event.currentTarget.elements;
    for (const element of formElements) {
      if (element.required && element.value.trim() === "") {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
        return;
      }
    }

    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);

    // Vérifier si le fichier CV est au format PDF
    const cvFile = event.currentTarget.querySelector("#cv_path");
    if (cvFile && cvFile.files.length > 0) {
      const allowedExtensions = ["pdf"];
      const fileName = cvFile.files[0].name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        console.error("Le fichier CV doit être au format PDF");
        setShowError(true); // Afficher le message d'erreur général
        setShowCVError(true); // Afficher le message d'erreur spécifique au CV
        setTimeout(() => {
          setShowError(false);
          setShowCVError(false);
        }, 3000);
        return;
      }
    }

    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("http://localhost:8000/api/register-user", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigateToLogin();
        }, 3000);
      } else {
        console.error("erreur");
      }
    } catch (error) {
      console.error("erreur", error);
    }
  };

  return (
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
            Inscription Candidat
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
                  id="lastname"
                  label="Nom"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="birth_date"
                  type="date"
                  id="birth_date"
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  type="text"
                  id="city"
                  label="Ville"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  type="tel"
                  id="phone"
                  label="Téléphone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cv_path"
                  name="cv_path"
                  type="file"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse e-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmer mot de passe"
                  type="password"
                  id="confirmPassword"
                  error={!passwordsMatch}
                  helperText={
                    !passwordsMatch && "Les mots de passe ne correspondent pas"
                  }
                  onChange={handleConfirmPasswordChange}
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
              Inscription
            </Button>
            {showSuccess && (
              <Alert severity="success" onClose={() => setShowSuccess(false)}>
                Votre compte a été créer, redirection vers la connexion
              </Alert>
            )}
            {showError && (
              <Alert severity="error" onClose={() => setShowError(false)}>
                Veuillez remplir tous les champs obligatoires.
              </Alert>
            )}
            {showCVError && (
              <Alert severity="error" onClose={() => setShowCVError(false)}>
                Le fichier CV doit être au format PDF.
              </Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={navigateToLogin}
                  variant="body2"
                  style={{ cursor: "pointer" }}
                >
                  Tu as déjà un compte ? Connectes-toi
                </Link>
                <br />
                <Link
                  onClick={navigateToCompany}
                  variant="body2"
                  style={{ cursor: "pointer" }}
                >
                  Entreprise ? Inscrit toi ici
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default RegisterUser;
