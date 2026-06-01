import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Project from "@/pages/Project";
import Login from "@/pages/Login";
import { useAppStore } from "@/store";
import { Navigate } from "react-router-dom";

function AppContent() {
  const userName = useAppStore((state) => state.userName);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={userName ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<Project />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
