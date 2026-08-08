import GsmCalculatorClient from "./GsmCalculatorClient";

export const metadata = {
  title: "Fabric GSM Calculator | Vexora Global",
  description: "Calculate fabric GSM (grams per square meter) from a swatch, or estimate total fabric weight for an order.",
};

export default function GsmCalculatorPage() {
  return <GsmCalculatorClient />;
}
