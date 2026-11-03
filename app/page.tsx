"use client";

import { useChat } from "ai/react";
import { useState } from "react";

export default function Home() {
  const [platform, setPlatform] = useState("YouTube");
  const system = `You are Nexorian AI Content Creator. Generate high-integrity, high-quality content ideas, scripts, hooks, and optimization advice for ${platform}. Prioritize authenticity, value, and efficiency. Be precise.`;

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { context: system },
  });

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">Nexorian AI Content Creator</h1>
      <p className="mb-6 text-lg">Ideate, script, and optimize for YouTube, TikTok, Instagram and more.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Platform</label>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="border p-2 rounded">
          <option>YouTube</option>
          <option>TikTok</option>
          <option>Instagram</option>
          <option>LinkedIn</option>
          <option>Blog / Newsletter</option>
        </select>
      </div>

      <div className="border rounded p-4 h-96 overflow-y-auto mb-4 bg-white/70">
        {messages.length === 0 && <p className="text-gray-500">Describe the content you want to create...</p>}
        {messages.map((m) => (
          <div key={m.id} className="mb-3">
            <strong>{m.role === "user" ? "You" : "Nexorian"}:</strong>
            <div className="whitespace-pre-wrap mt-1">{m.content}</div>
          </div>
        ))}
        {isLoading && <div className="text-amber-700">Generating...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="e.g. 60-second TikTok script about sovereign wealth tools"
          className="flex-1 border p-3 rounded"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} className="bg-amber-700 text-white px-6 py-3 rounded font-medium">
          Create
        </button>
      </form>
    </main>
  );
}