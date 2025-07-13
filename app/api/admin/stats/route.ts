import { NextResponse } from "next/server";

// This is a placeholder for your database or analytics service
const stats = {
  users: 120,
  research: 34,
  alerts: 56,
  dataUsage: 250, // in GB
};

export async function GET() {
  return NextResponse.json(stats);
}
