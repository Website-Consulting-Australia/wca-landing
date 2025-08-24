import React from "react";

const FeatureCard = ({ icon: Icon, title, tagline, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
      <div className="flex justify-center mb-4 text-4xl text-blue-600 dark:text-blue-400">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      {tagline && (
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 font-medium tracking-wide uppercase">
          {tagline}
        </p>
      )}
      <p className="mt-3 text-gray-600 dark:text-gray-300 text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;