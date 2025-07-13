import { ResearchUpload } from "@/components/research/research-upload"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ResearchUploadPage() {
  return (
    <ProtectedRoute allowedRoles={["researcher", "admin"]}>
      <ResearchUpload />
    </ProtectedRoute>
  )
}
