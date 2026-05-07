import { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      navigate("/");
    } catch {
      setError("Erreur inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input name="username" placeholder="Username" onChange={handleChange} className="border p-3 rounded-xl" />
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded-xl" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-xl" />

          <button className="bg-orange-500 text-white py-3 rounded-xl">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have account? <Link to="/" className="text-orange-500">Login</Link>
        </p>

      </div>
    </div>
  );
}