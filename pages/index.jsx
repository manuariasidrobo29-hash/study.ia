import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    const botMessage = { role: "assistant", content: data.reply };
    setMessages([...newMessages, botMessage]);
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#0b0c10",
      color: "#ffffff",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ color: "#66fcf1" }}>🤖 STUDI.IA</h1>
      <div style={{
        backgroundColor: "#1f2833",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        height: "60vh",
        overflowY: "auto"
      }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.role === "user" ? "#45a29e" : "#c5c6c7" }}>
            <b>{msg.role === "user" ? "Tú" : "STUDI.IA"}:</b> {msg.content}
          </p>
        ))}
      </div>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            marginRight: "10px"
          }}
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#45a29e",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
