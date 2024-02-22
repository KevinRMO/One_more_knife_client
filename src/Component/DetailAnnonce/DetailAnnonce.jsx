// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import "./DetailAnnonce.css";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   maxHeight: "80vh",
//   overflowY: "auto",
//   bgcolor: "background.paper",
//   border: "white",
//   boxShadow: 24,
//   p: 4,
// };

// function DetailAnnonce() {
//   const [jobs, setJobs] = useState([]);
//   const [open, setOpen] = useState({});
//   const [selectedJob, setSelectedJob] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/jobs");
//         const sortedJobs = response.data.jobs.sort(
//           (a, b) => new Date(b.date_start) - new Date(a.date_start)
//         );
//         setJobs(sortedJobs);
//         // Initialize open state for each job
//         const openState = {};
//         sortedJobs.forEach((job) => {
//           openState[job.id] = false;
//         });
//         setOpen(openState);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données :", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleOpen = (job) => {
//     setSelectedJob(job);
//     setOpen((prevOpen) => ({
//       ...prevOpen,
//       [job.id]: true,
//     }));
//   };

//   const handleClose = () => {
//     setOpen((prevOpen) => ({
//       ...prevOpen,
//       [selectedJob.id]: false,
//     }));
//   };

//   return (
//     <div>
//       {jobs.map((job) => (
//         <div key={job.id}>
//           <Button onClick={() => handleOpen(job)}>Voir plus</Button>
//           <Modal
//             open={open[job.id]}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <Box sx={style}>
//               <Typography id="modal-modal-title" variant="h4" component="h2">
//                 {job.title}
//               </Typography>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 {job.location_zip_code}, {job.location_city}
//               </Typography>
//               <Typography id="modal-modal-description" variant="h6">
//                 Salaire: {job.salary} €
//               </Typography>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 Du {job.date_start} au {job.date_end}
//               </Typography>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 <p className="poste">Description du poste :</p>
//                 {job.description_job}
//               </Typography>
//             </Box>
//           </Modal>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DetailAnnonce;
