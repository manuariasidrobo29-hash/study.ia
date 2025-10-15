import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{
      fontFamily: "Arial",
      background: "#0f172a",
      color: "white",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1>🤖 Bienvenido a STUDI.IA</h1>
      <p>Tu asistente de inteligencia artificial</p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu pregunta aquí..."
        rows={4}
        style={{ width: "300px", marginBottom: "10px", borderRadius: "10px", padding: "8px" }}
      />
      <button
        onClick={handleSend}
        style={{ background: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px" }}
      >
        Enviar
      </button>
      {response && (
        <div style={{ marginTop: "20px", maxWidth: "400px", textAlign: "center" }}>
          <strong>STUDI.IA:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

