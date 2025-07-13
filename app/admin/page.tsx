import { AdminPanel } from "@/components/admin/admin-panel"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminPanel />
    </ProtectedRoute>
  )
}
