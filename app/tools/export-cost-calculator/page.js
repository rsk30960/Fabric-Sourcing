import ExportCostClient from "./ExportCostClient";

export const metadata = {
  title: "Export Cost Calculator | Fabric Sourcing",
  description: "Estimate landed cost per unit from FOB price, freight, insurance, and duty.",
};

export default function ExportCostPage() {
  return <ExportCostClient />;
}
