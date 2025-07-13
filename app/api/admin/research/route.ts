import { NextResponse } from "next/server";

// This is a placeholder for your database or research management service
const research = [
  { id: 1, title: "Climate Change in Africa", author: "Dr. Jane Smith", status: "Published" },
  { id: 2, title: "Water Scarcity in the Sahel", author: "Dr. John Doe", status: "Pending Review" },
];

export async function GET() {
  return NextResponse.json(research);
}
