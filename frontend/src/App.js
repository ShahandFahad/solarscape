import Admin from "./admin/Admin";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          {/* Registeration Page */}
          <Route path="/signup" element={<Signup />} />
          {/* Client Side */}
          <Route path="/*" element={<MainLayout />} />
          {/* Admin Panel */}
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
