import SpecificationForm from "../../components/SpecificationForm";

export const metadata = {
  title: "Request a Quote | Fabric Sourcing",
  description:
    "Tell us your fabric, trims, artwork, measurements, styling, and quantity — we'll get back to you with pricing and conditions within 1-2 business days.",
};

export default function QuoteRequestPage({ searchParams }) {
  const prefillProduct = searchParams?.product || "";

  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Request a quote</h1>
        <p className="text-ink-secondary mb-10">
          Since every order is made to your specification, pricing depends on what you need — fabric,
          trims, artwork, measurements, and styling. Add as many products as you like in one submission.
        </p>
        <SpecificationForm prefillProduct={prefillProduct} />
      </div>
    </div>
  );
}
