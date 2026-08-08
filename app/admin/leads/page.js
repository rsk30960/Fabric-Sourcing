import AdminLeadsTable from "../../../components/AdminLeadsTable";
import RequireAdminAuth from "../../../components/RequireAdminAuth";
import AdminNav from "../../../components/AdminNav";

export const metadata = {
  title: "Admin — Leads | Vexora Global",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <div className="bg-surface-page min-h-screen">
      <RequireAdminAuth>
        <AdminNav />
        <AdminLeadsTable />
      </RequireAdminAuth>
    </div>
  );
}
