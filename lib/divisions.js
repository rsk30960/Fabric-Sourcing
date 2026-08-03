// Division metadata — docs/volume-3-product-catalogue.md §3.1, docs/volume-1-business-requirements.md §1.3
// `icon` is a string key mapped to a lucide-react component in components/DivisionArt.js —
// kept as a string here rather than importing the icon directly so this stays plain data,
// safely importable from both server and client code.
export const DIVISIONS = {
  "fashion-apparel": {
    name: "Fashion Apparel",
    tagline: "Men's, Women's, Kids",
    description: "Sourced through our partner factory network — casualwear and formalwear across all three segments.",
    defaultProductionType: "Partner-Sourced",
    subcategories: ["Men's", "Women's", "Kids"],
    enquiryOnly: false,
    icon: "shirt",
  },
  "school-uniforms": {
    name: "School Uniforms",
    tagline: "Shirt, Trouser, Skirt, Tie, Sportswear, Winter Jacket",
    description: "Made-to-order — bulk/branded organizational orders for schools, produced in-house.",
    defaultProductionType: "Owned Manufacturing",
    subcategories: ["Shirt", "Pant/Trouser", "Short Trouser", "Skirt", "Tie", "Sportswear", "Winter Jacket"],
    enquiryOnly: false,
    icon: "graduationCap",
  },
  "corporate-uniforms": {
    name: "Corporate Uniforms",
    tagline: "Shirt, Trouser, T-Shirt, Blazer",
    description: "Made-to-order — bulk/branded organizational orders for corporates, produced in-house.",
    defaultProductionType: "Owned Manufacturing",
    subcategories: ["Shirt", "Pant/Trouser", "T-Shirts", "Blazers"],
    enquiryOnly: false,
    icon: "briefcase",
  },
  "industrial-workwear": {
    name: "Industrial Workwear",
    tagline: "Shirt, Trouser, Coverall, Hi-Vis",
    description: "Produced in-house, for domestic and export markets.",
    defaultProductionType: "Owned Manufacturing",
    subcategories: ["Shirt", "Pant/Trouser", "Coverall", "Hi-Vis wear"],
    enquiryOnly: false,
    icon: "hardHat",
  },
  "technical-fabrics": {
    name: "Technical Fabrics",
    tagline: "By treatment or application — fully custom",
    description: "No fixed catalogue — sourced by treatment (e.g. waterproof, antimicrobial, stretch) or application, entirely to your specification.",
    defaultProductionType: "Partner-Sourced",
    subcategories: [],
    enquiryOnly: true, // Volume 3 §3.1 — confirmed enquiry-first, no browsable grid
    icon: "layers",
  },
};

export function getDivision(slug) {
  return DIVISIONS[slug] || null;
}
