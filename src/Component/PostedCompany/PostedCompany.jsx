import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./PostedCompany.css";

const PostedCompany = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/api/locations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLocations(data.locations);
          console.log(data.locations);
        } else {
          console.error("Error fetching location data");
        }
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {locations.map((location) => (
        <Card key={location.id} sx={{ minWidth: 275 }}>
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
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default PostedCompany;
