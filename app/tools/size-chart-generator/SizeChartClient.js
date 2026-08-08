"use client";

import { useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { ToolShell, Field } from "../../../components/tools/CalculatorUI";

// Deliberately blank by default — this tool formats YOUR measurements into a chart. It does not
// ship with any "standard" men's/women's sizing built in, since sizing varies significantly by
// manufacturer/region and there's no single correct default to assume.
export default function SizeChartClient() {
  const [sizes, setSizes] = useState(["S", "M", "L"]);
  const [rows, setRows] = useState([
    { key: crypto.randomUUID(), label: "Chest", values: { S: "", M: "", L: "" } },
  ]);
  const [unit, setUnit] = useState("in");

  function addSize() {
    const label = `Size ${sizes.length + 1}`;
    setSizes((s) => [...s, label]);
    setRows((rs) => rs.map((r) => ({ ...r, values: { ...r.values, [label]: "" } })));
  }
  function renameSize(oldLabel, newLabel) {
    if (!newLabel || sizes.includes(newLabel)) return;
    setSizes((s) => s.map((sz) => (sz === oldLabel ? newLabel : sz)));
    setRows((rs) =>
      rs.map((r) => {
        const { [oldLabel]: val, ...rest } = r.values;
        return { ...r, values: { ...rest, [newLabel]: val } };
      })
    );
  }
  function removeSize(label) {
    if (sizes.length <= 1) return;
    setSizes((s) => s.filter((sz) => sz !== label));
    setRows((rs) =>
      rs.map((r) => {
        const { [label]: _, ...rest } = r.values;
        return { ...r, values: rest };
      })
    );
  }
  function addRow() {
    setRows((rs) => [
      ...rs,
      { key: crypto.randomUUID(), label: "", values: Object.fromEntries(sizes.map((s) => [s, ""])) },
    ]);
  }
  function updateRowLabel(key, label) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, label } : r)));
  }
  function updateCell(key, size, value) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, values: { ...r.values, [size]: value } } : r)));
  }
  function removeRow(key) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.key !== key) : rs));
  }

  function downloadCsv() {
    const header = ["Measurement", ...sizes].join(",");
    const lines = rows.map((r) => [r.label || "", ...sizes.map((s) => r.values[s] || "")].join(","));
    const csv = [header, ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "size-chart.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell
      title="Size Chart Generator"
      description="Build a formatted size chart from your own measurements — add sizes and measurement points, fill in the values, export as CSV."
      disclaimer="This tool starts blank on purpose — sizing standards vary by manufacturer and region, so there's no single default chart to assume. Enter your own measurements."
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-medium text-graphite">Unit:</span>
        <button
          onClick={() => setUnit("in")}
          className={`text-xs px-3 py-1.5 rounded-sm ${unit === "in" ? "bg-graphite text-white" : "bg-surface-page text-ink-secondary"}`}
        >
          inches
        </button>
        <button
          onClick={() => setUnit("cm")}
          className={`text-xs px-3 py-1.5 rounded-sm ${unit === "cm" ? "bg-graphite text-white" : "bg-surface-page text-ink-secondary"}`}
        >
          cm
        </button>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border border-border">
          <thead>
            <tr className="bg-surface-page">
              <th className="text-left px-3 py-2 border-b border-r border-border font-medium text-ink-secondary">
                Measurement
              </th>
              {sizes.map((s) => (
                <th key={s} className="px-3 py-2 border-b border-r border-border last:border-r-0">
                  <div className="flex items-center gap-1">
                    <input
                      value={s}
                      onChange={(e) => renameSize(s, e.target.value)}
                      className="w-16 border-none bg-transparent font-medium text-center focus:outline-none"
                    />
                    <button onClick={() => removeSize(s)} className="text-status-danger" aria-label="Remove size">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-2 py-2 border-b border-border">
                <button onClick={addSize} className="text-clay" aria-label="Add size">
                  <Plus size={16} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td className="border-r border-b border-border px-2 py-1">
                  <input
                    value={r.label}
                    onChange={(e) => updateRowLabel(r.key, e.target.value)}
                    placeholder="e.g. Chest"
                    className="w-full border-none px-1 py-1 text-sm focus:outline-none"
                  />
                </td>
                {sizes.map((s) => (
                  <td key={s} className="border-r border-b border-border px-2 py-1 last:border-r-0">
                    <input
                      type="number"
                      value={r.values[s] || ""}
                      onChange={(e) => updateCell(r.key, s, e.target.value)}
                      className="w-16 border-none px-1 py-1 text-sm text-center focus:outline-none"
                      placeholder={unit}
                    />
                  </td>
                ))}
                <td className="border-b border-border px-2 py-1 text-center">
                  <button onClick={() => removeRow(r.key)} className="text-status-danger" aria-label="Remove row">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button onClick={addRow} className="inline-flex items-center gap-1.5 border border-graphite text-graphite px-4 py-2 rounded-sm text-sm font-medium hover:bg-graphite/5">
          <Plus size={16} /> Add measurement
        </button>
        <button onClick={downloadCsv} className="inline-flex items-center gap-1.5 bg-graphite text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-graphite-dark">
          <Download size={16} /> Download CSV
        </button>
      </div>
    </ToolShell>
  );
}
