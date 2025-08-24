import Link from "next/link";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import CalendlyInline from "components/CalendyInline";

const Download: React.FC = () => (
  <section className="container mx-auto py-24 px-4 md:px-6">
    <div className="flex flex-col md:flex-row items-start gap-8">
      {/* Left: Inline calendar */}
      <div className="w-full md:w-1/2 order-1">
        <CalendlyInline url="https://calendly.com/salvador-cardenas-cruz-websiteconsultingaustralia/30min" />
      </div>

      {/* Right: Copy + CTAs */}
      <div className="w-full md:w-1/2 order-2 flex justify-center md:justify-end">
        <div className="flex flex-col justify-center text-center md:text-left max-w-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
            Book Your Free Website Audit
          </h2>
          <p className="text-xl text-gray-800 dark:text-gray-300 mb-6 font-light">
            We’ll review speed, SEO, and UX—then give you a prioritised action plan to improve results fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/services#audit"
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md text-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              <FaArrowRight />
              See What’s Included
            </Link>
            <Link
              href="mailto:hello@websiteconsulting.com.au"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-md text-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaEnvelope />
              Prefer Email?
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Download;