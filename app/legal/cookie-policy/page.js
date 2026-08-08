import LegalPagePlaceholder from "../../../components/LegalPagePlaceholder";

export const metadata = { title: "Cookie Policy | Vexora Global" };

export default function CookiePolicyPage() {
  return (
    <LegalPagePlaceholder
      title="Cookie Policy"
      sections={[
        { heading: "Cookies we use", note: "GA4 analytics is a confirmed launch requirement (docs/volume-8-api-integrations.md) — a consent-first cookie banner (accept/decline, not accept-only) is specified in docs/volume-7-security-compliance.md §7.5 but not yet built." },
        { heading: "Managing your preferences", note: "Pending the cookie consent banner implementation." },
      ]}
    />
  );
}
