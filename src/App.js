import React from "react";
import { BrowserRouter } from "react-router-dom";

//Pages
import LoginForm from "./components/form/LoginForm";
function App() {
    return (
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>
    );
}

export default App;
