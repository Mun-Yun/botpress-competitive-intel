"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
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
      <div style={{ paddingTop: 52 }}>
        <Dashboard />
      </div>
    </div>
  );
}
