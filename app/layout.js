import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

// Working name only — final brand pending (docs/volume-1-business-requirements.md §1.1)
export const metadata = {
  title: "Fabric Sourcing | Textile, Apparel, Uniform & Workwear Sourcing Partner",
  description:
    "A sourcing partner across fashion apparel, school & corporate uniforms, industrial workwear, and technical fabrics — with owned manufacturing and a partner-factory network serving domestic and export buyers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
