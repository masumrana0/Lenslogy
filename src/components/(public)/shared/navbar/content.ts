import { INavItem } from "./interface";

const navMenu: INavItem[] = [
  {
    type: "link",
    label: {
      en: "Mobiles",
      bn: "মোবাইল",
    },
    href: "/mobiles",
  },
  {
    type: "dropdown",
    label: {
      en: "Gadgets",
      bn: "গ্যাজেট",
    },
    sections: [
      {
        title: {
          en: "UPCOMING GADGETS",
          bn: "আসন্ন গ্যাজেট",
        },
        items: [
          {
            id: 1,
            title: {
              en: "Apple's VR Headset Coming This Fall",
              bn: "অ্যাপলের ভিআর হেডসেট এই শরতে আসছে",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "VR",
              bn: "ভিআর",
            },
            createdAt: "June 15, 2023",
          },
          {
            id: 2,
            title: {
              en: "New Samsung Foldable Concepts Revealed",
              bn: "নতুন স্যামসাং ফোল্ডেবল কনসেপ্ট প্রকাশিত",
            },
            image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Mobile",
              bn: "মোবাইল",
            },
            createdAt: "June 12, 2023",
          },
          {
            id: 3,
            title: {
              en: "Google's Next-Gen Smart Home Hub",
              bn: "গুগলের পরবর্তী প্রজন্মের স্মার্ট হোম হাব",
            },
            image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Smart Home",
              bn: "স্মার্ট হোম",
            },
            createdAt: "June 10, 2023",
          },
        ],
      },
      {
        title: {
          en: "LATEST GADGETS",
          bn: "সর্বশেষ গ্যাজেট",
        },
        items: [
          {
            id: 4,
            title: {
              en: "Sony's New Wireless Earbuds Review",
              bn: "সনির নতুন ওয়্যারলেস ইয়ারবাডস পর্যালোচনা",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Audio",
              bn: "অডিও",
            },
            createdAt: "June 8, 2023",
          },
          {
            id: 5,
            title: {
              en: "New Mechanical Keyboard from Logitech",
              bn: "লজিটেক থেকে নতুন মেকানিক্যাল কীবোর্ড",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Peripherals",
              bn: "পেরিফেরালস",
            },
            createdAt: "June 5, 2023",
          },
          {
            id: 6,
            title: {
              en: "Apple Watch Series 8 Review",
              bn: "অ্যাপল ওয়াচ সিরিজ ৮ পর্যালোচনা",
            },
            image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Wearables",
              bn: "পরিধানযোগ্য",
            },
            createdAt: "June 3, 2023",
          },
        ],
      },
    ],
  },
  {
    type: "dropdown",
    label: {
      en: "Hot Tech",
      bn: "হট টেক",
    },
    sections: [
      {
        title: {
          en: "AI & MACHINE LEARNING",
          bn: "এআই এবং মেশিন লার্নিং",
        },
        items: [
          {
            id: 7,
            title: {
              en: "GPT-5 Release createdAt Announced",
              bn: "জিপিটি-৫ রিলিজ তারিখ ঘোষণা করা হয়েছে",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "AI",
              bn: "এআই",
            },
            createdAt: "June 14, 2023",
          },
          {
            id: 8,
            title: {
              en: "Microsoft's New AI Tools for Developers",
              bn: "ডেভেলপারদের জন্য মাইক্রোসফটের নতুন এআই টুলস",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Dev Tools",
              bn: "ডেভ টুলস",
            },
            createdAt: "June 11, 2023",
          },
          {
            id: 9,
            title: {
              en: "AI Image Generation: Latest Models Compared",
              bn: "এআই ইমেজ জেনারেশন: সর্বশেষ মডেল তুলনা",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "AI",
              bn: "এআই",
            },
            createdAt: "June 9, 2023",
          },
        ],
      },
      {
        title: {
          en: "EMERGING TECHNOLOGIES",
          bn: "উদীয়মান প্রযুক্তি",
        },
        items: [
          {
            id: 10,
            title: {
              en: "Quantum Computing Breakthrough by IBM",
              bn: "আইবিএম দ্বারা কোয়ান্টাম কম্পিউটিং ব্রেকথ্রু",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Computing",
              bn: "কম্পিউটিং",
            },
            createdAt: "June 7, 2023",
          },
          {
            id: 11,
            title: {
              en: "Neuromorphic Chips: The Future of Computing",
              bn: "নিউরোমরফিক চিপস: কম্পিউটিং এর ভবিষ্যৎ",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Hardware",
              bn: "হার্ডওয়্যার",
            },
            createdAt: "June 4, 2023",
          },
          {
            id: 12,
            title: {
              en: "6G Technology Development Started",
              bn: "৬জি প্রযুক্তি উন্নয়ন শুরু হয়েছে",
            },
             image:
              "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2024/10/product-search.jpg",
            category: {
              en: "Networking",
              bn: "নেটওয়ার্কিং",
            },
            createdAt: "June 2, 2023",
          },
        ],
      },
    ],
  },
  {
    type: "link",
    label: {
      en: "Contact Us",
      bn: "যোগাযোগ করুন",
    },
    href: "/contact",
  },
];

export default navMenu;
