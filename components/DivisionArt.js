// Illustrated placeholder visuals — deliberately NOT photography. Real product/lifestyle
// photography needs to be sourced or shot separately; downloading stock images from the
// internet isn't something to do without explicit sign-off, and presenting stock photos as
// real product shots would be misleading anyway. These are clean, on-brand icon compositions
// instead, used consistently across Home, product cards, product detail, and blog cards.

import {
  Shirt, GraduationCap, Briefcase, HardHat, Layers,
  Handshake, Lightbulb, BookOpen, LayoutGrid, Package,
} from "lucide-react";

const ICONS = {
  shirt: Shirt,
  graduationCap: GraduationCap,
  briefcase: Briefcase,
  hardHat: HardHat,
  layers: Layers,
  handshake: Handshake,
  lightbulb: Lightbulb,
  bookOpen: BookOpen,
  catalogue: LayoutGrid,
};

const SIZES = {
  sm: { box: "aspect-[4/3]", circle: "w-14 h-14", icon: 22 },
  md: { box: "aspect-[4/3]", circle: "w-20 h-20", icon: 32 },
  lg: { box: "aspect-square", circle: "w-28 h-28", icon: 44 },
  hero: { box: "aspect-[16/10]", circle: "w-36 h-36", icon: 56 },
};

export default function DivisionArt({ icon = "shirt", size = "md", className = "" }) {
  const Icon = ICONS[icon] || Package;
  const { box, circle, icon: iconSize } = SIZES[size] || SIZES.md;

  return (
    <div
      className={`relative overflow-hidden rounded-md bg-surface-page flex items-center justify-center ${box} ${className}`}
    >
      {/* Subtle dot-grid pattern, on-brand, no external assets */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
          color: "#262220",
        }}
      />
      <div className={`relative flex items-center justify-center rounded-full bg-clay/10 ${circle}`}>
        <Icon size={iconSize} className="text-clay" strokeWidth={1.5} />
      </div>
    </div>
  );
}
