import LegalPagePlaceholder from "../../../components/LegalPagePlaceholder";

export const metadata = { title: "Terms of Use | Fabric Sourcing" };

export default function TermsPage() {
  return (
    <LegalPagePlaceholder
      title="Terms of Use"
      sections={[
        { heading: "Site usage", note: "Standard terms governing use of this website — pending legal review." },
        { heading: "Quotes & orders", note: "Pricing is quote-per-specification, not a fixed catalogue price (docs/volume-3-product-catalogue.md §3.1) — formal quotation terms and conditions are pending." },
        { heading: "Intellectual property", note: "Ownership of buyer-submitted designs/artwork uploaded via the Specification Enquiry Form needs explicit terms — not yet drafted." },
        { heading: "Limitation of liability", note: "Pending legal review." },
      ]}
    />
  );
}
