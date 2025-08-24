import Review from "./Review";

interface ReviewData {
  rating: number;
  title: string;
  content: string;
  author: string;
  designation: string;
}

interface ReviewsProps {
  reviews?: ReviewData[];
}

// Placeholder reviews — swap these out once real testimonials come in
const defaultReviews: ReviewData[] = [
  {
    rating: 5,
    title: "Improved site speed dramatically",
    content:
      "Our load times dropped from 5 seconds to under 2 seconds after their audit and fixes. The difference in conversions was immediate.",
    author: "Sarah L.",
    designation: "Ecommerce Manager",
  },
  {
    rating: 5,
    title: "SEO guidance that actually works",
    content:
      "We’d been stuck on page 3 for months. Within 8 weeks of following their SEO roadmap, we hit page 1 for our main keywords.",
    author: "James K.",
    designation: "Founder, SaaS Startup",
  },
  {
    rating: 5,
    title: "User experience overhaul",
    content:
      "Their UX recommendations made our onboarding flow 10x smoother. Support tickets dropped noticeably after the changes.",
    author: "Elena R.",
    designation: "Product Lead",
  },
  {
    rating: 4,
    title: "Actionable and transparent",
    content:
      "We appreciated how clear the reporting was. No fluff, just a prioritized list of what to do and the results we should expect.",
    author: "Michael T.",
    designation: "Marketing Director",
  },
];

const Reviews: React.FC<ReviewsProps> = ({ reviews = defaultReviews }) => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 text-gray-900 dark:text-white">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;