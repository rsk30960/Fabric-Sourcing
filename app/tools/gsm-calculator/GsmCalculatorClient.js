"use client";

import { useState } from "react";
import { ToolShell, Field, NumberInput, ResultCard, ResultRow } from "../../../components/tools/CalculatorUI";

export default function GsmCalculatorClient() {
  // Section A: derive GSM from a weighed swatch
  const [swatchWeight, setSwatchWeight] = useState("");
  const [swatchLength, setSwatchLength] = useState("");
  const [swatchWidth, setSwatchWidth] = useState("");

  const areaCm2 = Number(swatchLength) * Number(swatchWidth);
  const gsm = areaCm2 > 0 && swatchWeight ? (Number(swatchWeight) / areaCm2) * 10000 : null;

  // Section B: estimate total weight of a length of fabric, given a known GSM
  const [knownGsm, setKnownGsm] = useState("");
  const [fabricWidth, setFabricWidth] = useState("");
  const [fabricLength, setFabricLength] = useState("");

  const totalWeightKg =
    knownGsm && fabricWidth && fabricLength
      ? (Number(knownGsm) * (Number(fabricWidth) / 100) * Number(fabricLength)) / 1000
      : null;

  return (
    <ToolShell
      title="Fabric GSM Calculator"
      description="GSM (grams per square meter) measures fabric weight — work it out from a swatch, or estimate the total weight of a fabric length once you know the GSM."
      disclaimer="This tool performs arithmetic on the numbers you enter. It does not look up or assume any fabric's actual GSM, composition, or supplier data."
    >
      <div className="space-y-10">
        <div>
          <h2 className="font-semibold text-graphite mb-4">Find GSM from a swatch</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <Field label="Swatch weight" suffix="g">
              <NumberInput value={swatchWeight} onChange={setSwatchWeight} placeholder="e.g. 4.5" />
            </Field>
            <Field label="Swatch length" suffix="cm">
              <NumberInput value={swatchLength} onChange={setSwatchLength} placeholder="e.g. 10" />
            </Field>
            <Field label="Swatch width" suffix="cm">
              <NumberInput value={swatchWidth} onChange={setSwatchWidth} placeholder="e.g. 10" />
            </Field>
          </div>
          {gsm !== null && (
            <ResultCard title="Result">
              <ResultRow label="GSM" value={`${gsm.toFixed(1)} g/m²`} big />
            </ResultCard>
          )}
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="font-semibold text-graphite mb-4">Estimate total weight from GSM</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <Field label="GSM" suffix="g/m²">
              <NumberInput value={knownGsm} onChange={setKnownGsm} placeholder="e.g. 180" />
            </Field>
            <Field label="Fabric width" suffix="cm">
              <NumberInput value={fabricWidth} onChange={setFabricWidth} placeholder="e.g. 150" />
            </Field>
            <Field label="Length" suffix="m">
              <NumberInput value={fabricLength} onChange={setFabricLength} placeholder="e.g. 500" />
            </Field>
          </div>
          {totalWeightKg !== null && (
            <ResultCard title="Result">
              <ResultRow label="Total weight" value={`${totalWeightKg.toFixed(1)} kg`} big />
            </ResultCard>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
