import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isCompany = localStorage.getItem("isCompany");
  const [auth, setAuth] = React.useState(!!token);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToProfileCompany = () => {
    navigate("/profil-company");
  };

  const navigateToProfileUser = () => {
    navigate("/profil-user");
  };

  const navigateToCreateAnnonce = () => {
    navigate("/create-annonce");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isCompany");
    setAuth(false);
    navigateToHome();
  };

  console.log("auth:", auth);
  console.log("isCompany:", isCompany);
  return (
    <AppBar className="navBar">
      <Container className="containeNavBar">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              className="logo"
              src="/One-more-Knife.png"
              alt="Logo"
              onClick={navigateToHome}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Accueil</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {isCompany === "true"
                    ? "Profil Entreprise"
                    : "Profil Candidat"}
                </Typography>
              </MenuItem>
              {auth && isCompany === "true" && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Créer une annonce</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              className="logo"
              src="/One-more-Knife.png"
              alt="Logo"
              onClick={navigateToHome}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Accueil
            </Button>
            {auth && (
              <Button
                onClick={() => {
                  if (isCompany === "true") {
                    navigateToProfileCompany();
                  } else {
                    navigateToProfileUser();
                  }
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {isCompany === "true" ? "Profil Entreprise" : "Profil Candidat"}
              </Button>
            )}
            {auth && isCompany === "true" && (
              <Button
                onClick={navigateToCreateAnnonce}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Créer une annonce
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth ? (
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Déconnexion
              </Button>
            ) : (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={navigateToLogin}
              >
                Connexion
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
