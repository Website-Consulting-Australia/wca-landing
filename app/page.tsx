import Header from "components/Header";
import Hero from "components/Hero";
import Features from "components/Features";
import Section from "components/Section";
import Footer from "components/Footer";
import Customers from "components/Customers";
import Image from "next/image";
import Accordion from "components/Accordion";
import Reviews from "components/Reviews";
import Download from "components/Download";
import { tree } from 'next/dist/build/templates/app-page' // we'll repurpose this as a CTA

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Header />
      <main>
        <Hero />
        <Features />

        <Section
          reverseOnMobile={false}
          leftHalf={
            <>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                Faster sites. <span className="text-brand-blue font-semibold">Better rankings.</span> More conversions.
              </h2>
              <p className="text-xl font-light text-gray-700 dark:text-gray-300">
                We analyse your site’s <span className="font-semibold">speed</span>, <span className="font-semibold">technical SEO</span>, and <span  className="font-semibold">user
                flows </span>
                to remove bottlenecks that cost you traffic and sales. Expect tangible lifts in
                <span className="font-semibold"> Core Web Vitals</span>, <span className="font-semibold">search visibility</span>, and <span className="font-semibold">on-page
                conversion</span>.
              </p>
              <ul className="mt-6 space-y-3 text-left text-gray-700 dark:text-gray-300 font-light">
                <li>
                  <span>✔</span>{' '}
                  <span className="font-semibold">Core Web Vitals improvements</span> (LCP, CLS, INP)
                </li>
                <li>
                  <span>✔</span>{' '}
                  <span className="font-semibold">Technical SEO clean-up</span> (indexing, sitemaps, metadata)
                </li>
                <li>
                  <span>✔</span>{' '}
                  <span className="font-semibold">UX fixes</span> that reduce friction and abandonment
                </li>
              </ul>
            </>
          }
          rightHalf={
            <Image
              src="/performance-image-v2.png"
              alt="Performance & SEO improvements"
              width={640}
              height={480}
              className="w-full h-auto rounded-lg shadow"
            />
          }
        />

        {/* Social proof / logos */}
        <Customers/>

        {/* Section 2: FAQs + “Why us” summary */}
        <Section
          reverseOnMobile={true}
          leftHalf={<Accordion /* FAQ items here */ />}
          rightHalf={
            <div className="flex flex-col justify-end">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                Why <span className="text-brand-blue font-semibold">Website Consulting Australia?</span>
              </h2>
              <p className="text-xl font-light text-gray-700 dark:text-gray-300">
                Senior-level guidance without the agency bloat. <br/>
                We prioritise <span className="font-semibold">high-impact fixes</span> first,
                keep you informed with plain-English updates,
                and measure everything against <span className="font-semibold">business results</span> —
                not vanity metrics.
              </p>
              <div
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-700 dark:text-gray-300 font-light">
                <div>
                  <span>✔</span>{" "}
                  <span className="font-semibold">Actionable roadmaps</span>, not audits that collect
                  dust
                </div>
                <div>
                  <span>✔</span>{" "}
                  <span className="font-semibold">Transparent comms</span> and weekly progress updates
                </div>
                <div>
                  <span>✔</span>{" "}
                  <span className="font-semibold">Flexible engagement</span>: advisory or hands-on
                  execution
                </div>
                <div>
                  <span>✔</span>{" "}
                  <span className="font-semibold">Experience</span> across ecommerce, SaaS, and lead
                  gen
                </div>
              </div>
            </div>
          }
        />

        {/* Testimonials */}
        <Reviews/>

        {/* Repurpose Download -> Primary CTA */}
        <Download/>
      </main>
      <Footer/>
    </div>
  );
}