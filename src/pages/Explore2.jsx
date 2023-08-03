import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stats } from "@react-three/drei";
import "./explore2.css";

const Explore2 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#101010"); // Initial background color
  const [objectColor, setObjectColor] = useState("#ff0000"); // Initial object color

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile(fileURL);
    }
  };

  function Model() {
    const { scene } = useGLTF(selectedFile);
    const meshRef = useRef();

    useFrame(() => {
      // Update material color dynamically
      if (meshRef.current && meshRef.current.material) {
        meshRef.current.material.color.set(objectColor);
      }
    });

    return <primitive ref={meshRef} object={scene} />;
  }

  return (
    <body>
      <input
        style={{
          position: "fixed",
          top: 0,
          left: "100px",
        }}
        type="file"
        accept=".gltf, .glb, .obj"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <Canvas
          style={{
            borderRadius: "15px",
            borderColor: "blue",
            position: "fixed",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "80%",
            backgroundColor: backgroundColor, // Set the background color dynamically
          }}
          pixelRatio={[1, 2]}
          camera={{ position: [-10, 15, 15], fov: 50 }}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls />
          <Stats />
        </Canvas>
      )}
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
      {/* <Canvas id="c"></Canvas> */}
    </body>
  );
};

export default Explore2;
