import React from "react";
import {
  Modal,
  Container,
  Box,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

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

const EditProfilModal = ({
  open,
  handleCloseModal,
  userData,
  handleChange,
  handleFormSubmit,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
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
              Modifier Profil
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleFormSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="lastname"
                    type="text"
                    id="lastname"
                    label="Nom de famille"
                    value={userData.user.lastname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="firstname"
                    type="text"
                    id="firstname"
                    label="Prénom"
                    value={userData.user.firstname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="birth_date"
                    type="date"
                    id="birth_date"
                    label="Date de naissance"
                    value={userData.user.birth_date}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="zip_code"
                    type="text"
                    id="zip_code"
                    label="Code postal"
                    value={userData.user.zip_code}
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
                    value={userData.user.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    type="text"
                    id="phone"
                    label="Téléphone"
                    value={userData.user.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="file"
                    id="cv_path"
                    name="cv_path"
                    accept=".pdf"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setUserData((prevState) => ({
                        ...prevState,
                        user: {
                          ...prevState.user,
                          cv_path: file,
                        },
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleFormSubmit}
              >
                Enregistrer les modifications
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default EditProfilModal;
