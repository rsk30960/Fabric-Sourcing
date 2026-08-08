"use client";

import { useState } from "react";
import { ToolShell, Field, NumberInput, ResultCard, ResultRow } from "../../../components/tools/CalculatorUI";

const METERS_PER_YARD = 0.9144;

export default function FabricConsumptionClient() {
  const [quantity, setQuantity] = useState("");
  const [consumptionPerGarment, setConsumptionPerGarment] = useState("");
  const [wastagePercent, setWastagePercent] = useState("5");
  const [rollLength, setRollLength] = useState("");

  const qty = Number(quantity);
  const perGarment = Number(consumptionPerGarment);
  const wastage = Number(wastagePercent) || 0;

  const baseTotal = qty > 0 && perGarment > 0 ? qty * perGarment : null;
  const totalWithWastage = baseTotal !== null ? baseTotal * (1 + wastage / 100) : null;
  const totalYards = totalWithWastage !== null ? totalWithWastage / METERS_PER_YARD : null;
  const rollsNeeded =
    totalWithWastage !== null && Number(rollLength) > 0 ? Math.ceil(totalWithWastage / Number(rollLength)) : null;

  return (
    <ToolShell
      title="Fabric Consumption Calculator"
      description="Estimate total fabric required for an order, with a wastage/buffer allowance. Enter your own per-garment consumption figure from your pattern or marker — this tool doesn't assume consumption norms for you."
      disclaimer="Per-garment consumption varies by garment type, pattern, and marker efficiency — always confirm the figure with your own pattern maker or sourcing partner rather than a generic estimate."
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <Field label="Order quantity" suffix="pcs">
          <NumberInput value={quantity} onChange={setQuantity} placeholder="e.g. 500" />
        </Field>
        <Field label="Consumption per garment" suffix="m">
          <NumberInput value={consumptionPerGarment} onChange={setConsumptionPerGarment} placeholder="e.g. 1.8" />
        </Field>
        <Field label="Wastage / buffer" suffix="%">
          <NumberInput value={wastagePercent} onChange={setWastagePercent} placeholder="5" />
        </Field>
        <Field label="Roll length (optional)" suffix="m">
          <NumberInput value={rollLength} onChange={setRollLength} placeholder="e.g. 100" />
        </Field>
      </div>

      {totalWithWastage !== null && (
        <ResultCard title="Total fabric required">
          <ResultRow label="Meters" value={`${totalWithWastage.toFixed(1)} m`} big />
          <ResultRow label="Yards" value={`${totalYards.toFixed(1)} yd`} />
          <ResultRow label="Before wastage" value={`${baseTotal.toFixed(1)} m`} />
          {rollsNeeded !== null && <ResultRow label="Rolls needed" value={rollsNeeded} />}
        </ResultCard>
      )}
    </ToolShell>
  );
}
