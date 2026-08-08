// Shared UI primitives for the digital tools/calculators (docs/platform-vision-v2.md).
// All calculators are pure client-side arithmetic on user-supplied numbers — no fabricated
// industry-standard figures, pricing, or compliance claims baked in.

export function Field({ label, suffix, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-graphite mb-1.5">{label}</span>
      <div className="flex items-center gap-2">
        {children}
        {suffix && <span className="text-sm text-ink-secondary whitespace-nowrap">{suffix}</span>}
      </div>
    </label>
  );
}

export function NumberInput({ value, onChange, placeholder, min = 0, step = "any" }) {
  return (
    <input
      type="number"
      min={min}
      step={step}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-graphite/30"
    />
  );
}

export function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-graphite/30"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function ResultCard({ title, children }) {
  return (
    <div className="bg-graphite text-white rounded-md p-6">
      <p className="text-xs uppercase tracking-wide text-white/60 mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function ResultRow({ label, value, big }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-white/70">{label}</span>
      <span className={big ? "text-2xl font-semibold text-clay" : "text-sm font-medium"}>{value}</span>
    </div>
  );
}

export function ToolShell({ title, description, disclaimer, children }) {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl font-semibold text-graphite mb-3">{title}</h1>
        <p className="text-ink-secondary">{description}</p>
      </div>
      <div className="max-w-xl">{children}</div>
      {disclaimer && (
        <p className="max-w-xl text-xs text-ink-secondary mt-8 border-t border-border pt-4">{disclaimer}</p>
      )}
    </div>
  );
}
