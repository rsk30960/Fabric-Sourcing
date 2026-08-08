import AdminTasksView from "../../../components/AdminTasksView";
import RequireAdminAuth from "../../../components/RequireAdminAuth";
import AdminNav from "../../../components/AdminNav";

export const metadata = {
  title: "Admin — My Tasks | Fabric Sourcing",
  robots: { index: false, follow: false },
};

export default function AdminTasksPage() {
  return (
    <div className="bg-surface-page min-h-screen">
      <RequireAdminAuth>
        <AdminNav />
        <AdminTasksView />
      </RequireAdminAuth>
    </div>
  );
}
