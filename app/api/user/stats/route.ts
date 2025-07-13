import { NextResponse } from "next/server";

// This is a placeholder for your database or user service
const stats = {
  research: 5,
  projects: 2,
  alerts: 3,
  data: 1.2, // in GB
};

export async function GET() {
  return NextResponse.json(stats);
}
