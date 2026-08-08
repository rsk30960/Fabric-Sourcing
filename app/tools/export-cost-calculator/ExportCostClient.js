"use client";

import { useState } from "react";
import { ToolShell, Field, NumberInput, Select, ResultCard, ResultRow } from "../../../components/tools/CalculatorUI";

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "INR", label: "INR (₹)" },
  { value: "EUR", label: "EUR (€)" },
];
const SYMBOLS = { INR: "₹", USD: "$", EUR: "€" };

export default function ExportCostClient() {
  const [currency, setCurrency] = useState("USD");
  const [fobPrice, setFobPrice] = useState("");
  const [freightPerUnit, setFreightPerUnit] = useState("");
  const [insurancePercent, setInsurancePercent] = useState("0.5");
  const [dutyPercent, setDutyPercent] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [quantity, setQuantity] = useState("");

  const fob = Number(fobPrice);
  const freight = Number(freightPerUnit);
  const hasInputs = fobPrice && freightPerUnit;

  const cfr = hasInputs ? fob + freight : null;
  const insuranceAmount = cfr !== null ? cfr * (Number(insurancePercent) / 100) : null;
  const cif = cfr !== null ? cfr + insuranceAmount : null;
  const dutyAmount = cif !== null ? cif * (Number(dutyPercent || 0) / 100) : null;
  const landedCost = cif !== null ? cif + dutyAmount + Number(otherCharges || 0) : null;
  const qty = Number(quantity);
  const sym = SYMBOLS[currency];

  return (
    <ToolShell
      title="Export Cost Calculator"
      description="Estimate landed cost per unit from FOB price, freight, insurance, and duty — enter your own quoted rates."
      disclaimer="Freight rates, insurance rates, and duty/tariff rates vary by product, country, and carrier — this tool only does the arithmetic on the rates you supply. Confirm actual applicable rates with your freight forwarder and customs broker."
    >
      <div className="mb-5">
        <Field label="Currency">
          <Select value={currency} onChange={setCurrency} options={CURRENCIES} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <Field label="FOB price" suffix={`${sym}/unit`}>
          <NumberInput value={fobPrice} onChange={setFobPrice} placeholder="e.g. 8.50" />
        </Field>
        <Field label="Freight" suffix={`${sym}/unit`}>
          <NumberInput value={freightPerUnit} onChange={setFreightPerUnit} placeholder="e.g. 0.60" />
        </Field>
        <Field label="Insurance" suffix="%">
          <NumberInput value={insurancePercent} onChange={setInsurancePercent} placeholder="0.5" />
        </Field>
        <Field label="Duty / Tariff" suffix="%">
          <NumberInput value={dutyPercent} onChange={setDutyPercent} placeholder="e.g. 12" />
        </Field>
        <Field label="Other charges" suffix={`${sym}/unit`}>
          <NumberInput value={otherCharges} onChange={setOtherCharges} placeholder="e.g. 0.20" />
        </Field>
        <Field label="Order quantity (optional)" suffix="units">
          <NumberInput value={quantity} onChange={setQuantity} placeholder="e.g. 5000" />
        </Field>
      </div>

      {landedCost !== null && (
        <ResultCard title="Landed cost (per unit)">
          <ResultRow label="FOB" value={`${sym}${fob.toFixed(2)}`} />
          <ResultRow label="+ Freight" value={`${sym}${freight.toFixed(2)}`} />
          <ResultRow label="+ Insurance" value={`${sym}${insuranceAmount.toFixed(2)}`} />
          <ResultRow label="= CIF" value={`${sym}${cif.toFixed(2)}`} />
          <ResultRow label="+ Duty" value={`${sym}${dutyAmount.toFixed(2)}`} />
          <ResultRow label="+ Other" value={`${sym}${Number(otherCharges || 0).toFixed(2)}`} />
          <ResultRow label="Landed cost" value={`${sym}${landedCost.toFixed(2)}`} big />
          {qty > 0 && (
            <ResultRow label="Total shipment cost" value={`${sym}${(landedCost * qty).toLocaleString()}`} />
          )}
        </ResultCard>
      )}
    </ToolShell>
  );
}
