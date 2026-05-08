import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={<><Navbar /><Home /></>} />
            <Route path="/search" element={<><Navbar /><Home /></>} />
            <Route path="/favorites" element={<><Navbar /><Favorites /></>} />
            <Route path="/profile" element={<><Navbar /><Profile /></>} />

            <Route path="/recipes/:id" element={<><Navbar /><RecipeDetails /></>} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}
