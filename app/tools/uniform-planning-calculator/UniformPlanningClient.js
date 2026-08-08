"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ToolShell, Field, NumberInput, Select, ResultCard, ResultRow } from "../../../components/tools/CalculatorUI";

const CURRENCIES = [
  { value: "INR", label: "INR (₹)" },
  { value: "USD", label: "USD ($)" },
];
const SYMBOLS = { INR: "₹", USD: "$" };

function blankItem(name = "") {
  return { key: crypto.randomUUID(), name, qtyPerStudent: "1", unitPrice: "" };
}

export default function UniformPlanningClient() {
  const [students, setStudents] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [items, setItems] = useState([
    blankItem("Shirt"),
    blankItem("Trouser/Skirt"),
    blankItem("Tie"),
  ]);

  function updateItem(key, field, value) {
    setItems((its) => its.map((it) => (it.key === key ? { ...it, [field]: value } : it)));
  }
  function addItem() {
    setItems((its) => [...its, blankItem()]);
  }
  function removeItem(key) {
    setItems((its) => (its.length > 1 ? its.filter((it) => it.key !== key) : its));
  }

  const studentCount = Number(students);
  const sym = SYMBOLS[currency];

  const rows = items
    .filter((it) => it.name && it.qtyPerStudent && it.unitPrice)
    .map((it) => {
      const totalQty = studentCount * Number(it.qtyPerStudent);
      const totalCost = totalQty * Number(it.unitPrice);
      return { ...it, totalQty, totalCost };
    });

  const grandTotal = rows.reduce((sum, r) => sum + r.totalCost, 0);
  const hasResults = studentCount > 0 && rows.length > 0;

  return (
    <ToolShell
      title="Uniform Planning Calculator (Schools)"
      description="Plan quantities and budget for a school uniform program — add each garment type, quantity per student, and unit price."
      disclaimer="Unit prices are whatever you enter — this tool does not assume or look up Vexora Global's actual pricing. For a real quote, use the Specification Enquiry Form."
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <Field label="Number of students">
          <NumberInput value={students} onChange={setStudents} placeholder="e.g. 600" />
        </Field>
        <Field label="Currency">
          <Select value={currency} onChange={setCurrency} options={CURRENCIES} />
        </Field>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-graphite">Garment items</h2>
          <button type="button" onClick={addItem} className="inline-flex items-center gap-1 text-sm text-clay font-medium hover:underline">
            <Plus size={16} /> Add item
          </button>
        </div>
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.key} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-end bg-surface-card border border-border rounded-md p-3">
              <Field label="Item">
                <input
                  className="w-full border border-border rounded-sm px-3 py-2 text-sm"
                  value={it.name}
                  onChange={(e) => updateItem(it.key, "name", e.target.value)}
                />
              </Field>
              <Field label="Qty/student">
                <div className="w-20">
                  <NumberInput value={it.qtyPerStudent} onChange={(v) => updateItem(it.key, "qtyPerStudent", v)} />
                </div>
              </Field>
              <Field label={`Unit price (${sym})`}>
                <div className="w-24">
                  <NumberInput value={it.unitPrice} onChange={(v) => updateItem(it.key, "unitPrice", v)} />
                </div>
              </Field>
              <button type="button" onClick={() => removeItem(it.key)} className="text-status-danger hover:opacity-70 mb-2.5" aria-label="Remove">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {hasResults && (
        <ResultCard title="Plan summary">
          {rows.map((r) => (
            <ResultRow key={r.key} label={`${r.name} (${r.totalQty.toLocaleString()} pcs)`} value={`${sym}${r.totalCost.toLocaleString()}`} />
          ))}
          <div className="border-t border-white/20 pt-2 mt-2">
            <ResultRow label="Total budget" value={`${sym}${grandTotal.toLocaleString()}`} big />
          </div>
        </ResultCard>
      )}
    </ToolShell>
  );
}
