import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { collection, getDoc, doc } from "firebase/firestore";
import { ref, updateMetadata, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";
import ThreeDViewer from "../components/ThreeDViewer";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./preview.css";

const Preview = () => {
  const { id, suid } = useParams();
  const [docData, setDocData] = useState(null);
  const { currentUser } = useContext(AuthContext);
  console.log("this ==>", suid);

  useEffect(() => {
    const fetchDocData = async (id, suid) => {
      try {
        const docRef = doc(db, "users", id, "submissions", suid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setDocData(docSnapshot.data());
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.log("Error fetching document:", error);
      }
    };

    fetchDocData(id, suid);
  }, [id, suid]);

  return (
    <div className="back awesome ">
      <div className="preview-section">
        <h2 className="preview-heading">Preview</h2>
        <div className="preview-content">
          {docData && (
            <div className="canvas-container">
              <ThreeDViewer fileUrl={docData.file} />
            </div>
          )}
          {docData && (
            <div className="fields-container">
              <label>Name:</label>
              <input type="text" value={docData.name} readOnly />
              <label>Link:</label>
              <input type="text" value={docData.file} readOnly />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Preview;
