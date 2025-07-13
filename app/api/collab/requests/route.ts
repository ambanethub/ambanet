import { NextResponse } from "next/server";

// This is a placeholder for your database or project management service
const requests = [
  {
    id: "REQ001",
    projectId: "PROJ001",
    userName: "Dr. Kenza Al-Farsi",
    message: "I would like to contribute my expertise in hydrology to this project.",
  },
];

export async function GET() {
  return NextResponse.json(requests);
}
