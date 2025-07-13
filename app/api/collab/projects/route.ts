import { NextResponse } from "next/server";

// This is a placeholder for your database or project management service
const projects = [
  {
    id: "PROJ001",
    title: "Water Management in the Lake Chad Basin",
    lead: "Dr. Fatima Bello",
    status: "Active",
    members: 5,
  },
  {
    id: "PROJ002",
    title: "Climate-Resilient Agriculture in the Horn of Africa",
    lead: "Dr. David Kimani",
    status: "Planning",
    members: 3,
  },
];

export async function GET() {
  return NextResponse.json(projects);
}
