import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaThLarge, FaUser, FaCalendarCheck, FaFileInvoiceDollar,
  FaGraduationCap, FaBell, FaSignOutAlt, FaBars, FaRobot, FaBriefcase,
  FaMicrophone, FaPaperPlane, FaTimes, FaVolumeUp, FaVolumeMute
} from "react-icons/fa";
import "./Student.css";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";

const renderMessageText = (text) => {
  if (!text) return null;
  
  const lines = text.split("\n");
  let inList = false;
  const elements = [];
  let listItems = [];
  
  const parseInlineStyles = (lineText) => {
    const parts = lineText.split("**");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      const listContent = trimmed.substring(2);
      listItems.push(
        <li key={idx} style={{ marginLeft: '14px', marginBottom: '4px', listStyleType: 'disc', color: 'inherit' }}>
          {parseInlineStyles(listContent)}
        </li>
      );
    } else {
      if (inList) {
        elements.push(<ul key={`list-${idx}`} style={{ margin: '6px 0', paddingLeft: '12px' }}>{listItems}</ul>);
        inList = false;
        listItems = [];
      }
      if (trimmed) {
        elements.push(<p key={idx} style={{ margin: '4px 0', lineHeight: '1.4' }}>{parseInlineStyles(trimmed)}</p>);
      } else {
        elements.push(<div key={idx} style={{ height: '6px' }} />);
      }
    }
  });

  if (inList) {
    elements.push(<ul key="list-end" style={{ margin: '6px 0', paddingLeft: '12px' }}>{listItems}</ul>);
  }

  return elements;
};

export default function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Floating AI Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", message: "Hi! Ask me anything about your university records or syllabus." }
  ]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    if (!token) {
        navigate("/student-login");
        return;
    }
    setUserName(storedName || "Student");

    // Initialize sidebar collapsed on smaller viewports initially
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  }, []);

  // Auto scroll float chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleLogout = () => {
    // Cancel any speech synthesis on logout
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    localStorage.clear();
    navigate("/student-login");
  };

  const handleNavItemClick = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  // Text-To-Speech (TTS) Voice Engine
  const speakText = (text) => {
    if (!voiceEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speech-To-Text (STT) voice recognition capturing
  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setChatMsg(speechResult);
      handleSendFloatMessage(speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSendFloatMessage = async (textToSend) => {
    const activeText = textToSend || chatMsg;
    if (!activeText.trim()) return;

    const userMessage = { role: "user", message: activeText };
    setMessages(prev => [...prev, userMessage]);
    setChatMsg("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://localhost:5000/api'}/student/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: activeText })
      });

      if (!res.ok) throw new Error("Connection lost");
      const data = await res.json();
      
      const botResponse = data.response || "No reply received.";
      setMessages(prev => [...prev, { role: "bot", message: botResponse }]);
      
      // AI replies with sound!
      speakText(botResponse);
    } catch (err) {
      const errorMsg = "Unable to connect to study server.";
      setMessages(prev => [...prev, { role: "bot", message: errorMsg }]);
      speakText(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { label: "Dashboard", path: "/student/dashboard", icon: <FaThLarge /> },
    { label: "Profile", path: "/student/profile", icon: <FaUser /> },
    { label: "Attendance", path: "/student/attendance", icon: <FaCalendarCheck /> },
    { label: "Fees", path: "/student/fees", icon: <FaFileInvoiceDollar /> },
    { label: "Results", path: "/student/results", icon: <FaGraduationCap /> },
    { label: "Examinations", path: "/student/exams", icon: <FaGraduationCap /> },
    { label: "Internships", path: "/student/internships", icon: <FaBriefcase /> },
    { label: "AI Assistant", path: "/student/ai-chat", icon: <FaRobot /> },
    { label: "Notices", path: "/student/announcements", icon: <FaBell /> },
  ];

  return (
    <div className="std-portal-wrapper">
      <aside className={`std-sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
        <div className="std-sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <img src={nrupathungaLogo} alt="Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
          {sidebarOpen && (
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'white', margin: 0, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Nrupathunga</h3>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700' }}>Student Portal</span>
            </div>
          )}
        </div>
        <ul className="std-nav-list">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`std-nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              {item.icon} <span>{item.label}</span>
            </Link>
          ))}
        </ul>
      </aside>

      <main className={`std-main-content ${!sidebarOpen ? "expanded" : ""}`}>
        <header className="std-topbar">
          <div className="std-top-left">
            <button className="std-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#eef2ff', color: '#4f46e5' }}>
              <FaBars />
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Nrupathunga University Portal</h2>
          </div>
          <div className="std-top-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{userName}</span>
             <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                <FaUser />
             </div>
             {/* Red Navbar Quick Logout Button */}
             <button 
               onClick={handleLogout} 
               style={{ 
                 background: '#ef4444', 
                 color: 'white', 
                 border: 'none', 
                 padding: '8px 14px', 
                 borderRadius: '8px', 
                 fontSize: '14px', 
                 fontWeight: '700', 
                 cursor: 'pointer', 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '6px',
                 transition: 'all 0.2s ease-in-out'
               }}
               onMouseOver={(e) => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)'; }}
               onMouseOut={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
               className="topbar-logout-btn"
             >
               <FaSignOutAlt /> <span>Logout</span>
             </button>
          </div>
        </header>
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {children}
        </div>
      </main>

      {/* Global Bottom-Right AI Assistant Widget */}
      <div className="std-ai-widget">
        {chatOpen && (
          <div className="std-chat-box">
            <div className="std-chat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaRobot size={20} />
                <span style={{ fontWeight: '700', fontSize: '14px' }}>Study AI</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={() => {
                    setVoiceEnabled(!voiceEnabled);
                    if (voiceEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                  }}
                  style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  title={voiceEnabled ? "Mute Voice Response" : "Unmute Voice Response"}
                >
                  {voiceEnabled ? <FaVolumeUp size={16} /> : <FaVolumeMute size={16} />}
                </button>
                <button onClick={() => setChatOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
            <div className="std-chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`std-msg ${m.role === 'user' ? 'user' : 'bot'}`}>
                  {renderMessageText(m.message)}
                </div>
              ))}
              {loading && (
                <div className="std-msg bot typing-indicator" style={{ display: 'inline-block', width: '40px' }}>
                  <span></span><span></span><span></span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="std-chat-input" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input 
                type="text" 
                placeholder="Ask AI..." 
                value={chatMsg} 
                onChange={(e) => setChatMsg(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendFloatMessage()} 
                disabled={loading}
              />
              {/* Mic Speech Recognition Button */}
              <button 
                type="button"
                className={`float-mic-btn ${isListening ? 'listening' : ''}`}
                onClick={startVoiceInput}
                disabled={loading}
                title="Speak to AI"
                style={{
                  background: isListening ? '#ef4444' : '#f1f5f9',
                  color: isListening ? 'white' : '#475569',
                  border: 'none',
                  borderRadius: '10px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                <FaMicrophone />
              </button>
              <button className="std-send-btn" onClick={() => handleSendFloatMessage()} disabled={loading} style={{ minWidth: '36px' }}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
        <button className="std-ai-btn" onClick={() => setChatOpen(!chatOpen)} title="Chat with Study AI"><FaRobot /></button>
      </div>
    </div>
  );
}
