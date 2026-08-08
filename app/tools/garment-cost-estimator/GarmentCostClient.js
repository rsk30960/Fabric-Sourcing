"use client";

import { useState } from "react";
import { ToolShell, Field, NumberInput, Select, ResultCard, ResultRow } from "../../../components/tools/CalculatorUI";

const CURRENCIES = [
  { value: "INR", label: "INR (₹)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
];
const SYMBOLS = { INR: "₹", USD: "$", EUR: "€" };

export default function GarmentCostClient() {
  const [currency, setCurrency] = useState("INR");
  const [fabricCostPerMeter, setFabricCostPerMeter] = useState("");
  const [consumption, setConsumption] = useState("");
  const [trimsCost, setTrimsCost] = useState("");
  const [laborCost, setLaborCost] = useState("");
  const [overheadPercent, setOverheadPercent] = useState("10");
  const [marginPercent, setMarginPercent] = useState("20");
  const [quantity, setQuantity] = useState("");

  const fabricCost = Number(fabricCostPerMeter) * Number(consumption);
  const hasCoreInputs = fabricCostPerMeter && consumption && trimsCost && laborCost;
  const subtotal = hasCoreInputs ? fabricCost + Number(trimsCost) + Number(laborCost) : null;
  const overheadAmount = subtotal !== null ? subtotal * (Number(overheadPercent) / 100) : null;
  const totalCost = subtotal !== null ? subtotal + overheadAmount : null;
  const margin = Number(marginPercent);
  const suggestedPrice = totalCost !== null && margin < 100 ? totalCost / (1 - margin / 100) : null;
  const profitPerUnit = suggestedPrice !== null ? suggestedPrice - totalCost : null;
  const qty = Number(quantity);
  const sym = SYMBOLS[currency];

  return (
    <ToolShell
      title="Garment Cost Estimator"
      description="Break your own fabric, trims, labor, and overhead figures into a per-unit cost and a suggested selling price at your target margin. Every number comes from you — this doesn't assume market prices."
      disclaimer="A cost-breakdown calculator only. It does not reflect Fabric Sourcing's actual pricing, which is quote-per-specification — see any product page or the Specification Enquiry Form for a real quote."
    >
      <div className="mb-5">
        <Field label="Currency">
          <Select value={currency} onChange={setCurrency} options={CURRENCIES} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <Field label="Fabric cost" suffix={`${sym}/m`}>
          <NumberInput value={fabricCostPerMeter} onChange={setFabricCostPerMeter} placeholder="e.g. 250" />
        </Field>
        <Field label="Fabric consumption" suffix="m/garment">
          <NumberInput value={consumption} onChange={setConsumption} placeholder="e.g. 1.8" />
        </Field>
        <Field label="Trims cost" suffix={`${sym}/garment`}>
          <NumberInput value={trimsCost} onChange={setTrimsCost} placeholder="e.g. 30" />
        </Field>
        <Field label="Labor / CMT cost" suffix={`${sym}/garment`}>
          <NumberInput value={laborCost} onChange={setLaborCost} placeholder="e.g. 120" />
        </Field>
        <Field label="Overhead" suffix="%">
          <NumberInput value={overheadPercent} onChange={setOverheadPercent} placeholder="10" />
        </Field>
        <Field label="Target margin" suffix="%">
          <NumberInput value={marginPercent} onChange={setMarginPercent} placeholder="20" />
        </Field>
        <Field label="Order quantity (optional)" suffix="pcs">
          <NumberInput value={quantity} onChange={setQuantity} placeholder="e.g. 500" />
        </Field>
      </div>

      {totalCost !== null && (
        <ResultCard title="Cost breakdown (per unit)">
          <ResultRow label="Fabric" value={`${sym}${fabricCost.toFixed(2)}`} />
          <ResultRow label="Trims" value={`${sym}${Number(trimsCost).toFixed(2)}`} />
          <ResultRow label="Labor" value={`${sym}${Number(laborCost).toFixed(2)}`} />
          <ResultRow label="Overhead" value={`${sym}${overheadAmount.toFixed(2)}`} />
          <ResultRow label="Total cost" value={`${sym}${totalCost.toFixed(2)}`} big />
          {suggestedPrice !== null && (
            <>
              <ResultRow label="Suggested price" value={`${sym}${suggestedPrice.toFixed(2)}`} big />
              <ResultRow label="Profit / unit" value={`${sym}${profitPerUnit.toFixed(2)}`} />
            </>
          )}
          {qty > 0 && (
            <ResultRow label="Total order cost" value={`${sym}${(totalCost * qty).toLocaleString()}`} />
          )}
        </ResultCard>
      )}
    </ToolShell>
  );
}
