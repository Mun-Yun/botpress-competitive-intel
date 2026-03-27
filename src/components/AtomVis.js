"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { competitors, CAT_COLORS, LOGO_DOMAINS, THEME, GLASS, toSlug } from "@/lib/data";

// ── THREAT SCORE ──
// Higher score = closer competitor to Botpress
// Botpress profile: AI-First, ~$50M rev, resolution/outcome pricing, high AI depth
const BOTPRESS_REVENUE = 50; // ~$50M ARR estimate

function calculateThreatScore(c) {
  // AI maturity (30%) — higher = closer competitor
  const aiComponent = (c.aiScore / 10) * 30;

  // Automation depth (25%) — higher = closer
  const autoComponent = (c.automationDepth / 10) * 25;

  // Market breadth (20%) — mid-range (4-7) is closest to Botpress's sweet spot
  const breadthDist = Math.abs(c.marketBreadth - 5.5) / 5;
  const breadthComponent = (1 - breadthDist) * 20;

  // Revenue similarity (15%) — closer to Botpress ~$50M = higher score
  const rev = c.revenue || 50;
  const revRatio = Math.min(rev, BOTPRESS_REVENUE) / Math.max(rev, BOTPRESS_REVENUE);
  const revComponent = revRatio * 15;

  // Pricing model (10%) — outcome/resolution-based pricing = closer
  const pricingKeywords = ["resolution", "outcome", "conversation", "usage", "per-"];
  const model = (c.pricingModel || "").toLowerCase();
  const pricingMatch = pricingKeywords.some(k => model.includes(k)) ? 1 : 0.3;
  const pricingComponent = pricingMatch * 10;

  return aiComponent + autoComponent + breadthComponent + revComponent + pricingComponent;
}

// Precompute threat scores and sort
function prepareAtoms(comps) {
  const GOLDEN_ANGLE = 137.508 * (Math.PI / 180);

  return comps.map((c, i) => {
    const score = calculateThreatScore(c);
    // Map score to distance: high score = close, low score = far
    // Score range is roughly 20–90, map to distance 0.15–0.85 of radius
    const normalizedScore = Math.max(0, Math.min(100, score));
    const distance = 0.15 + (1 - normalizedScore / 100) * 0.7;

    // Angle using golden angle for even distribution
    const angle = i * GOLDEN_ANGLE;

    // Atom size: 14–28px based on revenue (log scale)
    const rev = c.revenue || 10;
    const size = 14 + Math.min(14, Math.log10(rev) * 4);

    // Random vibration parameters
    const vibFreqX = 0.3 + Math.random() * 0.7;
    const vibFreqY = 0.4 + Math.random() * 0.6;
    const vibAmpX = 1.5 + Math.random() * 3;
    const vibAmpY = 1.5 + Math.random() * 3;
    const phaseX = Math.random() * Math.PI * 2;
    const phaseY = Math.random() * Math.PI * 2;

    return {
      ...c,
      score,
      distance,
      angle,
      size,
      vibFreqX, vibFreqY, vibAmpX, vibAmpY, phaseX, phaseY,
      color: CAT_COLORS[c.category] || "#888",
      logoDomain: LOGO_DOMAINS[c.name] || null,
    };
  }).sort((a, b) => b.score - a.score);
}

