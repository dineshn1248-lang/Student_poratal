import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolledMiddle, setIsScrolledMiddle] = useState(false);

  useEffect(() => {
    // Hide back button on home page and login/auth related pages
    const hiddenPaths = [
      '/', '/home', '/login-portal', '/student-login', 
      '/staff-login', '/student-register', '/forgot-password', '/reset-password'
    ];
    
    // Hide if it's a hidden path OR if we are inside any dashboard portal
    if (
      hiddenPaths.includes(location.pathname) || 
      location.pathname.startsWith('/parent') ||
      location.pathname.startsWith('/student') ||
      location.pathname.startsWith('/hod') ||
      location.pathname.startsWith('/principal') ||
      location.pathname.startsWith('/faculty')
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Calculate how far down the user can scroll
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // If scrolled past the top 150px AND not within 150px of the bottom, hide the button
      if (scrollY > 150 && scrollY < maxScroll - 150) {
        setIsScrolledMiddle(true);
      } else {
        setIsScrolledMiddle(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]); // Re-run when path changes because document height might change

  return (
    <AnimatePresence>
      {isVisible && !isScrolledMiddle && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          style={{
            position: 'fixed',
            top: '100px',
            right: '40px',
            padding: '12px 24px',
            borderRadius: '30px',
            background: '#1e293b',
            color: 'white',
            border: '2px solid #3b82f6',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            zIndex: 9999
          }}
        >
          <ArrowLeft size={20} color="#60a5fa" />
          <span>Go Back</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
