import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import ProfilUser from "./Component/ProfilUser/ProfilUser";
import RegisterUser from "./Component/RegisterUser/RegisterUser";
import RegisterCompany from "./Component/RegisterCompany/RegisterCompany";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register-user",
      element: <RegisterUser />,
    },
    {
      path: "/register-company",
      element: <RegisterCompany />,
    },
    {
      path: "/profil",
      element: <ProfilUser />,
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
