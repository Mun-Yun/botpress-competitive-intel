"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import AtomVis from "@/components/AtomVis";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const authed = sessionStorage.getItem("bp-intel-auth");
    if (authed !== "true") {
      router.replace("/");
    }
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <Navigation />
      <AtomVis />
    </div>
  );
}
