import { ResearchModeration } from "@/components/admin/research-moderation"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminResearchPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <ResearchModeration />
    </ProtectedRoute>
  )
}
