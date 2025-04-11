import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">Wi</span>
              <span className="text-red-500">RE</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted source for technology news, reviews, and insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Rss size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mobiles"
                  className="text-gray-400 hover:text-white"
                >
                  Mobiles
                </Link>
              </li>
              <li>
                <Link
                  href="/gadgets"
                  className="text-gray-400 hover:text-white"
                >
                  Gadgets
                </Link>
              </li>
              <li>
                <Link
                  href="/hot-tech"
                  className="text-gray-400 hover:text-white"
                >
                  Hot Tech
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-400 hover:text-white"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/gaming" className="text-gray-400 hover:text-white">
                  Gaming
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-gray-400 hover:text-white">
                  AI & ML
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="text-gray-400 hover:text-white"
                >
                  Advertise
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest tech news and updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button
                type="submit"
                className="w-full p-2 bg-red-500 hover:bg-red-600 transition-colors text-white rounded font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} WiRE Technology Blog. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
