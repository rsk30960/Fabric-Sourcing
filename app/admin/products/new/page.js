import AdminProductForm from "../../../../components/AdminProductForm";
import RequireAdminAuth from "../../../../components/RequireAdminAuth";
import AdminNav from "../../../../components/AdminNav";

export const metadata = {
  title: "Admin — New Product | Vexora Global",
  robots: { index: false, follow: false },
};

export default function AdminNewProductPage() {
  return (
    <div className="bg-surface-page min-h-screen">
      <RequireAdminAuth>
        <AdminNav />
        <AdminProductForm />
      </RequireAdminAuth>
    </div>
  );
}
