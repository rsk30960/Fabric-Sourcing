// Production Type + Markets Served badges — confirmed trust/credibility differentiators,
// shown on product cards and detail pages (docs/volume-2-website-functional-requirements.md §2.6/§2.8,
// docs/volume-1-business-requirements.md §1.3).

const PRODUCTION_TYPE_STYLES = {
  "Owned Manufacturing": "bg-status-successBg text-status-success",
  "Partner-Sourced": "bg-status-infoBg text-status-info",
};

export function ProductionTypeBadge({ type }) {
  const style = PRODUCTION_TYPE_STYLES[type] || "bg-surface-page text-ink-secondary";
  return (
    <span className={`inline-block px-2.5 py-1 rounded-sm text-xs font-medium ${style}`}>
      {type}
    </span>
  );
}

export function MarketsServedBadge({ markets = [] }) {
  return (
    <span className="inline-block px-2.5 py-1 rounded-sm text-xs font-medium bg-surface-page text-ink-secondary border border-border">
      {markets.join(" + ")}
    </span>
  );
}
