// Variants: Primary (graphite fill), Accent (clay fill), Secondary (graphite outline), Ghost (text only)

import Link from "next/link";

const VARIANTS = {
  primary: "bg-graphite text-white hover:bg-graphite-dark",
  accent: "bg-clay text-white hover:bg-clay-dark",
  secondary: "bg-transparent text-graphite border border-graphite hover:bg-graphite/5",
  ghost: "bg-transparent text-graphite hover:bg-graphite/5",
};

// 44x44px minimum tap target; min-h-11 guarantees this regardless of label length.
const SIZES = {
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

export default function Button({ variant = "primary", size = "md", href, children, className = "", ...props }) {
  const classes = `inline-flex items-center justify-center gap-1.5 rounded-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
