import { UserDashboard } from "@/components/user/user-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  )
}
