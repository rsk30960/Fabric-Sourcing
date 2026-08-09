// Illustrated placeholder visuals — deliberately NOT photography. Real product/lifestyle
// photography needs to be sourced or shot separately; downloading stock images from the
// internet isn't something to do without explicit sign-off, and presenting stock photos as
// real product shots would be misleading anyway (see git history for the earlier call on this).
// These are custom illustrated compositions instead — draped-fabric bands, a stitched-corner
// accent, a fabric-swatch chip, and a layered gradient icon badge — used consistently across
// Home, division/product cards, product detail, blog cards, Academy cards, and Tools cards.

import {
  Shirt, GraduationCap, Briefcase, HardHat, Layers,
  Handshake, Lightbulb, BookOpen, LayoutGrid, Package, Stethoscope,
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
  stethoscope: Stethoscope,
};

// Warm, earthy accent family — stays within the graphite/clay palette (deliberately never
// blue/gold, reserved to keep this visually distinct from finrise-website). Cycles across
// divisions/content types so cards don't all read as identical rust-orange circles.
const ACCENTS = {
  shirt: "#B5502F", // clay — Fashion Apparel
  graduationCap: "#A9762C", // ochre — School Uniforms
  briefcase: "#7A6A3F", // olive-brown — Corporate Uniforms
  hardHat: "#8F3F23", // rust — Industrial Workwear
  layers: "#6B5D4F", // warm taupe — Technical Fabrics
  handshake: "#B5502F", // clay — Sourcing
  lightbulb: "#A9762C", // ochre — Academy / Consulting
  bookOpen: "#7A6A3F", // olive-brown — Blog
  catalogue: "#8F3F23", // rust — Catalogue
  stethoscope: "#6B5D4F", // warm taupe — Hospital Uniforms
};

const SIZES = {
  sm: { box: "aspect-[4/3]", circle: 56, icon: 22 },
  md: { box: "aspect-[4/3]", circle: 80, icon: 32 },
  lg: { box: "aspect-square", circle: 112, icon: 44 },
  hero: { box: "aspect-[16/10]", circle: 144, icon: 56 },
};

export default function DivisionArt({ icon = "shirt", size = "md", className = "" }) {
  const Icon = ICONS[icon] || Package;
  const accent = ACCENTS[icon] || "#B5502F";
  const { box, circle, icon: iconSize } = SIZES[size] || SIZES.md;

  return (
    <div className={`relative overflow-hidden rounded-md bg-surface-page ${box} ${className}`}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Draped-fabric bands — soft overlapping curves suggesting cloth, not a literal scene */}
        <path
          d="M-20,225 C80,185 160,265 260,205 C340,160 380,215 440,195 L440,320 L-20,320 Z"
          fill={accent}
          opacity="0.07"
        />
        <path
          d="M-20,255 C100,215 200,285 320,235 C380,210 410,245 440,230 L440,320 L-20,320 Z"
          fill={accent}
          opacity="0.1"
        />

        {/* Corner stitch-line accent — dashed diagonal, nods at craftsmanship/manufacturing */}
        <path d="M312,18 L382,88" stroke={accent} strokeWidth="2" strokeDasharray="4 6" opacity="0.32" strokeLinecap="round" />
        <path d="M334,8 L404,78" stroke={accent} strokeWidth="2" strokeDasharray="4 6" opacity="0.22" strokeLinecap="round" />

        {/* Fabric-swatch chip */}
        <rect x="22" y="22" width="28" height="18" rx="3" fill={accent} opacity="0.16" />
        <rect x="22" y="22" width="28" height="18" rx="3" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.4" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute rounded-full blur-xl"
          style={{ width: circle * 1.6, height: circle * 1.6, backgroundColor: accent, opacity: 0.12 }}
        />
        <div
          className="relative flex items-center justify-center rounded-full shadow-sm"
          style={{
            width: circle,
            height: circle,
            background: `linear-gradient(135deg, ${accent}26, ${accent}0f)`,
            border: `1.5px solid ${accent}55`,
          }}
        >
          <Icon size={iconSize} style={{ color: accent }} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
