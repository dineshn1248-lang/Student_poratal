import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, BookOpen, GraduationCap, Calendar, Briefcase, Landmark, Clock, ChevronRight, User } from 'lucide-react';
import '../../styles/MegaMenu.css';

export default function AboutMegaMenu({ onClose }) {
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleNavigate = (path) => {
    if (path !== '#') {
      navigate(path);
      if (onClose) onClose();
    }
  };

  const sections = [
    {
      id: 'history_overview',
      title: "History and University Overview",
      description: "Mission, vision, core values, and decades of academic excellence.",
      icon: <Landmark size={24} />,
      path: "/about/history"
    },
    {
      id: 'academics',
      title: "Academics",
      description: "Explore our undergraduate and postgraduate programs.",
      icon: <BookOpen size={24} />,
      path: "/about/academics"
    },
    {
      id: 'admissions',
      title: "Admissions",
      description: "Process, eligibility, and important dates.",
      icon: <GraduationCap size={24} />,
      path: "/admissions"
    },
    {
      id: 'events',
      title: "Events & Activities",
      description: "Seminars, fests, and cultural showcases.",
      icon: <Calendar size={24} />,
      path: "/about/events"
    },
    {
      id: 'placements',
      title: "Placements",
      description: "Career services and top recruitment partners.",
      icon: <Briefcase size={24} />,
      path: "/about/placements"
    }
  ];

  const handleMouseEnter = (id) => {
    setActiveSubmenu(id);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const handleClick = (e, section) => {
    if (section.hasSubmenu) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        setActiveSubmenu(activeSubmenu === section.id ? null : section.id);
      }
    } else {
      handleNavigate(section.path);
    }
  };

  return (
    <motion.div 
      className="mega-menu-overlay"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mega-menu-left">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="mega-menu-card-wrapper"
            onMouseEnter={() => handleMouseEnter(section.id)}
            style={{ position: 'relative' }}
          >
            <div 
              className={`mega-menu-card ${activeSubmenu === section.id && section.hasSubmenu ? 'active' : ''}`}
              onClick={(e) => handleClick(e, section)}
            >
              <div className="mega-menu-card-icon">
                {section.icon}
              </div>
              <div className="mega-menu-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>{section.title}</h4>
                  {section.hasSubmenu && <ChevronRight size={16} className="submenu-arrow" />}
                </div>
                <p>{section.description}</p>
              </div>
            </div>

            {/* Desktop Nested Submenu */}
            <AnimatePresence>
              {section.hasSubmenu && activeSubmenu === section.id && window.innerWidth > 900 && (
                <motion.div 
                  className="mega-submenu"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul>
                    {section.submenu.map((item, idx) => (
                      <li key={idx} onClick={() => handleNavigate(item.path)}>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Nested Submenu (Accordion) */}
            <AnimatePresence>
              {section.hasSubmenu && activeSubmenu === section.id && window.innerWidth <= 900 && (
                <motion.div 
                  className="mobile-submenu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <ul>
                    {section.submenu.map((item, idx) => (
                      <li key={idx} onClick={() => handleNavigate(item.path)}>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
