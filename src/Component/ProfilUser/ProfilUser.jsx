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
import { useNavigate } from "react-router-dom";

function ProfilUser() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profil", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
      </Card>
    </div>
  );
}
export default ProfilUser;
