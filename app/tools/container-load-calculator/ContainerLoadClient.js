"use client";

import { useState } from "react";
import { ToolShell, Field, NumberInput, Select, ResultCard, ResultRow } from "../../../components/tools/CalculatorUI";

// Standard container internal capacities — published shipping-industry reference figures
// (actual usable volume varies slightly by carrier/container condition, hence the packing
// efficiency adjustment below rather than treating this as an exact guarantee).
const CONTAINERS = [
  { value: "20ft", label: "20ft Standard (~33.2 CBM)", cbm: 33.2 },
  { value: "40ft", label: "40ft Standard (~67.7 CBM)", cbm: 67.7 },
  { value: "40hc", label: "40ft High Cube (~76.4 CBM)", cbm: 76.4 },
];

export default function ContainerLoadClient() {
  const [cartonL, setCartonL] = useState("");
  const [cartonW, setCartonW] = useState("");
  const [cartonH, setCartonH] = useState("");
  const [piecesPerCarton, setPiecesPerCarton] = useState("");
  const [containerType, setContainerType] = useState("40ft");
  const [efficiency, setEfficiency] = useState("75");

  const cartonVolumeCbm = (Number(cartonL) * Number(cartonW) * Number(cartonH)) / 1_000_000;
  const container = CONTAINERS.find((c) => c.value === containerType);
  const hasInputs = cartonL && cartonW && cartonH && piecesPerCarton;

  const theoreticalCartons = hasInputs && cartonVolumeCbm > 0 ? Math.floor(container.cbm / cartonVolumeCbm) : null;
  const practicalCartons =
    theoreticalCartons !== null ? Math.floor(theoreticalCartons * (Number(efficiency) / 100)) : null;
  const totalPieces = practicalCartons !== null ? practicalCartons * Number(piecesPerCarton) : null;

  return (
    <ToolShell
      title="MOQ & Container Load Calculator"
      description="Estimate how many cartons and pieces fit in a shipping container, based on your carton dimensions."
      disclaimer="Container capacities shown are standard published figures; actual loadable volume depends on real-world stacking, pallets, and carton rigidity — the packing efficiency % below is a rule-of-thumb adjustment, not a guarantee. Always confirm final container load with your freight forwarder."
    >
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <Field label="Carton length" suffix="cm">
          <NumberInput value={cartonL} onChange={setCartonL} placeholder="e.g. 60" />
        </Field>
        <Field label="Carton width" suffix="cm">
          <NumberInput value={cartonW} onChange={setCartonW} placeholder="e.g. 40" />
        </Field>
        <Field label="Carton height" suffix="cm">
          <NumberInput value={cartonH} onChange={setCartonH} placeholder="e.g. 40" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <Field label="Pieces per carton">
          <NumberInput value={piecesPerCarton} onChange={setPiecesPerCarton} placeholder="e.g. 50" />
        </Field>
        <Field label="Container type">
          <Select value={containerType} onChange={setContainerType} options={CONTAINERS} />
        </Field>
        <Field label="Packing efficiency" suffix="%">
          <NumberInput value={efficiency} onChange={setEfficiency} placeholder="75" />
        </Field>
      </div>

      {totalPieces !== null && (
        <ResultCard title="Estimated container load">
          <ResultRow label="Total pieces" value={totalPieces.toLocaleString()} big />
          <ResultRow label="Cartons (practical)" value={practicalCartons.toLocaleString()} />
          <ResultRow label="Cartons (theoretical max)" value={theoreticalCartons.toLocaleString()} />
          <ResultRow label="Carton volume" value={`${cartonVolumeCbm.toFixed(4)} CBM`} />
        </ResultCard>
      )}
    </ToolShell>
  );
}
