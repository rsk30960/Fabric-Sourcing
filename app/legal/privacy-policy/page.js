import LegalPagePlaceholder from "../../../components/LegalPagePlaceholder";

export const metadata = { title: "Privacy Policy | Fabric Sourcing" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPagePlaceholder
      title="Privacy Policy"
      sections={[
        { heading: "What we collect", note: "Contact/company details from forms (Contact, Specification Enquiry, Careers), reference images and portfolio/resume files, and standard analytics data." },
        { heading: "How we use it", note: "To respond to enquiries, produce quotes, and evaluate applications — see docs/volume-6-database-design.md for the actual data model." },
        { heading: "Your rights", note: "A real data-subject access/deletion request process is planned (docs/volume-7-security-compliance.md §7.5) but not yet live — contact us directly in the meantime." },
        { heading: "Data retention & deletion", note: "Soft-delete by default, with a genuine hard-delete/anonymization path on request (docs/volume-6-database-design.md §6.2) — pending full implementation." },
        { heading: "International transfers", note: "Relevant given our export markets — specifics pending legal review." },
      ]}
    />
  );
}
