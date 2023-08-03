import React, { useContext, useState } from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Routes, Route, useNavigate } from "react-router-dom";
import { slideIn } from "../utils/motion";
import { Link } from "react-router-dom";
import { EarthCanvas } from "./canvas";
import { AuthContext } from "../context/AuthContext";

const Login = (props) => {
  //saving data
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/Palace");
      })
      .catch((error) => {
        console.log(error.message); // Log the error message
        setError(true);
      });
  };

  return (
    <div
      className="
      
    xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden "
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl "
      >
        <h2 className={`${styles.heroSubText}`}>Login</h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <label htmlFor="email" className="text-left py-1">
            email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            className="m-2 p-4 border border-none rounded-2xl"
          />
          {/* passing the user variable  */}

          <label htmlFor="password" className="text-left py-1">
            password
          </label>

          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            className="m-2 p-4 border border-none rounded-2xl"
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white inline-block font-bold py-2  rounded"
            type="submit"
          >
            Log In
          </button>
        </form>
        <button
          className="bg-tertiary py-3 px-8 outline-none
           w-fit text-whitw font-bold
           shadow-md shadow-primary"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register here.
        </button>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default Login;
