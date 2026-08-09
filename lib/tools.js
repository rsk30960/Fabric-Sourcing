// Digital Tools registry — docs/platform-vision-v2.md. Drives the /tools index page.
export const TOOLS = [
  {
    slug: "gsm-calculator",
    name: "Fabric GSM Calculator",
    description: "Work out fabric weight (GSM) from a swatch sample.",
    icon: "layers",
    image: "/images/tools/gsm-calculator.jpg",
  },
  {
    slug: "fabric-consumption-calculator",
    name: "Fabric Consumption Calculator",
    description: "Estimate total fabric required for an order, with a wastage allowance.",
    icon: "shirt",
    image: "/images/tools/fabric-consumption-calculator.jpg",
  },
  {
    slug: "garment-cost-estimator",
    name: "Garment Cost Estimator",
    description: "Break down fabric, trims, labor, and overhead into a per-unit cost and suggested price.",
    icon: "briefcase",
    image: "/images/tools/garment-cost-estimator.jpg",
  },
  {
    slug: "container-load-calculator",
    name: "MOQ & Container Load Calculator",
    description: "Estimate how many cartons and pieces fit in a shipping container.",
    icon: "hardHat",
    image: "/images/tools/container-load-calculator.jpg",
  },
  {
    slug: "export-cost-calculator",
    name: "Export Cost Calculator",
    description: "Estimate landed cost per unit from FOB price, freight, insurance, and duty.",
    icon: "handshake",
    image: "/images/tools/export-cost-calculator.jpg",
  },
  {
    slug: "uniform-planning-calculator",
    name: "Uniform Planning Calculator (Schools)",
    description: "Plan quantities and budget for a school uniform program.",
    icon: "graduationCap",
    image: "/images/tools/uniform-planning-calculator.jpg",
  },
  {
    slug: "size-chart-generator",
    name: "Size Chart Generator",
    description: "Build and export a formatted size chart from your own measurements.",
    icon: "bookOpen",
    image: "/images/tools/size-chart-generator.jpg",
  },
];

export function getTool(slug) {
  return TOOLS.find((t) => t.slug === slug) || null;
}
