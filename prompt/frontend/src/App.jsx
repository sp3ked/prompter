import "./App.css";
import Home from "./pages/landingPage/home.jsx";
import Login from "./pages/loginPage/login.jsx";
import Dashboard from "./pages/dashboard/dash.jsx";
import Builder from './pages/builder/builder';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/builder/:projectName" element={<Builder />} />
      </Routes>
    </Router>
  );
}

export default App;