import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import Navbars from "./components/ui/Navbars";
function App() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
