import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { getDownloadURL, ref } from "firebase/storage";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { storage } from "../firebase-config";

const ThreeDViewer = ({ fileUrl }) => {
  const [modelURL, setModelURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#101010"); // Initial background color

  console.log("this passed ==>", fileUrl);

  function extractFileNameFromURL(url) {
    // Split the URL by '/'
    const urlParts = url.split("/");

    // Get the last part which contains the file name and query parameters
    const lastPart = urlParts[urlParts.length - 1];

    // Remove query parameters by splitting again using '?'
    const fileName = lastPart.split("?")[0];

    return fileName;
  }
  const file = extractFileNameFromURL(fileUrl);
  console.log("this function  ==>", file);

  useEffect(() => {
    const fileref = ref(storage, file);
    getDownloadURL(fileref)
      .then((url) => {
        console.log("=>", url);
        setModelURL(url);
      })
      .catch((error) => {
        console.error("Error getting the download URL:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function Model1() {
    const { scene } = useGLTF(modelURL);

    return <primitive object={scene} />;
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Canvas
            style={{
              borderRadius: "15px",
              borderColor: "blue",

              backgroundColor: backgroundColor, // Set the background color dynamically
            }}
            pixelRatio={[1, 2]}
            camera={{ position: [-10, 15, 15], fov: 50 }}
          >
            <ambientLight intensity={1} />
            <Suspense fallback={null}>{modelURL && <Model1 />}</Suspense>
            <OrbitControls />
          </Canvas>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            style={{
              position: "fixed",
              top: "90%",
              left: "100px",
            }}
          />
        </>
      )}
    </>
  );
};

export default ThreeDViewer;
