import React from "react";
import { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { Html } from "@react-three/drei";

import { useRef } from "react";

const Blackholes = (isMobile) => {
  const blackhole = useGLTF("./desktop_pc/blackhole/scene.gltf");
  // const controlsRef = useRef();

  // const handleResetRotation = () => {
  //   if (controlsRef.current) {
  //     controlsRef.current.reset();
  //   }
  // };

  return (
    <group>
      <mesh>
        <primitive
          object={blackhole.scene}
          scale={isMobile ? 1 : 0.5}
          position={isMobile ? [-1, -1, -1] : [0, -3.25, -1.5]}
          rotation={[0, 0, 0]}
        />
      </mesh>
      {/* <Html>
        <div className="absolute bottom-4 left-4">
          <button
            onClick={handleResetRotation}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reset Rotation
          </button>
        </div>
      </Html> */}
    </group>
  );
};

const BlackholeCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  });

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [0, 2, 5], fov: 100 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Blackholes isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BlackholeCanvas;