export default function AtomVis() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const atomsRef = useRef([]);
  const logoImagesRef = useRef({});
  const [hoveredAtom, setHoveredAtom] = useState(null);
  const [selectedAtom, setSelectedAtom] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const router = useRouter();
  const t = THEME;

  const atoms = useMemo(() => prepareAtoms(competitors), []);
  atomsRef.current = atoms;

  // Load logo images
  useEffect(() => {
    atoms.forEach((atom) => {
      if (atom.logoDomain && !logoImagesRef.current[atom.name]) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `https://logo.clearbit.com/${atom.logoDomain}?size=80`;
        img.onload = () => {
          logoImagesRef.current[atom.name] = img;
        };
        img.onerror = () => {
          // Fallback: try Google favicon
          const fallback = new Image();
          fallback.crossOrigin = "anonymous";
          fallback.src = `https://www.google.com/s2/favicons?domain=${atom.logoDomain}&sz=64`;
          fallback.onload = () => {
            logoImagesRef.current[atom.name] = fallback;
          };
        };
      }
    });
  }, [atoms]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ w: rect.width, h: rect.height });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Canvas DPI setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.w === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.w * dpr;
    canvas.height = dimensions.h * dpr;
    canvas.style.width = `${dimensions.w}px`;
    canvas.style.height = `${dimensions.h}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.w === 0) return;

    const ctx = canvas.getContext("2d");
    const w = dimensions.w;
    const h = dimensions.h;
    const cx = w / 2;
    const cy = h / 2;
    const maxRadius = Math.min(w, h) * 0.58;

    let startTime = performance.now();

    const draw = (timestamp) => {
      const elapsed = (timestamp - startTime) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Draw subtle ring guides
      const rings = [0.25, 0.5, 0.75];
      rings.forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, maxRadius * r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw atoms
      const currentAtoms = atomsRef.current;
      const atomPositions = [];

      currentAtoms.forEach((atom) => {
        const baseX = cx + Math.cos(atom.angle) * atom.distance * maxRadius;
        const baseY = cy + Math.sin(atom.angle) * atom.distance * maxRadius;

        // Vibration
        const jitterX = Math.sin(elapsed * atom.vibFreqX + atom.phaseX) * atom.vibAmpX;
        const jitterY = Math.cos(elapsed * atom.vibFreqY + atom.phaseY) * atom.vibAmpY;
        const x = baseX + jitterX;
        const y = baseY + jitterY;

        atomPositions.push({ ...atom, x, y });

        // Connection line to center
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const lineOpacity = Math.max(0.02, 0.12 - (dist / maxRadius) * 0.1);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Atom outer ring (category color)
        const isHovered = hoveredAtom && hoveredAtom.name === atom.name;
        const ringSize = isHovered ? atom.size + 4 : atom.size;

        ctx.beginPath();
        ctx.arc(x, y, ringSize / 2 + 2, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? atom.color : `${atom.color}88`;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        if (isHovered) {
          // Glow
          ctx.beginPath();
          ctx.arc(x, y, ringSize / 2 + 8, 0, Math.PI * 2);
          ctx.strokeStyle = `${atom.color}33`;
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        // Atom body — circular clip for logo
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, ringSize / 2, 0, Math.PI * 2);
        ctx.clip();

        // Background fill
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x - ringSize / 2, y - ringSize / 2, ringSize, ringSize);

        // Draw logo if loaded
        const logo = logoImagesRef.current[atom.name];
        if (logo) {
          const padding = 3;
          const imgSize = ringSize - padding * 2;
          ctx.drawImage(logo, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
        } else {
          // Fallback: first letter
          ctx.fillStyle = atom.color;
          ctx.font = `bold ${Math.max(8, ringSize * 0.45)}px 'Space Grotesk', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(atom.name[0], x, y);
        }

        ctx.restore();
      });

      // Draw Botpress center — BLACK DOT
      const bpSize = 50;

      // Subtle dark glow
      const gradient = ctx.createRadialGradient(cx, cy, bpSize / 2, cx, cy, bpSize * 1.5);
      gradient.addColorStop(0, "rgba(30, 30, 30, 0.6)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, bpSize * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Black circle
      ctx.beginPath();
      ctx.arc(cx, cy, bpSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();

      // Subtle border
      ctx.beginPath();
      ctx.arc(cx, cy, bpSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // "BP" label
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "bold 14px 'Space Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("BP", cx, cy);

      // Store positions for hit testing
      canvas._atomPositions = atomPositions;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [dimensions, hoveredAtom]);

  // Mouse handling
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setMousePos({ x: e.clientX, y: e.clientY });

    const positions = canvas._atomPositions || [];
    let found = null;

    // Also check Botpress center
    const cx = dimensions.w / 2;
    const cy = dimensions.h / 2;

    for (const atom of positions) {
      const dx = mx - atom.x;
      const dy = my - atom.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < atom.size / 2 + 6) {
        found = atom;
        break;
      }
    }

    setHoveredAtom(found);
    canvas.style.cursor = found ? "pointer" : "default";
  }, [dimensions]);

  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const positions = canvas._atomPositions || [];
    let found = null;
    for (const atom of positions) {
      const dx = mx - atom.x;
      const dy = my - atom.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < atom.size / 2 + 6) {
        found = atom;
        break;
      }
    }
    setSelectedAtom(found);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 52px)",
        marginTop: 52,
        background: t.bg,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredAtom(null)}
        onClick={handleClick}
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {/* Hover tooltip (light, follows mouse) */}
      {hoveredAtom && !selectedAtom && (
        <div style={{
          position: "fixed",
          left: mousePos.x + 16,
          top: mousePos.y - 10,
          zIndex: 100,
          ...GLASS,
          padding: "10px 14px",
          pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: t.fontBody,
            fontSize: 13,
            fontWeight: 600,
            color: t.text,
          }}>
            {hoveredAtom.name}
          </span>
        </div>
      )}

      {/* Selected atom info card */}
      {selectedAtom && (
        <>
          {/* Backdrop to dismiss */}
          <div
            onClick={() => setSelectedAtom(null)}
            style={{
              position: "absolute", inset: 0, zIndex: 90,
            }}
          />
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            ...GLASS,
            padding: "28px 32px",
            minWidth: 300,
            maxWidth: 380,
          }}>
            {/* Close button */}
            <button
              onClick={() => setSelectedAtom(null)}
              style={{
                position: "absolute", top: 10, right: 14,
                background: "none", border: "none", color: t.textFaint,
                cursor: "pointer", fontSize: 18, fontFamily: t.fontMono,
              }}
            >
              ×
            </button>

            {/* Category dot + Company name (clickable link) */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 12, height: 12, borderRadius: "50%",
                background: selectedAtom.color, flexShrink: 0,
              }} />
              <span
                onClick={() => router.push(`/company/${toSlug(selectedAtom.name)}`)}
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 20,
                  fontWeight: 700,
                  color: t.text,
                  cursor: "pointer",
                  borderBottom: `1px solid ${t.textFaint}`,
                  paddingBottom: 2,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.borderColor = selectedAtom.color}
                onMouseLeave={(e) => e.target.style.borderColor = t.textFaint}
              >
                {selectedAtom.name}
              </span>
            </div>

            {/* Info rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["ARR", selectedAtom.revenueLabel],
                ["Pricing Strategy", selectedAtom.pricingModel],
                ["Category", selectedAtom.category],
                ["Threat Score", `${Math.round(selectedAtom.score)} / 100`],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{
                    fontFamily: t.fontMono,
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: t.textFaint,
                    marginBottom: 3,
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: t.fontBody,
                    fontSize: 14,
                    color: t.textMuted,
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA to full page */}
            <div style={{
              marginTop: 20, paddingTop: 14,
              borderTop: `1px solid ${t.borderSubtle}`,
              textAlign: "center",
            }}>
              <span
                onClick={() => router.push(`/company/${toSlug(selectedAtom.name)}`)}
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: selectedAtom.color,
                  cursor: "pointer",
                }}
              >
                View full profile →
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
