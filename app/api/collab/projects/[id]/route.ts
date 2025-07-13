import { NextResponse } from "next/server";

const projects = [
  {
    id: "PROJ001",
    title: "Water Management in the Lake Chad Basin",
    lead: "Dr. Fatima Bello",
    status: "Active",
    members: 5,
    description: "A project to improve water management in the Lake Chad Basin.",
    objectives: ["Objective 1", "Objective 2"],
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    tags: ["Water Management", "Lake Chad"],
  },
  {
    id: "PROJ002",
    title: "Climate-Resilient Agriculture in the Horn of Africa",
    lead: "Dr. David Kimani",
    status: "Planning",
    members: 3,
    description: "A project to promote climate-resilient agriculture in the Horn of Africa.",
    objectives: ["Objective 1", "Objective 2"],
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    tags: ["Agriculture", "Horn of Africa"],
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const project = projects.find((p) => p.id === params.id);
  if (project) {
    return NextResponse.json(project);
  }
  return new Response("Project not found", { status: 404 });
}
