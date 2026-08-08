// Digital Tools registry — docs/platform-vision-v2.md. Drives the /tools index page.
export const TOOLS = [
  {
    slug: "gsm-calculator",
    name: "Fabric GSM Calculator",
    description: "Work out fabric weight (GSM) from a swatch sample.",
    icon: "layers",
  },
  {
    slug: "fabric-consumption-calculator",
    name: "Fabric Consumption Calculator",
    description: "Estimate total fabric required for an order, with a wastage allowance.",
    icon: "shirt",
  },
  {
    slug: "garment-cost-estimator",
    name: "Garment Cost Estimator",
    description: "Break down fabric, trims, labor, and overhead into a per-unit cost and suggested price.",
    icon: "briefcase",
  },
  {
    slug: "container-load-calculator",
    name: "MOQ & Container Load Calculator",
    description: "Estimate how many cartons and pieces fit in a shipping container.",
    icon: "hardHat",
  },
  {
    slug: "export-cost-calculator",
    name: "Export Cost Calculator",
    description: "Estimate landed cost per unit from FOB price, freight, insurance, and duty.",
    icon: "handshake",
  },
  {
    slug: "uniform-planning-calculator",
    name: "Uniform Planning Calculator (Schools)",
    description: "Plan quantities and budget for a school uniform program.",
    icon: "graduationCap",
  },
  {
    slug: "size-chart-generator",
    name: "Size Chart Generator",
    description: "Build and export a formatted size chart from your own measurements.",
    icon: "bookOpen",
  },
];

export function getTool(slug) {
  return TOOLS.find((t) => t.slug === slug) || null;
}
