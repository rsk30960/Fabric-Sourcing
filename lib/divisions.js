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
    heroImage: "/images/marketing/12-fashion-runway.jpg",
    heroImagePosition: "object-top",
  },
  "school-uniforms": {
    name: "School Uniforms",
    tagline: "Shirt, Trouser, Skirt, Tie, Sportswear, Winter Jacket",
    description: "Made-to-order — bulk/branded organizational orders for schools, produced in-house.",
    defaultProductionType: "Owned Manufacturing",
    subcategories: ["Shirt", "Pant/Trouser", "Short Trouser", "Skirt", "Tie", "Sportswear", "Winter Jacket"],
    enquiryOnly: false,
    icon: "graduationCap",
    heroImage: "/images/marketing/09-school-uniforms.jpg",
    heroImagePosition: "object-top",
  },
  "corporate-uniforms": {
    name: "Corporate Uniforms",
    tagline: "Shirt, Trouser, T-Shirt, Blazer",
    description: "Made-to-order — bulk/branded organizational orders for corporates, produced in-house.",
    defaultProductionType: "Owned Manufacturing",
    subcategories: ["Shirt", "Pant/Trouser", "T-Shirts", "Blazers"],
    enquiryOnly: false,
    icon: "briefcase",
    heroImage: "/images/marketing/11-corporate-apparel.jpg",
    heroImagePosition: "object-top",
  },
  "industrial-workwear": {
    name: "Industrial Workwear",
    tagline: "Shirt, Trouser, Coverall, Hi-Vis",
    description: "Produced in-house, for domestic and export markets.",
    defaultProductionType: "Owned Manufacturing",
    subcategories: ["Shirt", "Pant/Trouser", "Coverall", "Hi-Vis wear"],
    enquiryOnly: false,
    icon: "hardHat",
    heroImage: "/images/marketing/10-industrial-workwear.jpg",
    heroImagePosition: "object-top",
  },
  "hospital-uniforms": {
    name: "Hospital Uniforms",
    tagline: "Doctor's Coat, Nurse Scrub Set, Support Staff Uniform, Scrub Cap",
    description: "Made-to-order — bulk/branded organizational orders for hospitals and clinics, produced in-house.",
    defaultProductionType: "Owned Manufacturing",
    subcategories: ["Doctor's Coat", "Nurse Scrub Set", "Support Staff Uniform", "Scrub Cap"],
    enquiryOnly: false,
    icon: "stethoscope",
    // heroImage: set once the division banner is generated — see naming convention given to the user
  },
  "technical-fabrics": {
    name: "Technical Fabrics",
    tagline: "By treatment or application — fully custom",
    description: "No fixed catalogue — sourced by treatment (e.g. waterproof, antimicrobial, stretch) or application, entirely to your specification.",
    defaultProductionType: "Partner-Sourced",
    subcategories: [],
    enquiryOnly: true, // Volume 3 §3.1 — confirmed enquiry-first, no browsable grid
    icon: "layers",
    heroImage: "/images/marketing/06-fabric-flowing-silk.jpg",
  },
};

export function getDivision(slug) {
  return DIVISIONS[slug] || null;
}
