import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaUser, FaLightbulb, FaBookReader, FaQuestionCircle, FaDollarSign, FaMicrophone, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import StudentLayout from "./StudentLayout";
import "./Student.css";

const QUICK_PROMPTS = [
  { text: "My Attendance", icon: <FaQuestionCircle /> },
  { text: "My Semester Marks", icon: <FaBookReader /> },
  { text: "My Timetable", icon: <FaQuestionCircle /> },
  { text: "My Fees", icon: <FaDollarSign /> },
  { text: "Upcoming Exams", icon: <FaBookReader /> },
  { text: "Placement Status", icon: <FaLightbulb /> },
  { text: "Backlog Details", icon: <FaBookReader /> }
];

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
        <li key={idx} style={{ marginLeft: '16px', marginBottom: '6px', listStyleType: 'disc', color: 'inherit' }}>
          {parseInlineStyles(listContent)}
        </li>
      );
    } else {
      if (inList) {
        elements.push(<ul key={`list-${idx}`} style={{ margin: '8px 0', paddingLeft: '16px' }}>{listItems}</ul>);
        inList = false;
        listItems = [];
      }
      if (trimmed) {
        elements.push(<p key={idx} style={{ margin: '6px 0', lineHeight: '1.5' }}>{parseInlineStyles(trimmed)}</p>);
      } else {
        elements.push(<div key={idx} style={{ height: '8px' }} />);
      }
    }
  });

  if (inList) {
    elements.push(<ul key="list-end" style={{ margin: '8px 0', paddingLeft: '16px' }}>{listItems}</ul>);
  }

  return elements;
};

export default function StudentAIChat() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am your Nrupathunga University Academic AI Assistant. Ask me anything about your semester timetable, attendance shortage rules, subject exams, or outstanding fees!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Stop reading voice on component unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text) => {
    if (!voiceEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

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
      setInputVal(speechResult);
      sendMessage(speechResult);
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

  const sendMessage = async (text) => {
    const textToSend = text || inputVal;
    if (!textToSend.trim()) return;

    // User message
    const userMsg = {
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://localhost:5000/api'}/student/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      const botMsgText = data.response || "I am processing that. Could you try rephrasing?";
      const botMsg = {
        sender: "bot",
        text: botMsgText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      
      // Speak AI response!
      speakText(botMsgText);
    } catch (err) {
      const errorText = "Connectivity issues to Nrupathunga AI Server. Please ensure the backend is running.";
      const errorMsg = {
        sender: "bot",
        text: errorText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
      speakText(errorText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="std-chat-page-container">
        <div className="std-panel-header" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaRobot color="#4f46e5" /> Academic AI Assistant
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
              Ask questions about your classes, exams, internal scores, or ask for study recommendations.
            </p>
          </div>
          {/* Mute/Unmute Audio readout toggle */}
          <button 
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (voiceEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel();
            }}
            style={{
              background: voiceEnabled ? "#eef2ff" : "#f1f5f9",
              border: "1px solid",
              borderColor: voiceEnabled ? "#cbd5e1" : "#e2e8f0",
              color: voiceEnabled ? "#4f46e5" : "#64748b",
              padding: "10px 16px",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "0.2s"
            }}
            title={voiceEnabled ? "Mute Voice Out" : "Unmute Voice Out"}
          >
            {voiceEnabled ? (
              <>
                <FaVolumeUp size={16} /> <span>Voice Readout On</span>
              </>
            ) : (
              <>
                <FaVolumeMute size={16} /> <span>Voice Readout Muted</span>
              </>
            )}
          </button>
        </div>

        <div className="std-chat-layout-card">
          {/* Chat Window Messages */}
          <div className="std-chat-body-scroller">
            {messages.map((m, index) => (
              <div key={index} className={`chat-row-msg ${m.sender}`}>
                <div className="chat-avatar-icon">
                  {m.sender === "bot" ? <FaRobot /> : <FaUser />}
                </div>
                <div className="chat-balloon-content">
                  <div className="chat-balloon-bubble">
                    {renderMessageText(m.text)}
                  </div>
                  <span className="chat-balloon-time">{m.time}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-row-msg bot loading">
                <div className="chat-avatar-icon"><FaRobot /></div>
                <div className="chat-balloon-content">
                  <div className="chat-balloon-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="chat-prompt-chips-row">
            {QUICK_PROMPTS.map((p, index) => (
              <button key={index} className="prompt-chip-btn" onClick={() => sendMessage(p.text)}>
                {p.icon} <span>{p.text}</span>
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form className="chat-input-bar-form" onSubmit={(e) => { e.preventDefault(); sendMessage(inputVal); }} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Ask Nrupathunga AI or speak into microphone..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={loading}
              required
            />
            {/* Mic speech Recognition button */}
            <button 
              type="button"
              onClick={startVoiceInput}
              disabled={loading}
              className={`mic-recognition-btn ${isListening ? 'listening' : ''}`}
              title="Speak voice prompt"
              style={{
                background: isListening ? "#ef4444" : "#f1f5f9",
                color: isListening ? "white" : "#475569",
                border: "none",
                borderRadius: "12px",
                width: "46px",
                height: "46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
                transition: "0.2s"
              }}
            >
              <FaMicrophone />
            </button>
            <button type="submit" className="chat-send-submit-btn" disabled={loading}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
}
