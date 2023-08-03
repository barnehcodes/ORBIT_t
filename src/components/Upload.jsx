import React, { useContext, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { storage, db } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./upload.css";

const Upload = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleModelChange = (e) => {
    setModel(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentUser) {
        const userId = currentUser.uid;

        // Create the submissions subcollection reference within the user document
        const userSubmissionsRef = collection(
          db,
          "users",
          userId,
          "submissions"
        );

        // Upload image file
        const imageRef = ref(storage, image.name);
        const imageUploadTask = uploadBytesResumable(imageRef, image);

        imageUploadTask.on(
          "state_changed",
          (snapshot) => {
            // Track upload progress if needed
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);
          },
          (error) => {
            // Handle upload error
            console.log("Image upload error:", error);
          },
          async () => {
            // Image upload completed successfully
            try {
              const imageDownloadURL = await getDownloadURL(imageRef);

              // Continue with the model file upload and document creation
              // ...
              // Upload model file
              const modelRef = ref(storage, model.name);
              const modelUploadTask = uploadBytesResumable(modelRef, model);
              modelUploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Track upload progress if needed
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log(`Upload progress: ${progress}%`);
                },
                (error) => {
                  // Handle upload error
                  console.log("Model upload error:", error);
                },
                async () => {
                  // Model upload completed successfully
                  try {
                    const modelDownloadURL = await getDownloadURL(modelRef);

                    // Add the form data to the subcollection document
                    const subcollectionDocRef = await addDoc(
                      userSubmissionsRef,
                      {
                        name: data.name,
                        description: data.description,
                        link: data.link,
                        img: imageDownloadURL,
                        file: modelDownloadURL,
                        timestamp: serverTimestamp(),
                        comments: "",
                      }
                    );

                    // Initialize comments field for the newly created document
                    const commentsRef = collection(
                      db,
                      "users",
                      userId,
                      "submissions",
                      subcollectionDocRef.id,
                      "comments"
                    );
                    await setDoc(commentsRef, {
                      initialComment: "This is the initial comment.",
                    });

                    console.log(
                      "Subcollection document created successfully! Document ID:",
                      subcollectionDocRef.id
                    );
                  } catch (error) {
                    console.log("Error getting model download URL:", error);
                  }
                }
              );
            } catch (error) {
              console.log("Error getting image download URL:", error);
            }
          }
        );
      } else {
        console.log("User not logged in");
      }
    } catch (err) {
      console.log(err);
    }

    // Reset form fields after submission
    setData({
      name: "",
      description: "",
      link: "",
    });
    setImage(null);
    setModel(null);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className="fixed top-20 right-4 px-6 py-3 bg-white text-primary font-semibold rounded-full shadow-lg hover:bg-gray-200"
      >
        Upload
      </button>
      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleSubmit} className="form-container">
            <label htmlFor="name">Name:</label>
            <input
              className="w-full p-[5px] border-b-[gray] border-[none] border-b border-solid"
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
            ></textarea>

            <label htmlFor="link">Link:</label>
            <input
              className="w-full p-[5px] border-b-[gray] border-[none] border-b border-solid"
              type="text"
              id="link"
              name="link"
              value={data.link}
              onChange={handleInputChange}
            />

            <label htmlFor="image">Image:</label>
            <input
              className="w-full p-[5px] border-b-[gray] border-[none] border-b border-solid"
              type="file"
              id="image"
              onChange={handleImageChange}
            />

            <label htmlFor="model">Model:</label>
            <input
              className="w-full p-[5px] border-b-[gray] border-[none] border-b border-solid"
              type="file"
              id="model"
              onChange={handleModelChange}
            />

            <button
              className="bg-teal text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Upload;
