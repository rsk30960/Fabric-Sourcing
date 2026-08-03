import AdminProductForm from "../../../../components/AdminProductForm";
import RequireAdminAuth from "../../../../components/RequireAdminAuth";
import AdminNav from "../../../../components/AdminNav";

export const metadata = {
  title: "Admin — Edit Product | Fabric Sourcing",
  robots: { index: false, follow: false },
};

export default function AdminEditProductPage({ params }) {
  return (
    <div className="bg-surface-page min-h-screen">
      <RequireAdminAuth>
        <AdminNav />
        <AdminProductForm productId={params.id} />
      </RequireAdminAuth>
    </div>
  );
}
