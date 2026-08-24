import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json().catch(() => ({}));

      // The previous version did `setReply(data.reply)` unconditionally. On any
      // failure that stored `undefined`, the reply block never rendered, and the
      // page showed no spinner and no message — the button simply looked dead.
      if (!res.ok || !data.reply) {
        setError(data.detail ? `${data.error} (${data.detail})` : data.error || `Request failed (${res.status})`);
        return;
      }

      setReply(data.reply);
    } catch (e) {
      setError(`Could not reach the server: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-1">🧠 OpenMind AI Agent</h1>
      <h4 className="text-sm opacity-60 mb-4">
        Next.js and Tailwind CSS, answering through Google&apos;s Gemini API.
      </h4>

      <textarea
        className="border p-2 w-full max-w-md rounded disabled:opacity-60"
        rows="4"
        placeholder="Ask me anything…  (Ctrl+Enter to send)"
        value={input}
        disabled={loading}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendMessage();
        }}
      />

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={sendMessage}
        disabled={loading || !input.trim()}
      >
        {loading ? "Thinking…" : "Send"}
      </button>

      {error && (
        <div
          role="alert"
          data-testid="agent-error"
          className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded max-w-md w-full text-sm"
        >
          {error}
        </div>
      )}

      {reply && (
        <div data-testid="agent-reply" className="mt-4 p-4 bg-gray-100 rounded max-w-md w-full">
          <strong>Agent:</strong>
          <ReactMarkdown>{reply}</ReactMarkdown>
        </div>
      )}
    </main>
  );
}
