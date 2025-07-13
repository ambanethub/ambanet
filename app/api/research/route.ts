import { NextResponse } from "next/server";

const papers = [
  {
    id: "1",
    title: "Climate Change and its Impact on African Agriculture",
    author: "Dr. Jane Doe",
    date: "2023-10-26",
    abstract: "This paper explores the impact of climate change on agriculture in Africa.",
    tags: ["Climate Change", "Africa", "Agriculture"],
    isPublic: true,
  },
  {
    id: "2",
    title: "Water Resource Management in the Nile Basin",
    author: "Dr. John Smith",
    date: "2023-11-15",
    abstract: "This paper discusses water resource management strategies in the Nile Basin.",
    tags: ["Water Management", "Nile Basin"],
    isPublic: true,
  },
];

export async function GET() {
  return NextResponse.json(papers);
}
