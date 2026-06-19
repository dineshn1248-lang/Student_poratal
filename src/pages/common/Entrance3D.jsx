import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntranceScene from "../../components/3d/EntranceScene";
import EntranceOverlay from "../../components/3d/EntranceOverlay";
import { motion, AnimatePresence } from "framer-motion";

export default function Entrance3D() {
  const [animationState, setAnimationState] = useState("SITTING");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBlueFlash, setShowBlueFlash] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setIsTransitioning(true);
    
    // 1.2s: Student is less than 1m from portal, stop animation and trigger energy burst
    setTimeout(() => {
      setShowBlueFlash(true);
    }, 1200);

    // 2.0s: Flash is complete (0.5s scale/fade + 0.3s wait), navigate directly to home
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    // Removed black background as requested
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'transparent' }}>
      
      {/* 3D Scene */}
      <EntranceScene 
        setAnimationState={setAnimationState} 
        animationState={animationState}
        isEntering={isTransitioning}
      />

      {/* HTML Overlay (Text + Interactions) */}
      {!isTransitioning && (
        <EntranceOverlay 
          animationState={animationState} 
          onEnter={handleEnter} 
        />
      )}

      {/* Fullscreen Blue Energy Burst Overlay */}
      {showBlueFlash && (
        <>
          {/* Expanding Portal Ring */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 200, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '20px', 
              height: '20px',
              backgroundColor: '#3b82f6', 
              borderRadius: '50%',
              zIndex: 9999,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 100px 50px #3b82f6' 
            }}
          />
          {/* Solid Blue Screen Fade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#3b82f6',
              zIndex: 9998,
              pointerEvents: 'none'
            }}
          />
        </>
      )}
      
    </div>
  );
}
