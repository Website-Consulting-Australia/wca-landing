// components/Section.tsx
import React from "react";

interface SectionProps {
  leftHalf: React.ReactNode;
  rightHalf: React.ReactNode;
  reverseOnMobile?: boolean; // when true: right shows before left on mobile
  className?: string;
}

const Section: React.FC<SectionProps> = ({
                                           leftHalf,
                                           rightHalf,
                                           reverseOnMobile = false,
                                           className = "",
                                         }) => {
  // If reverseOnMobile: right = order-1, left = order-2 on mobile
  // From md+ we restore the natural order (left first, right second)
  const leftClasses = reverseOnMobile
    ? "order-2 md:order-1"
    : "order-1 md:order-1";
  const rightClasses = reverseOnMobile
    ? "order-1 md:order-2"
    : "order-2 md:order-2";

  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className={leftClasses}>{leftHalf}</div>
        <div className={rightClasses}>{rightHalf}</div>
      </div>
    </section>
  );
};

export default Section;