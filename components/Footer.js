import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-graphite text-white mt-16">
      <div className="max-w-content mx-auto px-4 md:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="relative w-28 h-28 -ml-2 mb-2">
            <Image src="/images/brand/logo-badge.jpg" alt="Vexora Global" fill className="object-contain" sizes="112px" />
          </div>
          <p className="text-white/60">
            Textile, apparel, uniform, workwear, sourcing &amp; consulting — under one roof.
          </p>
        </div>

        <div>
          <p className="font-medium mb-3 text-white/80">Products</p>
          <ul className="space-y-2 text-white/60">
            <li><Link href="/catalogue">Full Catalogue</Link></li>
            <li><Link href="/products/fashion-apparel">Fashion Apparel</Link></li>
            <li><Link href="/products/school-uniforms">School Uniforms</Link></li>
            <li><Link href="/products/corporate-uniforms">Corporate Uniforms</Link></li>
            <li><Link href="/products/industrial-workwear">Industrial Workwear</Link></li>
            <li><Link href="/products/hospital-uniforms">Hospital Uniforms</Link></li>
            <li><Link href="/products/technical-fabrics">Technical Fabrics</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3 text-white/80">Services</p>
          <ul className="space-y-2 text-white/60">
            <li><Link href="/services/consulting">Textile Consulting</Link></li>
            <li><Link href="/services/sourcing">Sourcing</Link></li>
            <li><Link href="/academy">Textile Academy</Link></li>
            <li><Link href="/tools">Digital Tools</Link></li>
            <li><Link href="/blog">Blog / Knowledge Centre</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3 text-white/80">Company</p>
          <ul className="space-y-2 text-white/60">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/legal/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/legal/terms">Terms of Use</Link></li>
            <li><Link href="/legal/cookie-policy">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Vexora Global. All rights reserved.
      </div>
    </footer>
  );
}
