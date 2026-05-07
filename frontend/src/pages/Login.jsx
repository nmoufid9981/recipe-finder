import { useState, useEffect } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/home");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.email.includes("@")) return "Email invalide";
    if (form.password.length < 6) return "Mot de passe trop court";
    return "";
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const err = validate();
  if (err) {
    setError(err);
    return;
  }

  try {
    const data = await loginUser(form);

    // 🔥 check sécurité
    if (!data || typeof data === "string") {
      setError("Email ou mot de passe incorrect");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    navigate("/home");

  } catch (err) {
    console.log(err);
    setError("Erreur serveur backend");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-xl"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-3 rounded-xl"
          />

          <button className="bg-orange-500 text-white py-3 rounded-xl">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          No account?{" "}
          <Link to="/register" className="text-orange-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}