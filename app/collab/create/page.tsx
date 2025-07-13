import { ProjectCreate } from "@/components/collaboration/project-create"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProjectCreatePage() {
  return (
    <ProtectedRoute allowedRoles={["researcher", "admin"]}>
      <ProjectCreate />
    </ProtectedRoute>
  )
}
