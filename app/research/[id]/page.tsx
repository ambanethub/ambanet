import { ResearchDetails } from "@/components/research/research-details"

interface ResearchDetailsPageProps {
  params: {
    id: string
  }
}

export default function ResearchDetailsPage({ params }: ResearchDetailsPageProps) {
  return <ResearchDetails id={params.id} />
}
