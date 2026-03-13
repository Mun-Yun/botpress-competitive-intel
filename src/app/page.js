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
        position: "relative",
        backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.9) 100%)",
        }} />
        <div style={{
          position: "relative", zIndex: 2,
          width: 400,
          textAlign: "center",
          padding: "0 24px",
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#e63926",
            marginBottom: 20,
          }}>
            {"\u25AA"} Botpress
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 42,
            fontWeight: 400,
            color: "rgba(255,255,255,0.9)",
            margin: "0 0 8px",
            lineHeight: 1.1,
          }}>
            Competitive Intelligence
          </h1>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 40,
          }}>
            Internal access only
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
                padding: "14px 0",
                background: "transparent",
                border: "none",
                borderBottom: error ? "1px solid #e63926" : "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.9)",
                fontSize: 15,
                outline: "none",
                marginBottom: 12,
                fontFamily: "'Space Grotesk', sans-serif",
                textAlign: "center",
                letterSpacing: "0.05em",
              }}
            />
            {error && (
              <p style={{
                color: "#e63926",
                fontSize: 11,
                marginBottom: 8,
                fontFamily: "'Space Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                Incorrect password
              </p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 0",
                background: "#e63926",
                color: "#fff",
                border: "none",
                borderRadius: 2,
                fontSize: 10,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginTop: 8,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.opacity = "0.85"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
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
