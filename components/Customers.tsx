import React from "react";
import {
  SiShopify,
  SiWix,
  SiBigcommerce,
  SiMagento,
  SiWordpress,
  SiSquarespace,
  SiDotnet,
} from 'react-icons/si'

const platforms = [
  { name: "Shopify", Icon: SiShopify },
  { name: "Wix", Icon: SiWix },
  { name: "BigCommerce", Icon: SiBigcommerce },
  { name: "Magento", Icon: SiMagento },
  { name: "Wordpress", Icon: SiWordpress },
  { name: "Squarespace", Icon: SiSquarespace },
  { name: "ASP.NET", Icon: SiDotnet },
];

const Customers: React.FC = () => {
  return (
    <div className="w-full py-12 bg-black dark:bg-white">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-0 text-white dark:text-black text-center md:text-left md:w-1/3">
              We work with the platforms you use
            </h2>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 md:w-2/3">
              {platforms.map(({ name, Icon }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                  title={name}
                  aria-label={name}
                >
                  <Icon className="text-3xl md:text-4xl text-white dark:text-black" />
                  <span className="sr-only">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optional small caption under the row */}
        {/*<p className="mt-6 text-center text-sm text-white/70 dark:text-black/70">*/}
        {/*  Shopify · Wix · BigCommerce · Magento · Wordpress · Squarespace · ASP.NET*/}
        {/*</p>*/}
      </div>
    </div>
  );
};

export default Customers;