import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import gsap from "gsap";
import { useFBX, useAnimations } from "@react-three/drei";

export default function StudentCharacter({ cameraRef, setAnimationState, isEntering }) {
  const groupRef = useRef();
  
  // Load the mannequin FBX and its animations
  const scene = useFBX("/models/student.fbx");
  const animations = scene.animations || [];
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Enable shadows for any loaded mesh
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    // Attempt to play a walking animation if available
    if (actions) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        // Specifically look for 'walk' and avoid 'run'
        const walkAnimName = actionNames.find(n => n.toLowerCase().includes('walk')) || actionNames[0];
        if (walkAnimName && actions[walkAnimName]) {
          const walkAction = actions[walkAnimName];
          walkAction.reset().fadeIn(0.5).play();
          walkAction.setEffectiveTimeScale(0.8); // Natural, slow walk speed
        }
      }
    }
  }, [actions]);

  // GSAP Cinematic Sequence for Matte Painting Illusion
  useEffect(() => {
    if (!groupRef.current || !cameraRef.current) return;

    // Start on the right-side pathway
    groupRef.current.position.set(3.5, -1.8, 15);
    
    // Look straight ahead along the right path
    groupRef.current.lookAt(3.5, -1.8, -50);

    // Start camera slightly to the side for a cinematic over-the-shoulder view
    cameraRef.current.position.set(1.5, 2.5, 26);

    const tl = gsap.timeline();

    // Walk straight down the path
    tl.to(groupRef.current.position, {
      x: 3.5, // Keep him perfectly on the path heading to the blue portal
      y: -1.8, // Do NOT animate Y downwards, stay on the 3D floor
      z: 4, // Stop walking at z=4 so he doesn't float into the background perspective
      duration: 12,
      ease: "none", // Smooth linear walk
      onStart: () => setAnimationState("WALKING")
    });

    // The camera slowly zooms in and pans right as the avatar walks
    gsap.to(cameraRef.current.position, {
      x: 0.5, 
      z: 14,  // Don't zoom in too tightly at the end
      duration: 12,
      ease: "none",
    });

    // Scene 5: Reaches destination
    tl.to({}, {
      duration: 0.1,
      onComplete: () => {
        setAnimationState("ARRIVED");
        
        // Stop walking and play idle if available
        if (actions) {
          const actionNames = Object.keys(actions);
          const idleAnimName = actionNames.find(n => n.toLowerCase().includes('idle'));
          if (idleAnimName && actions[idleAnimName]) {
            Object.values(actions).forEach(action => action.fadeOut(0.5));
            actions[idleAnimName].reset().fadeIn(0.5).play();
          } else {
            Object.values(actions).forEach(action => action.stop());
          }
        }
      }
    });

    return () => {
      tl.kill();
      if (cameraRef.current) {
        gsap.killTweensOf(cameraRef.current.position);
      }
    };
  }, []); // Empty dependency array guarantees it only runs ONCE on mount!

  // Handle fly-through when user presses Space
  useEffect(() => {
    if (isEntering && cameraRef.current && groupRef.current) {
      
      // Switch back to walking animation to walk into the portal
      if (actions) {
        const actionNames = Object.keys(actions);
        const walkAnimName = actionNames.find(n => n.toLowerCase().includes('walk')) || actionNames[0];
        if (walkAnimName && actions[walkAnimName]) {
          Object.values(actions).forEach(action => action.fadeOut(0.2));
          actions[walkAnimName].reset().fadeIn(0.2).play();
          actions[walkAnimName].setEffectiveTimeScale(1.5); // Fast walk
        }
      }

      // Make the student walk into the portal
      gsap.to(groupRef.current.position, {
        x: 0,
        z: -28, // Move to portal location
        duration: 1.5,
        ease: "power2.in"
      });

      // Camera follows behind the student without hitting their back
      gsap.to(cameraRef.current.position, {
        x: 0,
        z: -15, // Zoom in behind the student
        duration: 1.5,
        ease: "power2.in"
      });
    }
  }, [isEntering, cameraRef]);

  return (
    <group ref={groupRef} scale={0.025}>
      <primitive object={scene} position={[0, 0, 0]} />
    </group>
  );
}
