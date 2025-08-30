import {
  AiOutlineFacebook,
  AiOutlineX,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 dark:bg-black shadow-sm text-gray-500 dark:text-gray-400 py-8 dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm space-y-4 sm:space-y-0">
        {/* Left side: business name + tagline */}
        <div className="text-center sm:text-left">
          <p>&copy; {currentYear} Website Consulting Australia. All rights reserved.</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Helping Australian businesses grow online through performance, SEO & UX.
          </p>
        </div>

        {/* Center: nav links */}
        <div className="flex flex-wrap justify-center space-x-6 text-gray-600 dark:text-gray-400">
          <a href="/" className="hover:text-black dark:hover:text-white transition-colors">
            Home
          </a>
          <a href="/services" className="hover:text-black dark:hover:text-white transition-colors">
            Services
          </a>
          <a href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
            Contact
          </a>
          <a href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
            Privacy
          </a>
        </div>

        {/* Right side: social icons */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/61579425987899"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-600"
          >
            <AiOutlineFacebook className="w-5 h-5" />
          </a>
          {/*<a*/}
          {/*  href="https://linkedin.com/company/yourpage"*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*  aria-label="LinkedIn"*/}
          {/*  className="hover:text-blue-500"*/}
          {/*>*/}
          {/*  <AiOutlineLinkedin className="w-5 h-5" />*/}
          {/*</a>*/}
          <a
            href="https://www.instagram.com/websiteconsultingaustralia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500"
          >
            <AiOutlineInstagram className="w-5 h-5" />
          </a>
          {/*<a*/}
          {/*  href="https://twitter.com/yourpage"*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*  aria-label="X (Twitter)"*/}
          {/*  className="hover:text-black dark:hover:text-white"*/}
          {/*>*/}
          {/*  <AiOutlineX className="w-5 h-5" />*/}
          {/*</a>*/}
          <a
            href="https://github.com/Website-Consulting-Australia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-700 dark:hover:text-gray-200"
          >
            <AiOutlineGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;