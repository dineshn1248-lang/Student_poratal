import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";
import "./AIChat.css";

const NVIDIA_API_KEY = "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";
const NVIDIA_API_URL = "/api/nvidia/v1/chat/completions";
const MODEL = "meta/llama-3.1-8b-instruct";

const SYSTEM_PROMPT = `You are an intelligent AI assistant for a Student Portal system.
You help students, HODs, faculty, and principals with:
- Attendance queries and advice
- Backlog management guidance
- Exam and semester information
- Academic performance tips
- Department and section queries
- General academic help
Keep responses concise, friendly, and helpful. Use bullet points when listing items.`;

export default function AIChat() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! 👋 I'm your Student Portal AI. Ask me anything about attendance, backlogs, exams, or departments!" }
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  /* Auto-scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    /* Build message history for API (strip first assistant greeting for API) */
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...newMessages.map((m) => ({ role: m.role, content: m.content })),
    ];

    try {
      const response = await fetch(NVIDIA_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: apiMessages,
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 1024,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      /* Handle streaming */
      const reader  = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiText    = "";

      /* Add empty assistant message to fill in */
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const dataStr = line.replace("data: ", "").trim();
          if (dataStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(dataStr);
            const delta  = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              aiText += delta;
              /* Update last message in real-time */
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: aiText };
                return updated;
              });
            }
          } catch {
            /* ignore parse errors on partial chunks */
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ Error: ${err.message}. Please try again.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* FLOATING BUBBLE */}
      {!open && (
        <button className="ai-bubble" onClick={() => setOpen(true)} title="AI Assistant">
          <FaRobot />
          <span className="ai-bubble-label">AI</span>
        </button>
      )}

      {/* CHAT WINDOW */}
      {open && (
        <div className="ai-window">
          {/* HEADER */}
          <div className="ai-header">
            <div className="ai-header-left">
              <div className="ai-avatar"><FaRobot /></div>
              <div>
                <p className="ai-name">Portal AI</p>
                <p className="ai-status">● Online — Llama 3.1</p>
              </div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="ai-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ${msg.role === "user" ? "user" : "bot"}`}>
                {msg.role === "assistant" && (
                  <div className="ai-msg-avatar"><FaRobot /></div>
                )}
                <div className="ai-msg-bubble">
                  {msg.content || <span className="ai-typing">Thinking<span className="dots">...</span></span>}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.content === "" && (
              <div className="ai-msg bot">
                <div className="ai-msg-avatar"><FaRobot /></div>
                <div className="ai-msg-bubble ai-typing-bubble">
                  <span className="ai-dot" /><span className="ai-dot" /><span className="ai-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="ai-input-row">
            <textarea
              className="ai-input"
              placeholder="Ask about attendance, backlogs, exams..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={loading}
            />
            <button
              className="ai-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              {loading ? <FaSpinner className="ai-spin" /> : <FaPaperPlane />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
