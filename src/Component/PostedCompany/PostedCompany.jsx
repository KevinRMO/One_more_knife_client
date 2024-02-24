import React, { useEffect, useState } from "react";
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
import "./PostedCompany.css";

const PostedCompany = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    zip_code: "",
    city: "",
    description_location: "",
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  //////////////////////////////////////// Afficher les postes ////////////////////////////////////////

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

  const handleOpenModal = (location) => {
    setSelectedLocation(location);
    setFormData({
      title: location.title,
      zip_code: location.zip_code,
      city: location.city,
      description_location: location.description_location,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLocation(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //////////////////////////////////////// Modifier les postes ////////////////////////////////////////
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/locations/${selectedLocation.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedLocations = locations.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, ...formData } : loc
        );
        setLocations(updatedLocations);
        handleCloseModal();
      } else {
        console.error("Error updating location");
      }
    } catch (error) {
      console.error("Error updating location", error);
    }
  };

  //////////////////////////////////////// Supprimer les postes ////////////////////////////////////////

  const handleDeleteLocation = async (locationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/locations/${locationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Mettre à jour l'état des locations en filtrant l'emplacement supprimé
        setLocations(
          locations.filter((location) => location.id !== locationId)
        );
        console.log("Location deleted successfully");
      } else {
        console.error("Error deleting location");
      }
    } catch (error) {
      console.error("Error deleting location", error);
    }
  };

  return (
    <div>
      {locations.map((location) => (
        <Card className="CardLocation" key={location.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {location.title}
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {location.city}, {location.zip_code}
            </Typography>
            <Typography variant="body2">
              {location.description_location}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleOpenModal(location)}>
              Modifier
            </Button>
            <Button
              size="small"
              onClick={() => handleDeleteLocation(location.id)}
            >
              Supprimer
            </Button>
          </CardActions>
        </Card>
      ))}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
            }}
          >
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
              Modifier l'emplacement
            </Typography>
            <form onSubmit={handleFormSubmit}>
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
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Valider
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
    </div>
  );
};

export default PostedCompany;
