import Header from "components/Header";
import Hero from "components/Hero";
import Features from "components/Features";
import Section from "components/Section";
import Footer from "components/Footer";
import Customers from "components/Customers";
import Image from "next/image";
import Accordion from "components/Accordion";
import Reviews from "components/Reviews";
import Download from "components/Download"; // we'll repurpose this as a CTA

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Header />
      <main>
        <Hero />
        <Features />

        {/* Section 1: Performance + SEO value prop */}
        <Section
          leftHalf={
            <>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                Faster sites. Better rankings. More conversions.
              </h2>
              <p className="text-xl font-light text-gray-700 dark:text-gray-300">
                We analyse your site’s speed, technical SEO, and user flows to remove bottlenecks that cost you traffic
                and sales. Expect tangible lifts in Core Web Vitals, search visibility, and on-page conversion.
              </p>
              <ul className="mt-6 space-y-2 text-left text-gray-700 dark:text-gray-300">
                <li>• Core Web Vitals improvements (LCP, CLS, INP)</li>
                <li>• Technical SEO clean-up (indexing, sitemaps, metadata)</li>
                <li>• UX fixes that reduce friction and abandonment</li>
              </ul>
            </>
          }
          rightHalf={
            <Image
              src="/performance-image.png" // replace with your asset
              alt="Performance & SEO improvements"
              width={640}
              height={480}
              className="w-full h-auto rounded-lg shadow"
            />
          }
        />

        {/* Social proof / logos */}
        <Customers />

        {/* Section 2: FAQs + “Why us” summary */}
        <Section
          leftHalf={<Accordion /* Consider wiring with FAQs below */ />}
          rightHalf={
            <div className="flex flex-col justify-end">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                Why Website Consulting Australia?
              </h2>
              <p className="text-xl font-light text-gray-700 dark:text-gray-300">
                Senior-level guidance without agency bloat. We prioritise high-impact fixes first, keep you informed with
                plain-English updates, and measure everything against business results—not vanity metrics.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-700 dark:text-gray-300">
                <div>✓ Actionable roadmaps, not audits that collect dust</div>
                <div>✓ Transparent comms and weekly progress updates</div>
                <div>✓ Flexible engagement: advisory or hands-on execution</div>
                <div>✓ Experience across ecommerce, SaaS, and lead gen</div>
              </div>
            </div>
          }
        />

        {/* Testimonials */}
        <Reviews />

        {/* Repurpose Download -> Primary CTA */}
        <Download
          title="Get a Free Website Audit"
          subtitle="We’ll review speed, SEO, and UX—then give you a clear, prioritised action plan."
          primaryCtaText="Book Your Audit"
          primaryCtaHref="/contact"
          secondaryCtaText="See What’s Included"
          secondaryCtaHref="/services#audit"
        />
      </main>
      <Footer />
    </div>
  );
}