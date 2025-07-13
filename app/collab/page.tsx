import { CollaborationCenter } from "@/components/collaboration/collaboration-center"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function CollabPage() {
  return (
    <ProtectedRoute allowedRoles={["researcher", "admin"]}>
      <CollaborationCenter />
    </ProtectedRoute>
  )
}
