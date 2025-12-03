import './index.css'
import HomePage from '../app/page.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../app/login/page.jsx";
import SignupPage from "../app/signup/page.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  </BrowserRouter>
);