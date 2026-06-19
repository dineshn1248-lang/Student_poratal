import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EntranceOverlay({ animationState, onEnter }) {
  const showText = animationState === "ARRIVED";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && showText) {
        onEnter();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showText, onEnter]);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10
      }}
      onClick={() => showText && onEnter()}
    >
      <AnimatePresence>
        {showText && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
          >
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                fontSize: '22px',
                color: 'white',
                fontWeight: 'bold',
                fontFamily: "Inter, sans-serif",
                letterSpacing: '0.1em',
                textShadow: "0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6",
                textTransform: 'uppercase',
                margin: 0,
                padding: 0
              }}
            >
              PRESS SPACE TO ENTER
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
