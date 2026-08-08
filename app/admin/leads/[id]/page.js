import AdminLeadDetail from "../../../../components/AdminLeadDetail";
import RequireAdminAuth from "../../../../components/RequireAdminAuth";
import AdminNav from "../../../../components/AdminNav";

export const metadata = {
  title: "Admin — Lead Detail | Fabric Sourcing",
  robots: { index: false, follow: false },
};

export default function AdminLeadDetailPage({ params }) {
  return (
    <div className="bg-surface-page min-h-screen">
      <RequireAdminAuth>
        <AdminNav />
        <AdminLeadDetail leadId={params.id} />
      </RequireAdminAuth>
    </div>
  );
}
