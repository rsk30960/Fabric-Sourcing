import CareersForm from "../../components/CareersForm";

// Careers — docs/volume-2-website-functional-requirements.md §2.12
// Freelance/contract-oriented, not full-time roles — solo operation today (Volume 4 §4.7),
// plans to bring on freelancers.
export const metadata = {
  title: "Careers | Fabric Sourcing",
  description: "We work with freelance and contract talent across textile production, sourcing, and design.",
};

export default function CareersPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Work with us</h1>
        <p className="text-ink-secondary">
          We're a small, growing team and work primarily with freelance and contract talent — pattern
          makers, garment technicians, regional sourcing agents, and similar roles. If that's you, we'd
          like to hear from you even if nothing's listed below right now.
        </p>
      </div>

      <div className="max-w-xl">
        <CareersForm />
      </div>
    </div>
  );
}
