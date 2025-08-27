import CalendlyInline from "components/CalendyInline";

export default function BookPage() {
  return (
    <section className="container mx-auto py-24 px-4 md:px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
        Book Your <span className="text-brand-blue">Free Website Audit</span>
      </h1>
      <div className="h-[600px] overflow-hidden rounded-lg shadow max-w-4xl mx-auto">
        <CalendlyInline url="https://calendly.com/salvador-cardenas-cruz-websiteconsultingaustralia/30min" />
      </div>
    </section>
  );
}