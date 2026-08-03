import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DivisionArt from "./DivisionArt";

export default function DivisionCard({ label, description, href, tag, icon }) {
  return (
    <Link
      href={href}
      className="group block bg-surface-card border border-border rounded-md overflow-hidden hover:border-clay hover:shadow-md transition-all"
    >
      {icon && <DivisionArt icon={icon} size="sm" />}
      <div className="p-6">
        {tag && (
          <span className="inline-block text-xs font-medium text-clay bg-clay/10 px-2 py-0.5 rounded-sm mb-3">
            {tag}
          </span>
        )}
        <h3 className="text-lg font-semibold text-graphite mb-1">{label}</h3>
        <p className="text-sm text-ink-secondary mb-4">{description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-clay">
          Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
