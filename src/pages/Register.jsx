import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authApi";
import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate();

  const [form,setForm]=useState({
    username:"",
    email:"",
    password:"",
  });

  const register = async(e)=>{

    e.preventDefault();

    try{

      await registerUser(form);

      toast.success("Registration Successful");

      navigate("/login");

    }

    catch(error){

      if(error.response){

        alert(error.response.data.detail);

      }

      else{

        toast.error("Server connection failed.");

      }

    }

  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={register}
        className="bg-white p-8 rounded-xl shadow-lg w-[420px]"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">

          Register

        </h1>

        <input
          className="border w-full p-3 rounded mb-4"
          placeholder="Username"
          onChange={(e)=>
            setForm({
              ...form,
              username:e.target.value
            })
          }
        />

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
          className="bg-green-600 hover:bg-green-700 transition duration-300 text-white w-full py-3 rounded shadow hover:shadow-lg"
        >

          Register

        </button>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >

            Login

          </Link>

        </p>

      </form>

    </div>

  );

}