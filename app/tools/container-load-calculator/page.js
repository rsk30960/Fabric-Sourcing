import ContainerLoadClient from "./ContainerLoadClient";

export const metadata = {
  title: "MOQ & Container Load Calculator | Vexora Global",
  description: "Estimate how many cartons and pieces fit in a 20ft, 40ft, or 40ft High Cube shipping container.",
};

export default function ContainerLoadPage() {
  return <ContainerLoadClient />;
}
