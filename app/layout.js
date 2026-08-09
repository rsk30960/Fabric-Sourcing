import { Work_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AIConsultant from "../components/AIConsultant";

// Serif headings (craft/heritage feel) + warmer humanist sans body (swapped from Inter, which
// read too generic/tech-startup for the brand). next/font self-hosts these (no external
// request), exposed as CSS variables and consumed in globals.css.
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

// Business name and logo confirmed as Vexora Global (docs/volume-1-business-requirements.md §1.1).
// Favicon/app icon are handled automatically by Next.js via app/icon.png + app/apple-icon.png.
export const metadata = {
  title: "Vexora Global | Textile, Apparel, Uniform & Workwear Sourcing Partner",
  description:
    "A sourcing partner across fashion apparel, school & corporate uniforms, industrial workwear, and technical fabrics — with owned manufacturing and a partner-factory network serving domestic and export buyers.",
  openGraph: {
    title: "Vexora Global | Textile, Apparel, Uniform & Workwear Sourcing Partner",
    description:
      "A sourcing partner across fashion apparel, school & corporate uniforms, industrial workwear, and technical fabrics.",
    images: ["/images/brand/logo-badge.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${sourceSerif.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <AIConsultant />
      </body>
    </html>
  );
}
