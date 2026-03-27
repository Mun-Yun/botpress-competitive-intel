"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { THEME } from "@/lib/data";

const NAV_ITEMS = [
  { href: "/home", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navigation() {
  const pathname = usePathname();
  const t = THEME;

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      height: 52,
      background: "rgba(10, 10, 10, 0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${t.borderSubtle}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          fontFamily: t.fontMono,
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: t.accent,
        }}>
          {"\u25AA"} Botpress
        </span>
        <span style={{
          fontFamily: t.fontMono,
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: t.textFaint,
          marginLeft: 8,
        }}>
          Competitive Intel
        </span>
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: t.fontMono,
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: isActive ? t.text : t.textMuted,
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 2,
                background: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
