"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
  content: React.ReactNode; // <- was string
  isOpen: boolean;
  toggleOpen: () => void;
}

interface AccordionProps {
  items?: { title: string; content: React.ReactNode }[]; // <- was string
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, toggleOpen }) => {
  const panelId = `acc-panel-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const buttonId = `acc-button-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="mb-4">
      <div className="w-full rounded-lg overflow-hidden bg-black dark:bg-gray-900">
        <button
          id={buttonId}
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="w-full text-left p-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={toggleOpen}
        >
          <span className="text-xl font-semibold text-white">{title}</span>
          <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
            <FaChevronDown className="text-2xl text-white" />
          </span>
        </button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}
        >
          <div className="p-4">
            <div className="text-white font-light">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  {
    title: "What do you review in a free website audit?",
    content:
      "We assess speed (Core Web Vitals), technical SEO (indexing, sitemaps, metadata), and UX friction points that impact conversions. You’ll get a prioritised action plan.",
  },
  {
    title: "How quickly can we see results?",
    content:
      "Performance wins can land in days (e.g., image optimisation, caching). SEO impact compounds over weeks. We focus on high-impact fixes first and show clear before/after metrics.",
  },
  {
    title: "Can you work with our existing dev/agency?",
    content:
      "Absolutely. We provide a clear backlog with acceptance criteria, and can collaborate in your PM tool and Git workflow. We’re comfortable advising or implementing—your choice.",
  },
  {
    title: "What are your engagement options?",
    content:
      "Two common paths: (1) Advisory retainer with weekly check-ins and roadmap, or (2) Hands-on sprints to ship performance, SEO, and UX fixes. We can mix both as needed.",
  },
  {
    title: "How do you measure success?",
    content:
      "We track Core Web Vitals (LCP, CLS, INP), organic visibility, and conversion rate. Every recommendation ties to one of those outcomes—no vanity metrics.",
  },
  {
    title: "Do you support ecommerce, SaaS, and lead gen?",
    content:
      "Yes. We’ve worked across all three. We tailor the roadmap to your stack and goals, whether that’s faster PDPs/checkout, better trial signup flows, or more qualified leads.",
  },
];

const Accordion: React.FC<AccordionProps> = ({ items = faqItems }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full sm:w-[90%]">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          toggleOpen={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
