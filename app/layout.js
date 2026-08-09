import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AIConsultant from "../components/AIConsultant";

// Serif headings (craft/heritage feel) + clean sans body. next/font self-hosts these (no
// external request), exposed as CSS variables and consumed in globals.css.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

// Business name confirmed as Vexora Global; visual identity (logo, palette) still pending
// finalization (docs/volume-1-business-requirements.md §1.1)
export const metadata = {
  title: "Vexora Global | Textile, Apparel, Uniform & Workwear Sourcing Partner",
  description:
    "A sourcing partner across fashion apparel, school & corporate uniforms, industrial workwear, and technical fabrics — with owned manufacturing and a partner-factory network serving domestic and export buyers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceSerif.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <AIConsultant />
      </body>
    </html>
  );
}
