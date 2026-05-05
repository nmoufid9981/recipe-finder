import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">

        {/* ✅ Navbar toujours affichée */}
        <Navbar />

        {/* ✅ Contenu dynamique */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>

      </div>
    </Router>
  );
}