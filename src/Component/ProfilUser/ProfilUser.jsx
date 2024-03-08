import * as React from "react";
import "./ProfilUser.css";
import NavBar from "../Navbar/Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import EditProfilModal from "../EditProfilModal/EditProfilModal";

function ProfilUser() {
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({
    user: {
      lastname: "",
      firstname: "",
      birth_date: "",
      zip_code: "",
      city: "",
      phone: "",
      cv_path: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/profil-user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8000/api/edit-profil-user",
        userData.user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la modification du profil:", error);
    }
  };

  return (
    <div className="card">
      <NavBar />
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {userData.user.lastname} {userData.user.firstname}
          </Typography>
          <Typography variant="h6">
            <span>Date de naissance:</span> {userData.user.birth_date}
          </Typography>
          <Typography variant="h6">
            Ville et code postal: {userData.user.city} {userData.user.zip_code}
          </Typography>
          <Typography variant="h6">Téléphone: {userData.user.phone}</Typography>
          <Typography variant="h6">Mail: {userData.user.email}</Typography>
        </CardContent>
        <CardActions>
          <Button
            className="buttonModifier"
            size="small"
            onClick={handleOpenModal}
          >
            Modifier
          </Button>
        </CardActions>
        {/* Affichage du CV */}
        {userData.user.cv_path && (
          <CardMedia
            component="img"
            alt="CV"
            height="140"
            image={`http://localhost:8000/${userData.user.cv_path}`}
          />
        )}
      </Card>
      <EditProfilModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        userData={userData}
        handleChange={handleChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
export default ProfilUser;
