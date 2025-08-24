import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center my-32 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
      <h1 className="font-sans text-3xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl dark:text-white mb-6">
        Website Consulting Australia
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 font-light max-w-2xl mx-auto">
        Helping Australian businesses build faster, higher-converting websites
        through expert consulting in performance, SEO, and user experience.
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          href="/contact"
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          Book a Consultation
        </Link>
        <Link
          href="/services"
          className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          Our Services
        </Link>
      </div>
    </section>
  );
}