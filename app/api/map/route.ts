import { NextResponse } from "next/server";

// This is a placeholder for your database or map data service
const mapData = [
  { id: 1, lat: 6.5244, lng: 3.3792, label: "Lagos" },
  { id: 2, lat: -1.2921, lng: 36.8219, label: "Nairobi" },
  { id: 3, lat: 30.0444, lng: 31.2357, label: "Cairo" },
];

export async function GET() {
  return NextResponse.json(mapData);
}
