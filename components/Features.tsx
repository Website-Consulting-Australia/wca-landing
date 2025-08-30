import React from "react";
import FeatureCard from "./FeatureCard";
import { FaSearch, FaRocket, FaUserFriends } from "react-icons/fa";
import { MdSpeed, MdDesignServices } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";

const Features = () => {
  const features = [
    {
      icon: FaSearch,
      title: "SEO Optimisation",
      tagline: "Get Found Online",
      description: "Improve rankings and visibility so customers find you faster.",
    },
    {
      icon: MdSpeed,
      title: "Performance Audits",
      tagline: "Faster Load Times",
      description: "Cut load times and boost Core Web Vitals for better UX and conversions.",
    },
    {
      icon: MdDesignServices,
      title: "UX & Design Strategy",
      tagline: "Delight Users",
      description: "Refine layouts and flows for a seamless customer experience.",
    },
    {
      icon: AiOutlineLineChart,
      title: "Conversion Growth",
      tagline: "Turn Visits Into Sales",
      description: "Turn more visitors into paying customers with proven strategies.",
    },
    {
      icon: FaUserFriends,
      title: "Consulting & Training",
      tagline: "Upskill Your Team",
      description: "Hands-on guidance for your team to maintain best practices.",
    },
    {
      icon: FaRocket,
      title: "Scalable Solutions",
      tagline: "Grow With Confidence",
      description: "Future-proof your site with strategies that grow with your business.",
    },
  ];

  return (
    <section id="services" className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
            How We Help Your Business Grow
          </h2>
          <p className="mt-8 text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto">
            Website Consulting Australia partners with you to improve
            <span className="font-semibold"> SEO</span>,
            <span className="font-semibold"> performance</span>, and
            <span className="font-semibold"> user experience</span> — all with one goal:
            turning your website into a <span className="font-semibold">growth engine</span>.
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;