import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Image, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import StudentCharacter from "./StudentCharacter";
import * as THREE from "three";
import gsap from "gsap";
import bgImage from "../../assets/bg.png";

// 2.5D Projection Background & Shadow Catcher
function ProjectionBackground() {
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -50]);

  return (
    <group>
      <Suspense fallback={null}>
        <Image 
          url={bgImage} 
          position={[0, camera.position.y, -50]} 
          scale={[width * 1.05, height * 1.05]} 
          transparent={true} 
          opacity={1}
          toneMapped={false}
        />
      </Suspense>

      {/* Shadow Catcher precisely calculated for perspective alignment */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Destination Marker & Portal
function DestinationPortal({ isArrived, isEntering }) {
  // The user requested to completely remove the small blue colored circle.
  // We return null so the 3D portal object no longer renders, 
  // while keeping the component intact so it doesn't break EntranceScene.
  return null;
}

export default function EntranceScene({ setAnimationState, animationState, isEntering }) {
  const cameraRef = useRef();
  const isArrived = animationState === "ARRIVED";

  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera 
        makeDefault 
        ref={cameraRef}
        position={[-2, 2, 20]} 
        fov={45} 
      />
      
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight 
        castShadow 
        position={[5, 15, 35]} 
        intensity={2.0} 
        color="#ffffff"
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      
      <ProjectionBackground />
      <DestinationPortal isArrived={isArrived} isEntering={isEntering} />
      
      <Suspense fallback={null}>
        <StudentCharacter 
          cameraRef={cameraRef} 
          setAnimationState={setAnimationState} 
          isEntering={isEntering}
        />
      </Suspense>
      
      <Environment preset="city" />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1.1} mipmapBlur intensity={1.2} />
        <DepthOfField target={[0, -10, 10]} focalLength={0.01} bokehScale={0.1} height={480} />
      </EffectComposer>
    </Canvas>
  );
}
