import { useState } from "react";
import ReactMarkdown from "react-markdown";
export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-1">🧠 OpenMind AI Agent</h1>
      <h4 className="text-sm opacity-60 mb-4">
        Created using Next.js TailwindCSS & Google AI Model.
      </h4>
      <textarea
        className="border p-2 w-full max-w-md rounded"
        rows="4"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={sendMessage}
      >
        Send
      </button>
      {reply && (
        <div className="mt-4 p-4 bg-gray-100 rounded max-w-md w-full">
          <strong>Agent:</strong> <ReactMarkdown>{reply}</ReactMarkdown>
        </div>
      )}
    </main>
  );
}
