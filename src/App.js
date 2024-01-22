import Admin from "./admin/Admin";
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
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
