import FabricConsumptionClient from "./FabricConsumptionClient";

export const metadata = {
  title: "Fabric Consumption Calculator | Vexora Global",
  description: "Estimate total fabric required for an order, including a wastage/buffer allowance.",
};

export default function FabricConsumptionPage() {
  return <FabricConsumptionClient />;
}
