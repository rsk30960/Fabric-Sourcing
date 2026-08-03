import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "Contact | Fabric Sourcing",
  description: "Get in touch for general enquiries about our products, services, or sourcing capability.",
};

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Get in touch</h1>
        <p className="text-ink-secondary mb-10">
          Not sure exactly what you need yet? Start here — we typically respond within 1-2 business days.
          Ready to request a quote against specific products? Use our{" "}
          <a href="/quote-request" className="text-clay hover:underline">Specification form</a> instead.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
