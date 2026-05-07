import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkStyle =
    "transition-all duration-200 hover:text-orange-500 hover:scale-105";

  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center border-b shadow-sm">

      <Link to="/home" className="text-orange-500 font-bold text-xl">
        What2Cook
      </Link>

      <div className="flex gap-6 items-center">

        {user && (
          <>
            <Link to="/home" className={linkStyle}>
             Search
            </Link>

            <Link to="/favorites" className={linkStyle}>
              Favoris
            </Link>

            <Link to="/profile" className={linkStyle}>
              Profile
            </Link>

            <button
              onClick={logout}
              className="text-red-500 transition hover:scale-105"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}