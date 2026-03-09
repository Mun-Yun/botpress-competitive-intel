"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";

const SITE_PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD || "botpress2026";

export default function Home() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("bp-intel-auth");
    if (saved === "true") setAuthed(true);
    setChecking(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem("bp-intel-auth", "true");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (checking) return null;

  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0f1a",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        <div style={{
          background: "#111827",
          border: "1px solid #1e293b",
          borderRadius: 16,
          padding: "40px 36px",
          width: 380,
          textAlign: "center",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: 22,
          }}>🔒</div>
          <h1 style={{ color: "#e2e8f0", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
            Competitive Intelligence
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 24 }}>
            Internal access only — enter the team password
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              autoFocus
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "#1a2236",
                border: error ? "1px solid #ef4444" : "1px solid #1e293b",
                borderRadius: 10,
                color: "#e2e8f0",
                fontSize: 14,
                outline: "none",
                marginBottom: 12,
                fontFamily: "inherit",
              }}
            />
            {error && (
              <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 8 }}>
                Incorrect password. Try again.
              </p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 0",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}
