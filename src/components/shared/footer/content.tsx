import { Facebook, Twitter, Instagram, Youtube, Rss } from "lucide-react";
export const footerContent = {
  en: {
    description:
      "Your trusted source for technology news, reviews, and insights.",
    categories: [
      { label: "Mobiles", href: "/mobiles" },
      { label: "Gadgets", href: "/gadgets" },
      { label: "Hot Tech", href: "/hot-tech" },
      { label: "Reviews", href: "/reviews" },
      { label: "Gaming", href: "/gaming" },
      { label: "AI & ML", href: "/ai" },
    ],
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Advertise", href: "/advertise" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  bn: {
    description: "প্রযুক্তি সংবাদ, রিভিউ এবং বিশ্লেষণের নির্ভরযোগ্য উৎস।",
    categories: [
      { label: "মোবাইল", href: "/mobiles" },
      { label: "গ্যাজেট", href: "/gadgets" },
      { label: "হট টেক", href: "/hot-tech" },
      { label: "রিভিউ", href: "/reviews" },
      { label: "গেমিং", href: "/gaming" },
      { label: "এআই ও এমএল", href: "/ai" },
    ],
    links: [
      { label: "আমাদের সম্পর্কে", href: "/about" },
      { label: "যোগাযোগ করুন", href: "/contact" },
      { label: "বিজ্ঞাপন দিন", href: "/advertise" },
      { label: "গোপনীয়তা নীতি", href: "/privacy" },
      { label: "সেবা শর্তাবলি", href: "/terms" },
    ],
  },
};

export const newsLatterContent = {
  en: {
    title: "Newsletter",
    description:
      "Subscribe to our newsletter for the latest tech news and updates.",
    placeholder: "Your email address",
    buttonText: "Subscribe",
  },
  bn: {
    title: "নিউজলেটার",
    description:
      "সর্বশেষ প্রযুক্তি খবর এবং আপডেট পেতে আমাদের নিউজলেটার সাবস্ক্রাইব করুন।",
    placeholder: "আপনার ইমেইল ঠিকানা",
    buttonText: "সাবস্ক্রাইব করুন",
  },
};

export const socialIcons = [
  { icon: <Facebook size={20} />, href: "#" },
  { icon: <Twitter size={20} />, href: "#" },
  { icon: <Instagram size={20} />, href: "#" },
  { icon: <Youtube size={20} />, href: "#" },
  { icon: <Rss size={20} />, href: "#" },
];
