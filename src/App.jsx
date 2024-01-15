import { useState } from "react";
import { Home } from "./Component/Home/Home";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
