import { NextResponse } from "next/server";

const papers = [
  {
    id: "1",
    title: "Climate Change and its Impact on African Agriculture",
    author: "Dr. Jane Doe",
    date: "2023-10-26",
    abstract: "This paper explores the impact of climate change on agriculture in Africa.",
    tags: ["Climate Change", "Africa", "Agriculture"],
    url: "/papers/paper1.pdf",
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const paper = papers.find((p) => p.id === params.id);
  if (paper) {
    return NextResponse.json(paper);
  }
  return new Response("Paper not found", { status: 404 });
}
