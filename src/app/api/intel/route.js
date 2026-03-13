import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET: Fetch intel updates for the dashboard
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category"); // funding, feature, leadership, pivot
  const company = searchParams.get("company");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    let query = supabase
      .from("intel_updates")
      .select("*", { count: "exact" })
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) query = query.eq("category", category);
    if (company) query = query.ilike("company", `%${company}%`);

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get category counts
    const { data: allData } = await supabase
      .from("intel_updates")
      .select("category");

    const categoryCounts = (allData || []).reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      updates: data || [],
      total: count,
      categoryCounts,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
