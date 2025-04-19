import Link from "next/link";
import NewsLatter from "./news-latter";
import Logo from "../navbar/logo";
import { footerContent, socialIcons } from "./content";
import { langProps } from "@/interface/common";

const Footer = ({ lang = "bn" }: langProps) => {
  const { description, categories, links } = footerContent[lang];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description + Social Icons */}
          <div>
            <Logo />
            <p className="text-gray-400 mb-4">{description}</p>
            <div className="flex space-x-4">
              {socialIcons.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-gray-400 hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">
              {lang === "bn" ? "বিভাগসমূহ" : "Categories"}
            </h4>
            <ul className="space-y-2">
              {categories.map(({ label, href }, idx) => (
                <li key={idx}>
                  <Link href={href} className="text-gray-400 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">
              {lang === "bn" ? "দ্রুত লিংক" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              {links.map(({ label, href }, idx) => (
                <li key={idx}>
                  <Link href={href} className="text-gray-400 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <NewsLatter lang={lang} />
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} WiRE Technology Blog.{" "}
            {lang === "bn" ? "সকল অধিকার সংরক্ষিত।" : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
