import GarmentCostClient from "./GarmentCostClient";

export const metadata = {
  title: "Garment Cost Estimator | Vexora Global",
  description: "Break down fabric, trims, labor, and overhead into a per-unit garment cost and suggested price.",
};

export default function GarmentCostPage() {
  return <GarmentCostClient />;
}
