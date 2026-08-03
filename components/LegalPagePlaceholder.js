// Legal pages are deliberately NOT drafted with real policy text here.
// docs/volume-2-website-functional-requirements.md §2.13 and docs/volume-7-security-compliance.md
// §7.5 are both explicit: legal *content* requires real legal review, especially given the
// confirmed 5-market export exposure (USA, EU, Middle East, Australia, New Zealand — each with
// different privacy/consumer-protection regimes). Generating plausible-sounding boilerplate here
// would risk it being mistaken for reviewed, compliant text. This component is an honest
// placeholder instead — the sections a real policy will need, with no invented legal claims.

export default function LegalPagePlaceholder({ title, sections }) {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-graphite mb-4">{title}</h1>

        <div className="bg-status-warningBg text-status-warning rounded-md p-5 mb-10 text-sm">
          <p className="font-medium mb-1">This page is a placeholder.</p>
          <p>
            The final text of this policy has not been written or legally reviewed yet. Given we serve
            buyers across India, the USA, the EU, the Middle East, Australia, and New Zealand — each with
            different privacy and consumer-protection requirements — this needs real legal review before
            launch, not generated boilerplate. Do not treat anything below as a binding policy.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-semibold text-graphite mb-2">{s.heading}</h2>
              <p className="text-sm text-ink-secondary">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
