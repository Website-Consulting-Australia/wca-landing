import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="bg-white dark:bg-black shadow-sm dark:border-b dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Logo + Name */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo-no-capt.png" // logo in /public
            alt="Website Consulting Australia Logo"
            width={200}
            height={200}
            className="max-h-10 w-auto"
          />
          <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Website Consulting Australia
          </span>
        </Link>

        {/* Right: Nav */}
        <nav className="flex items-center">
          <ul className="flex space-x-2 mr-2">
            <li>
              <Link
                href="/services"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-semibold bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Book a Consultation
              </Link>
            </li>
          </ul>
          {/*<ThemeSwitch />*/}
        </nav>
      </div>
    </header>
  );
}