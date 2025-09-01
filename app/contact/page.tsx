// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Website Consulting Australia",
  description: "Get in touch for SEO, performance, and UX consulting.",
};

export default function ContactPage() {
  return (
    <main className="min-h-[60vh] bg-gray-50 dark:bg-neutral-950">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-100">
          Contact Us
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Tell us about your site and goals. We’ll reply within one business day.
        </p>

        {/* Client component handles interactivity */}
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}