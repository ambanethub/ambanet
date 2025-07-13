import { NextResponse } from "next/server";

// This is a placeholder for your database or news service
const articles = [
  {
    id: "1",
    title: "Climate Change Conference 2024",
    source: "Climate News Network",
    date: "2024-07-28",
    url: "#",
  },
  {
    id: "2",
    title: "New Study on Sea Level Rise",
    source: "Science Daily",
    date: "2024-07-27",
    url: "#",
  },
];

export async function GET() {
  return NextResponse.json(articles);
}
