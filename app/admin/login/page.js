import AdminLoginForm from "../../../components/AdminLoginForm";

export const metadata = {
  title: "Admin Login | Fabric Sourcing",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="bg-surface-page min-h-screen">
      <AdminLoginForm />
    </div>
  );
}
