import { NextResponse } from "next/server";

// This is a placeholder for your database or alert service
const alerts = [
  {
    id: "ALERT001",
    type: "Drought",
    severity: "High",
    region: "Sahel",
    date: "2024-07-28",
    description: "Severe drought conditions expected in the next 2 weeks.",
  },
  {
    id: "ALERT002",
    type: "Flood",
    severity: "Medium",
    region: "Niger Delta",
    date: "2024-07-27",
    description: "Risk of flooding in low-lying areas.",
  },
];

export async function GET() {
  return NextResponse.json(alerts);
}
