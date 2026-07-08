import { useState } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const text = await response.text();
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { answer: text || "No response returned." };
      }

      if (!response.ok) {
        throw new Error(data.error || data.answer || "The AI service returned an error.");
      }

      setAnswer(data.answer || "No response returned.");
    } catch (err) {
      console.error(err);
      setAnswer(err.message || "Error connecting to AI.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <textarea
        rows="4"
        placeholder="Ask the AI anything..."
        className="w-full border rounded-xl p-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 bg-slate-100 rounded-xl p-5">
          <h3 className="font-bold mb-3">🤖 AI Response</h3>
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
}