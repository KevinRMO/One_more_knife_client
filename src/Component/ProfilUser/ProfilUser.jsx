import * as React from "react";
import "./ProfilUser.css";
import NavBar from "../Navbar/Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";

function ProfilUser() {
  const [userData, setUserData] = useState({
    user: {
      lastname: "",
      firstname: "",
      birth_date: "",
      zip_code: "",
      city: "",
      phone: "",
      cv_path: "",
      globale_rate_user: "",
      email: "",
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
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserData();
  }, []);
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
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
        <CardMedia sx={{ height: 140 }} />
        {userData.user.cv_path}
      </Card>
    </div>
  );
}
export default ProfilUser;
