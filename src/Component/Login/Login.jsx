import * as React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
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

function Login() {
  const navigate = useNavigate();
  const [categorie, setCategorie] = React.useState("");

  const handleChange = (event) => {
    setCategorie(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToRegisterUser = () => {
    navigate("/Register-user");
  };

  const navigateToRegisterCompany = () => {
    navigate("/Register-company");
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Vous êtes ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categorie}
                  label=" Vous êtes ?"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Candidat</MenuItem>
                  <MenuItem value={20}>Entreprise</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
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
}
export default Login;
