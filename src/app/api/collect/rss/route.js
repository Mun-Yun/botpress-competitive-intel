import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Company blog/changelog RSS feeds
const RSS_FEEDS = [
  { company: "Zendesk", url: "https://www.zendesk.com/blog/feed/" },
  { company: "Intercom", url: "https://www.intercom.com/blog/feed/" },
  { company: "Freshdesk", url: "https://www.freshworks.com/blog/feed/" },
  { company: "HubSpot Service Hub", url: "https://blog.hubspot.com/service/rss.xml" },
  { company: "Drift", url: "https://www.drift.com/blog/feed/" },
  { company: "Ada", url: "https://www.ada.cx/blog/rss.xml" },
  { company: "Tidio", url: "https://www.tidio.com/blog/feed/" },
  { company: "LivePerson", url: "https://www.liveperson.com/blog/feed/" },
  { company: "Gorgias", url: "https://www.gorgias.com/blog/rss.xml" },
  { company: "Talkdesk", url: "https://www.talkdesk.com/blog/feed/" },
  { company: "Yellow.ai", url: "https://yellow.ai/blog/feed/" },
  { company: "Cognigy", url: "https://www.cognigy.com/blog/rss.xml" },
  { company: "Aisera", url: "https://aisera.com/blog/feed/" },
  { company: "Moveworks", url: "https://www.moveworks.com/insights/feed" },
];

function parseRSSItems(xml, company) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = itemXml.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1") || "";
    const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || "";
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
    const description = itemXml.match(/<description>(.*?)<\/description>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1")?.replace(/<[^>]*>/g, "")?.substring(0, 300) || "";

    // Only items from last 7 days
    const published = pubDate ? new Date(pubDate) : new Date();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (published < sevenDaysAgo) continue;

    items.push({
      company,
      category: "feature",
      headline: title.substring(0, 500),
      summary: description,
      source_url: link,
      source: "rss",
      published_at: published.toISOString(),
    });
  }

  return items.slice(0, 5);
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      next: { revalidate: 0 },
      headers: { "User-Agent": "BotpressIntelBot/1.0" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSSItems(xml, feed.company);
  } catch (e) {
    console.error(`RSS error for ${feed.company}:`, e.message);
    return [];
  }
}

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all RSS feeds in parallel
    const results = await Promise.all(RSS_FEEDS.map(fetchFeed));
    const allItems = results.flat();

    if (allItems.length === 0) {
      return NextResponse.json({ message: "No new RSS items", inserted: 0 });
    }

    // Deduplicate
    const { data: existing } = await supabase
      .from("intel_updates")
      .select("headline")
      .eq("source", "rss")
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    const existingHeadlines = new Set((existing || []).map((e) => e.headline));
    const newItems = allItems.filter((item) => !existingHeadlines.has(item.headline));

    if (newItems.length === 0) {
      return NextResponse.json({ message: "All RSS items already exist", inserted: 0 });
    }

    const { error } = await supabase.from("intel_updates").insert(newItems);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: `Collected ${newItems.length} RSS updates`,
      inserted: newItems.length,
      feeds_scanned: RSS_FEEDS.length,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
