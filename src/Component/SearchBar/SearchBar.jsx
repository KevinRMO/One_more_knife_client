import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Vous pouvez implémenter la logique de recherche ici
    console.log("Recherche de:", searchTerm);
  };

  return (
    <div className="searchBar">
      <input
        className="inputSearch"
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button
        className="buttonSearch"
        variant="contained"
        onClick={handleSearch}
      >
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
