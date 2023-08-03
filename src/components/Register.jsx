import React, { useContext, useState, useEffect } from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";

export const Register = (props) => {
  //sving data
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  console.log(email);
  // Use useEffect to log state changes
  useEffect(() => {
    console.log("Email:", email);
    console.log("Password:", pass);
  }, [email, pass]);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("hande", email, pass);
    try {
      // Step 1: Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );

      // Step 3: Create a document in the users collection with user's UID as the doc ID
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        name: name,
        timeStamp: serverTimestamp(),
      });

      // Registration successful, do something like showing a success message or redirecting the user
      console.log("Registration successful");
    } catch (error) {
      // Handle registration errors here
      console.error("Error registering:", error.message);
    }
  };
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl "
      >
        <h2 className={`${styles.heroSubText}`}>Register</h2>
        <form className="flex flex-col" onSubmit={handleRegister}>
          <label htmlFor="name" className="text-left py-1">
            Full name
          </label>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="full Name"
            className="m-2 p-4 border border-none rounded-2xl"
          />
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            className="m-2 p-4 border border-none rounded-2xl"
          />
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

          <button className="bg-blue-500 hover:bg-blue-700 text-white inline-block font-bold py-2  rounded">
            Register
          </button>
        </form>
        <button
          className="bg-tertiary py-3 px-8 outline-none
           w-fit text-whitw font-bold
           shadow-md shadow-primary"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? Login here.
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
