import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    setMessages([...messages, { you: input, bot: data.reply }]);
    setInput("");
  }

  return (
    <div style={{ width: "60%", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>🚀 Sales Bot AI</h1>

      {messages.map((m, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p><b>You:</b> {m.you}</p>
          <p><b>Bot:</b> {m.bot}</p>
          <hr/>
        </div>
      ))}

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask something…"
        style={{ width: "70%", padding: 10, fontSize: 16 }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px", marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
}
