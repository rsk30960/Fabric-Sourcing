import AdminProductsTable from "../../../components/AdminProductsTable";
import RequireAdminAuth from "../../../components/RequireAdminAuth";
import AdminNav from "../../../components/AdminNav";

export const metadata = {
  title: "Admin — Products | Fabric Sourcing",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return (
    <div className="bg-surface-page min-h-screen">
      <RequireAdminAuth>
        <AdminNav />
        <AdminProductsTable />
      </RequireAdminAuth>
    </div>
  );
}
