import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostedAnnonce.css";

const PostedAnnonce = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="annonce-container">
      {jobs.map((job) => (
        <Card key={job.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography>
              <h1>{job.title}</h1>
            </Typography>
            <Typography>
              <h2>{job.location_title}</h2>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <h3>
                Du {job.date_start} au {job.date_end}
              </h3>
            </Typography>
            <Typography>
              <h3>{job.salary} €</h3>
            </Typography>
            <Typography variant="body2">
              <p>{job.description_job}</p>
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Voir plus</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default PostedAnnonce;
