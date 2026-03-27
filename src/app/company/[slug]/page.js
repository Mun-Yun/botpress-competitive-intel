"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { findCompetitorBySlug, THEME, GLASS, CAT_COLORS, LOGO_DOMAINS } from "@/lib/data";

export default function CompanyPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const t = THEME;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("bp-intel-auth") !== "true") {
        router.replace("/");
      } else {
        setAuthed(true);
      }
    }
  }, [router]);

  const company = findCompetitorBySlug(slug);

  if (!authed) return null;

  if (!company) {
    return (
      <div style={{
        minHeight: "100vh", background: t.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: t.fontDisplay, fontSize: 28, color: t.text, marginBottom: 12 }}>
            Company not found
          </div>
          <span
            onClick={() => router.push("/home")}
            style={{ fontFamily: t.fontMono, fontSize: 12, color: t.accent, cursor: "pointer" }}
          >
            ← Back to map
          </span>
        </div>
      </div>
    );
  }

  const color = CAT_COLORS[company.category] || "#888";
  const domain = LOGO_DOMAINS[company.name];

  const sections = [
    {
      title: "Revenue & Funding",
      rows: [
        ["Annual Revenue", company.revenueLabel],
        ["Funding / Valuation", company.fundingOrVal],
        ["Founded", company.founded],
        ["Customers", company.customers ? company.customers.toLocaleString() : "N/A"],
      ],
    },
    {
      title: "Pricing Strategy",
      rows: [
        ["Pricing Model", company.pricingModel],
        ["Per-Resolution Price", company.resolutionPrice ? `$${company.resolutionPrice.toFixed(2)}` : "N/A"],
        ["Per-Seat Price", company.seatPrice ? `$${company.seatPrice}/mo` : "N/A"],
      ],
    },
    {
      title: "AI & Automation",
      rows: [
        ["AI Posture", company.aiPosture],
        ["AI Score", `${company.aiScore} / 10`],
        ["Automation Depth", `${company.automationDepth} / 10`],
        ["Market Breadth", `${company.marketBreadth} / 10`],
        ["Automation Rate", company.automationRate || "N/A"],
      ],
    },
    {
      title: "Company Info",
      rows: [
        ["Headquarters", company.hq],
        ["Category", company.category],
      ],
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, padding: "0 24px 60px" }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 0", borderBottom: `1px solid ${t.borderSubtle}`,
        marginBottom: 40,
      }}>
        <span
          onClick={() => router.push("/home")}
          style={{
            fontFamily: t.fontMono, fontSize: 11,
            textTransform: "uppercase", letterSpacing: "0.15em",
            color: t.textFaint, cursor: "pointer",
          }}
        >
          ← Back to map
        </span>
        <span
          onClick={() => router.push("/dashboard")}
          style={{
            fontFamily: t.fontMono, fontSize: 11,
            textTransform: "uppercase", letterSpacing: "0.15em",
            color: t.textFaint, cursor: "pointer",
          }}
        >
          Dashboard →
        </span>
      </div>

      {/* Header */}
      <div style={{
        maxWidth: 720, margin: "0 auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          {domain && (
            <img
              src={`https://logo.clearbit.com/${domain}?size=80`}
              alt=""
              style={{ width: 40, height: 40, borderRadius: 8, background: "#1a1a1a" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          <div>
            <h1 style={{
              fontFamily: t.fontDisplay, fontSize: 32, fontWeight: 700,
              color: t.text, margin: 0, lineHeight: 1.2,
            }}>
              {company.name}
            </h1>
            <div style={{
              display: "inline-block", marginTop: 6,
              fontFamily: t.fontMono, fontSize: 10,
              textTransform: "uppercase", letterSpacing: "0.15em",
              color: color, background: `${color}15`,
              padding: "3px 10px", borderRadius: 3,
              border: `1px solid ${color}33`,
            }}>
              {company.category}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 36 }}>
          {sections.map((section) => (
            <div key={section.title} style={{ ...GLASS, padding: "20px 24px" }}>
              <div style={{
                fontFamily: t.fontMono, fontSize: 10,
                textTransform: "uppercase", letterSpacing: "0.2em",
                color: t.textFaint, marginBottom: 14,
              }}>
                {section.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {section.rows.map(([label, value]) => (
                  <div key={label} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "baseline",
                  }}>
                    <span style={{
                      fontFamily: t.fontBody, fontSize: 13, color: t.textMuted,
                    }}>
                      {label}
                    </span>
                    <span style={{
                      fontFamily: t.fontBody, fontSize: 14, fontWeight: 500,
                      color: t.text, textAlign: "right",
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
