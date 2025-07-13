import { NextResponse } from "next/server";

// This is a placeholder for your database or user management service
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
];

export async function GET() {
  return NextResponse.json(users);
}
