import Image from "next/image";
import ConsultingForm from "../../../components/ConsultingForm";

export const metadata = {
  title: "Textile Consulting | Vexora Global",
  description: "Advisory built on 20+ years of hands-on textile industry experience.",
};

export default function ConsultingPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-12">
        <Image
          src="/images/marketing/31-textile-consulting-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Textile Consulting</h1>
        <p className="text-ink-secondary">
          Advisory grounded in two decades of hands-on textile industry experience — not generic
          consulting frameworks. Whether it's a one-time audit, an ongoing retainer, or a specific project,
          we start by understanding your actual challenge.
        </p>
      </div>
      <div className="max-w-xl">
        <ConsultingForm />
      </div>
    </div>
  );
}
