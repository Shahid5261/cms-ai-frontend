import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";
import toast from "react-hot-toast";


export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {

    e.preventDefault();

    try {

      const res = await loginUser(form);

      localStorage.setItem(
        "token",
        res.access_token
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        toast.error("Server connection failed.");
      }

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={login}
        className="bg-white p-8 rounded-xl shadow-lg w-[420px]"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          className="border w-full p-3 rounded mb-4"
          placeholder="Email"
          type="email"
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <input
          className="border w-full p-3 rounded mb-6"
          placeholder="Password"
          type="password"
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white w-full py-3 rounded shadow hover:shadow-lg"
        >
          Login
        </button>

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            className="text-blue-600 ml-2"
            to="/register"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  );

}