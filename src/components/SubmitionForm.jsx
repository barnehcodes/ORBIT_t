import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const SubmissionForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const userDocRef = doc(collection(db, "users"), currentUser.uid);

    try {
      await updateDoc(userDocRef, {
        submissions: arrayUnion({ name, description, link }),
      });

      console.log("Submission added successfully!");
      setName("");
      setDescription("");
      setLink("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="link">Link</label>
      <input
        type="text"
        id="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmissionForm;
