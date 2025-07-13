import { ProjectDetails } from "@/components/collaboration/project-details"
import { ProtectedRoute } from "@/components/auth/protected-route"

interface ProjectDetailsPageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  return (
    <ProtectedRoute allowedRoles={["researcher", "admin"]}>
      <ProjectDetails id={params.id} />
    </ProtectedRoute>
  )
}
