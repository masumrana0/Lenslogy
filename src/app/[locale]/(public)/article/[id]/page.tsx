"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  Eye,
} from "lucide-react";
import RelatedArticles from "../_components/related-articles";

// Translations
const translations = {
  en: {
    publishedOn: "Published on",
    readTime: "min read",
    share: "Share",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
    bookmark: "Bookmark",
    bookmarked: "Bookmarked",
    comments: "Comments",
    leaveComment: "Leave a comment",
    yourName: "Your name",
    yourEmail: "Your email",
    yourComment: "Your comment",
    submit: "Submit",
    relatedArticles: "Related Articles",
    views: "Views",
    likes: "Likes",
  },
  bn: {
    publishedOn: "প্রকাশিত হয়েছে",
    readTime: "মিনিট পড়া",
    share: "শেয়ার করুন",
    copyLink: "লিঙ্ক কপি করুন",
    linkCopied: "লিঙ্ক কপি করা হয়েছে!",
    bookmark: "বুকমার্ক করুন",
    bookmarked: "বুকমার্ক করা হয়েছে",
    comments: "মন্তব্য",
    leaveComment: "মন্তব্য করুন",
    yourName: "আপনার নাম",
    yourEmail: "আপনার ইমেইল",
    yourComment: "আপনার মন্তব্য",
    submit: "জমা দিন",
    relatedArticles: "সম্পর্কিত প্রবন্ধ",
    views: "ভিউ",
    likes: "লাইক",
  },
};

// Sample article data
const articles = [
  {
    id: "1",
    title: {
      en: "Meta's Quest 3 Headset: Review & Feature Breakdown",
      bn: "মেটার কোয়েস্ট ৩ হেডসেট: পর্যালোচনা এবং বৈশিষ্ট্য বিশ্লেষণ",
    },
    excerpt: {
      en: "A deep dive into Meta's latest VR technology with our comprehensive hands-on review.",
      bn: "আমাদের বিস্তৃত হ্যান্ডস-অন পর্যালোচনার সাথে মেটার সর্বশেষ ভিআর প্রযুক্তিতে একটি গভীর ডুব।",
    },
    content: {
      en: `<p>Meta's Quest 3 represents a significant leap forward in consumer virtual reality technology. As the successor to the popular Quest 2, this new headset brings several important improvements while maintaining a relatively affordable price point compared to competitors like Apple's Vision Pro.</p>
  
        <h2>Design and Comfort</h2>
        <p>The Quest 3 features a redesigned form factor that's approximately 40% thinner than its predecessor. At 515 grams, it's slightly lighter than the Quest 2, and the improved weight distribution makes it more comfortable for extended sessions. The head strap has been redesigned with better padding and adjustment mechanisms, though many users may still want to invest in the Elite Strap accessory for the most comfortable experience.</p>
        
        <p>Meta has also improved the facial interface with better padding and a more effective light-blocking design. The headset includes a physical IPD (interpupillary distance) adjustment mechanism that can be adjusted between 53mm and 75mm, accommodating a wide range of users.</p>
        
        <h2>Display and Optics</h2>
        <p>One of the most significant upgrades in the Quest 3 is its display system. The headset features new pancake lenses that offer better clarity and a wider sweet spot than the fresnel lenses used in previous models. The LCD panels provide a resolution of 2064 × 2208 per eye, resulting in approximately 25 pixels per degree. This represents a 30% increase in resolution compared to the Quest 2.</p>
        
        <p>The improved resolution is immediately noticeable, with sharper text and more detailed environments. The Quest 3 also offers a slightly wider field of view at approximately 110 degrees horizontal, reducing the "binocular" effect that has been a limitation of consumer VR headsets.</p>
        
        <h2>Performance</h2>
        <p>Powered by the Qualcomm Snapdragon XR2 Gen 2 processor, the Quest 3 delivers significantly improved performance over its predecessor. Meta claims it offers twice the GPU performance of the Quest 2, and our testing confirms substantial improvements in both graphical fidelity and overall responsiveness.</p>
        
        <p>Games and applications load faster, maintain higher frame rates, and can display more complex environments with better lighting and effects. The headset comes with either 128GB or 512GB of storage, with no option for expansion via microSD.</p>
        
        <h2>Mixed Reality Capabilities</h2>
        <p>Perhaps the most exciting new feature of the Quest 3 is its enhanced mixed reality capability. The headset includes color passthrough cameras that provide a much clearer view of your surroundings than the grayscale cameras on the Quest 2. This enables more compelling mixed reality experiences where virtual objects can be placed convincingly in your physical space.</p>
        
        <p>The system also includes improved room mapping technology that can quickly create a detailed model of your environment, allowing virtual objects to interact more naturally with your physical space. For example, virtual balls can bounce off your real furniture, or virtual characters can navigate around obstacles in your room.</p>
        
        <h2>Controllers and Hand Tracking</h2>
        <p>The Quest 3 ships with redesigned Touch Plus controllers that eliminate the tracking rings found on previous models. Instead, they use built-in cameras for self-tracking, resulting in a more compact and comfortable design. The haptic feedback has been improved, providing more nuanced vibration effects that enhance immersion.</p>
        
        <p>Hand tracking has also seen significant improvements, with faster response times and better accuracy. Many applications now support hand tracking as a primary input method, though the controllers still provide better precision for most gaming applications.</p>
        
        <h2>Battery Life</h2>
        <p>Battery life remains a limitation for the Quest 3, with approximately 2-3 hours of use on a single charge depending on the applications being used. This is comparable to the Quest 2 but still falls short of what many users would consider ideal for longer VR sessions. The headset charges via USB-C, and Meta sells an optional battery pack that can extend usage time.</p>
        
        <h2>Software Ecosystem</h2>
        <p>The Quest 3 runs on the same Meta Horizon OS as the Quest 2, providing access to the extensive library of VR applications available on the Meta Quest Store. All Quest 2 applications are compatible with the Quest 3, and many developers are releasing updates that take advantage of the new hardware's capabilities.</p>
        
        <p>Meta continues to invest heavily in exclusive content, with titles like Asgard's Wrath 2 showcasing what's possible on the new hardware. The company has also improved the social features of the platform, making it easier to connect with friends in virtual spaces.</p>
        
        <h2>Conclusion</h2>
        <p>The Meta Quest 3 represents a significant evolution of consumer VR technology. While it doesn't revolutionize the space, it offers meaningful improvements across the board that make VR more accessible, comfortable, and compelling. The enhanced mixed reality capabilities, in particular, point toward a future where VR headsets become more versatile tools for both work and entertainment.</p>
        
        <p>At $499 for the 128GB model and $649 for the 512GB version, the Quest 3 is more expensive than its predecessor but still offers excellent value compared to other headsets on the market. For newcomers to VR, it's an easy recommendation. For Quest 2 owners, the upgrade is more compelling than typical generational improvements, especially for those interested in mixed reality applications.</p>
        
        <p>The Quest 3 isn't perfect—battery life remains limited, and some users may still find it uncomfortable for extended sessions without additional accessories. However, it represents the most refined standalone VR experience currently available to consumers and sets a new standard for what we should expect from accessible virtual reality technology.</p>`,
      bn: `<p>মেটার কোয়েস্ট ৩ ভোক্তা ভার্চুয়াল রিয়েলিটি প্রযুক্তিতে একটি উল্লেখযোগ্য অগ্রগতি প্রতিনিধিত্ব করে। জনপ্রিয় কোয়েস্ট ২ এর উত্তরসূরি হিসাবে, এই নতুন হেডসেটটি অ্যাপলের ভিশন প্রো-এর মতো প্রতিযোগীদের তুলনায় তুলনামূলকভাবে সাশ্রয়ী মূল্য বজায় রেখে বেশ কয়েকটি গুরুত্বপূর্ণ উন্নতি নিয়ে এসেছে।</p>
  
        <h2>ডিজাইন এবং আরাম</h2>
        <p>কোয়েস্ট ৩ একটি পুনর্নির্মিত ফর্ম ফ্যাক্টর বৈশিষ্ট্যযুক্ত যা এর পূর্বসূরির তুলনায় প্রায় ৪০% পাতলা। ৫১৫ গ্রাম ওজনে, এটি কোয়েস্ট ২ এর তুলনায় সামান্য হালকা, এবং উন্নত ওজন বিতরণ এটিকে দীর্ঘায়িত সেশনের জন্য আরও আরামদায়ক করে তোলে। হেড স্ট্র্যাপটি আরও ভাল প্যাডিং এবং অ্যাডজাস্টমেন্ট মেকানিজম সহ পুনর্নির্মাণ করা হয়েছে, যদিও অনেক ব্যবহারকারী সবচেয়ে আরামদায়ক অভিজ্ঞতার জন্য এলিট স্ট্র্যাপ অ্যাক্সেসরিতে বিনিয়োগ করতে চাইতে পারেন।</p>
        
        <p>মেটা আরও ভাল প্যাডিং এবং আরও কার্যকর লাইট-ব্লকিং ডিজাইনের সাথে ফেসিয়াল ইন্টারফেসও উন্নত করেছে। হেডসেটে একটি শারীরিক আইপিডি (ইন্টারপিউপিলারি দূরত্ব) অ্যাডজাস্টমেন্ট মেকানিজম রয়েছে যা ৫৩ মিমি এবং ৭৫ মিমি এর মধ্যে সমন্বয় করা যেতে পারে, বিস্তৃত পরিসরের ব্যবহারকারীদের সুবিধা দেয়।</p>
        
        <h2>ডিসপ্লে এবং অপটিক্স</h2>
        <p>কোয়েস্ট ৩-এ সবচেয়ে উল্লেখযোগ্য আপগ্রেডগুলির মধ্যে একটি হল এর ডিসপ্লে সিস্টেম। হেডসেটটিতে নতুন প্যানকেক লেন্স রয়েছে যা আগের মডেলগুলিতে ব্যবহৃত ফ্রেসনেল লেন্সের তুলনায় আরও ভাল স্পষ্টতা এবং একটি প্রশস্ত সুইট স্পট অফার করে। এলসিডি প্যানেলগুলি প্রতি চোখে ২০৬৪ × ২২০৮ এর রেজোলিউশন প্রদান করে, যার ফলে প্রতি ডিগ্রিতে প্রায় ২৫ পিক্সেল হয়। এটি কোয়েস্ট ২ এর তুলনায় রেজোলিউশনে ৩০% বৃদ্ধি প্রতিনিধিত্ব করে।</p>
        
        <p>উন্নত রেজোলিউশন অবিলম্বে লক্ষণীয়, তীক্ষ্ণ পাঠ্য এবং আরও বিস্তারিত পরিবেশ সহ। কোয়েস্ট ৩ আনুমানিক ১১০ ডিগ্রি অনুভূমিকভাবে একটি সামান্য প্রশস্ত ক্ষেত্রের দৃষ্টিও অফার করে, "বাইনোকুলার" প্রভাব কমিয়ে দেয় যা ভোক্তা ভিআর হেডসেটের একটি সীমাবদ্ধতা হয়ে এসেছে।</p>
        
        <h2>পারফরম্যান্স</h2>
        <p>কোয়ালকম স্ন্যাপড্রাগন XR2 Gen 2 প্রসেসর দ্বারা চালিত, কোয়েস্ট ৩ এর পূর্বসূরির তুলনায় উল্লেখযোগ্যভাবে উন্নত পারফরম্যান্স দেয়। মেটা দাবি করে যে এটি কোয়েস্ট ২ এর দ্বিগুণ জিপিইউ পারফরম্যান্স অফার করে, এবং আমাদের পরীক্ষা গ্রাফিকাল ফিডেলিটি এবং সামগ্রিক প্রতিক্রিয়াশীলতা উভয় ক্ষেত্রেই উল্লেখযোগ্য উন্নতি নিশ্চিত করে।</p>
        
        <p>গেম এবং অ্যাপ্লিকেশনগুলি দ্রুত লোড হয়, উচ্চতর ফ্রেম রেট বজায় রাখে এবং আরও ভাল আলো এবং প্রভাব সহ আরও জটিল পরিবেশ প্রদর্শন করতে পারে। হেডসেটটি ১২৮জিবি বা ৫১২জিবি স্টোরেজ সহ আসে, মাইক্রোএসডি মাধ্যমে সম্প্রসারণের কোন বিকল্প নেই।</p>
        
        <h2>মিক্সড রিয়েলিটি ক্যাপাবিলিটি</h2>
        <p>কোয়েস্ট ৩ এর সবচেয়ে উত্তেজনাপূর্ণ নতুন বৈশিষ্ট্য হল এর উন্নত মিক্সড রিয়েলিটি ক্ষমতা। হেডসেটে কালার পাসথ্রু ক্যামেরা রয়েছে যা কোয়েস্ট ২-এর গ্রেস্কেল ক্যামেরার তুলনায় আপনার আশেপাশের অনেক স্পষ্ট দৃশ্য প্রদান করে। এটি আরও আকর্ষণীয় মিক্সড রিয়েলিটি অভিজ্ঞতা সক্ষম করে যেখানে ভার্চুয়াল অবজেক্টগুলি আপনার বাস্তব স্থানে বিশ্বাসযোগ্যভাবে রাখা যেতে পারে।</p>
        
        <p>সিস্টেমে উন্নত রুম ম্যাপিং প্রযুক্তিও অন্তর্ভুক্ত রয়েছে যা দ্রুত আপনার পরিবেশের একটি বিস্তারিত মডেল তৈরি করতে পারে, ভার্চুয়াল অবজেক্টগুলিকে আপনার বাস্তব স্থানের সাথে আরও স্বাভাবিকভাবে ইন্টারঅ্যাক্ট করতে দেয়। উদাহরণস্বরূপ, ভার্চুয়াল বলগুলি আপনার আসল আসবাবপত্রে বাউন্স করতে পারে, বা ভার্চুয়াল চরিত্রগুলি আপনার ঘরের বাধাগুলির চারপাশে নেভিগেট করতে পারে।</p>
        
        <h2>কন্ট্রোলার এবং হ্যান্ড ট্র্যাকিং</h2>
        <p>কোয়েস্ট ৩ পুনর্নির্মিত টাচ প্লাস কন্ট্রোলার সহ আসে যা আগের মডেলগুলিতে পাওয়া ট্র্যাকিং রিংগুলি দূর করে। পরিবর্তে, তারা সেলফ-ট্র্যাকিংয়ের জন্য বিল্ট-ইন ক্যামেরা ব্যবহার করে, যার ফলে আরও কম্প্যাক্ট এবং আরামদায়ক ডিজাইন হয়। হ্যাপটিক ফিডব্যাক উন্নত করা হয়েছে, আরও সূক্ষ্ম কম্পন প্রভাব প্রদান করে যা ইমার্শন বাড়ায়।</p>
        
        <p>হ্যান্ড ট্র্যাকিংও উল্লেখযোগ্য উন্নতি দেখেছে, দ্রুত প্রতিক্রিয়া সময় এবং আরও ভাল নির্ভুলতা সহ। অনেক অ্যাপ্লিকেশন এখন প্রাথমিক ইনপুট পদ্ধতি হিসাবে হ্যান্ড ট্র্যাকিং সমর্থন করে, যদিও কন্ট্রোলারগুলি এখনও বেশিরভাগ গেমিং অ্যাপ্লিকেশনের জন্য আরও ভাল নির্ভুলতা প্রদান করে।</p>
        
        <h2>ব্যাটারি লাইফ</h2>
        <p>ব্যাটারি লাইফ কোয়েস্ট ৩ এর জন্য একটি সীমাবদ্ধতা থেকে যায়, ব্যবহৃত অ্যাপ্লিকেশনের উপর নির্ভর করে একক চার্জে প্রায় ২-৩ ঘন্টা ব্যবহার করা যায়। এটি কোয়েস্ট ২ এর তুলনায় তুলনীয় কিন্তু এখনও অনেক ব্যবহারকারী দীর্ঘ ভিআর সেশনের জন্য আদর্শ বলে মনে করেন তার চেয়ে কম। হেডসেটটি ইউএসবি-সি মাধ্যমে চার্জ হয়, এবং মেটা একটি ঐচ্ছিক ব্যাটারি প্যাক বিক্রি করে যা ব্যবহারের সময় বাড়াতে পারে।</p>
        
        <h2>সফটওয়্যার ইকোসিস্টেম</h2>
        <p>কোয়েস্ট ৩ কোয়েস্ট ২ এর মতো একই মেটা হরাইজন ওএসে চলে, মেটা কোয়েস্ট স্টোরে উপলব্ধ ভিআর অ্যাপ্লিকেশনের বিস্তৃত লাইব্রেরিতে অ্যাক্সেস প্রদান করে। সমস্ত কোয়েস্ট ২ অ্যাপ্লিকেশন কোয়েস্ট ৩ এর সাথে সামঞ্জস্যপূর্ণ, এবং অনেক ডেভেলপার আপডেট রিলিজ করছে যা নতুন হার্ডওয়্যারের ক্ষমতাগুলির সুবিধা নেয়।</p>
        
        <h2>উপসংহার</h2>
        <p>মেটা কোয়েস্ট ৩ ভোক্তা ভিআর প্রযুক্তির একটি উল্লেখযোগ্য বিবর্তন প্রতিনিধিত্ব করে। যদিও এটি স্পেসকে বিপ্লব করে না, এটি বোর্ড জুড়ে অর্থপূর্ণ উন্নতি অফার করে যা ভিআরকে আরও অ্যাক্সেসযোগ্য, আরামদায়ক এবং আকর্ষণীয় করে তোলে। বিশেষ করে, উন্নত মিক্সড রিয়েলিটি ক্ষমতাগুলি এমন একটি ভবিষ্যতের দিকে ইঙ্গিত করে যেখানে ভিআর হেডসেটগুলি কাজ এবং বিনোদন উভয়ের জন্য আরও বহুমুখী টুল হয়ে ওঠে।</p>
        
        <p>১২৮জিবি মডেলের জন্য $৪৯৯ এবং ৫১২জিবি সংস্করণের জন্য $৬৪৯ এ, কোয়েস্ট ৩ এর পূর্বসূরির তুলনায় আরও ব্যয়বহুল কিন্তু বাজারে অন্যান্য হেডসেটের তুলনায় এখনও চমৎকার মূল্য অফার করে। ভিআরে নতুনদের জন্য, এটি একটি সহজ সুপারিশ। কোয়েস্ট ২ মালিকদের জন্য, আপগ্রেড টিপিক্যাল জেনারেশনাল ইমপ্রুভমেন্টের তুলনায় আরও আকর্ষণীয়, বিশেষ করে যারা মিক্সড রিয়েলিটি অ্যাপ্লিকেশনে আগ্রহী।</p>
        
        <p>কোয়েস্ট ৩ নিখুঁত নয় - ব্যাটারি লাইফ সীমিত থাকে, এবং কিছু ব্যবহারকারী অতিরিক্ত অ্যাক্সেসরি ছাড়া দীর্ঘায়িত সেশনের জন্য এটিকে এখনও অস্বস্তিকর মনে করতে পারেন। যাইহোক, এটি বর্তমানে ভোক্তাদের কাছে উপলব্ধ সবচেয়ে পরিশীলিত স্ট্যান্ডঅ্যালোন ভিআর অভিজ্ঞতা প্রতিনিধিত্ব করে এবং অ্যাক্সেসযোগ্য ভার্চুয়াল রিয়েলিটি প্রযুক্তি থেকে আমাদের কী আশা করা উচিত তার জন্য একটি নতুন মান নির্ধারণ করে।</p>`,
    },
    image:
      "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
    category: {
      en: "VR & AR",
      bn: "ভিআর এবং এআর",
    },
    author: {
      name: "Masum Rana",
      image: "https://media.licdn.com/dms/image/v2/D5603AQH5knHodXbHIA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1710602305413?e=1749686400&v=beta&t=kwIj3NX4v3lDa6qEIjXhsD9Y71v1hWnyEivNA2u1SmE",
      role: {
        en: "Senior Tech Editor",
        bn: "সিনিয়র টেক এডিটর",
      },
    },
    date: "June 15, 2023",
    readTime: 8,
    tags: ["VR", "Meta", "Quest 3", "Review"],
    views: 4582,
    likes: 328,
    comments: [
      {
        id: 1,
        author: "Sarah Chen",
        date: "June 16, 2023",
        content: {
          en: "Great review! I've been using the Quest 3 for about a month now and completely agree with your assessment of the mixed reality capabilities. The color passthrough is a game-changer compared to the Quest 2.",
          bn: "দারুণ পর্যালোচনা! আমি প্রায় এক মাস ধরে কোয়েস্ট ৩ ব্যবহার করছি এবং মিক্সড রিয়েলিটি ক্ষমতা সম্পর্কে আপনার মূল্যায়নের সাথে সম্পূর্ণরূপে একমত। কালার পাসথ্রু কোয়েস্ট ২ এর তুলনায় একটি গেম-চে ্ঞ্জার।",
        },
      },
      {
        id: 2,
        author: "Michael Torres",
        date: "June 17, 2023",
        content: {
          en: "I'm still on the fence about upgrading from my Quest 2. The improvements sound great, but I'm not sure if they justify the price for someone who only uses VR occasionally. How would you rate the upgrade necessity for casual users?",
          bn: "আমি এখনও আমার কোয়েস্ট ২ থেকে আপগ্রেড করা নিয়ে দ্বিধায় আছি। উন্নতিগুলি দারুণ শোনাচ্ছে, তবে আমি নিশ্চিত নই যে যারা মাঝে মাঝে ভিআর ব্যবহার করেন তাদের জন্য এগুলি মূল্য যুক্তিসঙ্গত করে কিনা। ক্যাজুয়াল ব্যবহারকারীদের জন্য আপনি আপগ্রেড প্রয়োজনীয়তা কীভাবে রেট করবেন?",
        },
      },
      {
        id: 3,
        author: "Emma Wilson",
        date: "June 18, 2023",
        content: {
          en: "Have you tested any productivity apps on the Quest 3? I'm interested in using it for virtual desktop work and wondering if the increased resolution makes text readable enough for extended use.",
          bn: "আপনি কি কোয়েস্ট ৩-এ কোনো প্রোডাক্টিভিটি অ্যাপ পরীক্ষা করেছেন? আমি ভার্চুয়াল ডেস্কটপ কাজের জন্য এটি ব্যবহার করতে আগ্রহী এবং ভাবছি বর্ধিত রেজোলিউশন দীর্ঘায়িত ব্যবহারের জন্য টেক্সট পড়ার যোগ্য করে তোলে কিনা।",
        },
      },
    ],
  },
];

// Sample related articles
const relatedArticles = [
  {
    id: "2",
    title: {
      en: "Apple's Vision Pro: How It Compares to Meta Quest 3",
      bn: "অ্যাপলের ভিশন প্রো: এটি কীভাবে মেটা কোয়েস্ট ৩ এর সাথে তুলনা করে",
    },
    excerpt: {
      en: "A detailed comparison of the two leading VR headsets on the market.",
      bn: "বাজারের দুটি শীর্ষস্থানীয় ভিআর হেডসেটের বিস্তারিত তুলনা।",
    },
    image: "/placeholder.svg?height=300&width=500",
    category: {
      en: "VR & AR",
      bn: "ভিআর এবং এআর",
    },
    date: "June 20, 2023",
    readTime: 6,
  },
  {
    id: "3",
    title: {
      en: "Best VR Games to Showcase Your New Quest 3",
      bn: "আপনার নতুন কোয়েস্ট ৩ প্রদর্শন করার জন্য সেরা ভিআর গেম",
    },
    excerpt: {
      en: "These titles take full advantage of the Quest 3's improved hardware.",
      bn: "এই টাইটেলগুলি কোয়েস্ট ৩-এর উন্নত হার্ডওয়্যারের সম্পূর্ণ সুবিধা নেয়।",
    },
    image: "/placeholder.svg?height=300&width=500",
    category: {
      en: "Gaming",
      bn: "গেমিং",
    },
    date: "June 18, 2023",
    readTime: 5,
  },
  {
    id: "4",
    title: {
      en: "The Future of Mixed Reality: Beyond Gaming",
      bn: "মিক্সড রিয়েলিটির ভবিষ্যৎ: গেমিং এর বাইরে",
    },
    excerpt: {
      en: "How mixed reality technology is transforming education, healthcare, and more.",
      bn: "কীভাবে মিক্সড রিয়েলিটি প্রযুক্তি শিক্ষা, স্বাস্থ্যসেবা এবং আরও অনেক কিছু পরিবর্তন করছে।",
    },
    image: "/placeholder.svg?height=300&width=500",
    category: {
      en: "Technology",
      bn: "প্রযুক্তি",
    },
    date: "June 14, 2023",
    readTime: 7,
  },
];

export default function ArticlePage() {
  const params = useParams();
  const { locale } = useParams();
  const language = locale === "en" || locale === "bn" ? locale : "en";
  //   const [language, setLanguage] = useState<"en" | "bn">("bn");
  const [linkCopied, setLinkCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Find the article based on the ID from the URL
  const article = articles.find((a) => a.id === params.id) || articles[0];

  // Function to get text based on current language
  const getText = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  // Function to get localized content from an object with language keys
  const getLocalizedContent = (content: { en: string; bn: string }) => {
    return content[language];
  };

  // Function to copy the current URL to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Function to toggle bookmark state
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Function to handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log({ name, email, comment });
    // Reset form
    setComment("");
    setName("");
    setEmail("");
    // Show success message or update comments list
    alert("Comment submitted successfully!");
  };

  // Effect to detect language changes from navbar
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener("languageChange" as any, handleLanguageChange);

    return () => {
      window.removeEventListener("languageChange" as any, handleLanguageChange);
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <article className="container mx-auto px-4 py-8">
          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-block bg-red-500 dark:bg-red-600 text-white text-sm px-3 py-1 rounded-sm">
                {getLocalizedContent(article.category)}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {getText("publishedOn")} {article.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 dark:text-white">
              {getLocalizedContent(article.title)}
            </h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {getLocalizedContent(article.excerpt)}
            </p>

            <div className="flex items-center justify-between border-b border-t border-gray-200 dark:border-gray-700 py-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={article.author.image || "/placeholder.svg"}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">
                    {article.author.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getLocalizedContent(article.author.role)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>
                    {article.readTime} {getText("readTime")}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span>
                    {article.views.toLocaleString()} {getText("views")}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <ThumbsUp size={16} className="mr-1" />
                  <span>
                    {article.likes.toLocaleString()} {getText("likes")}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured image */}
          <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={getLocalizedContent(article.title)}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article content */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-16 order-2 md:order-1">
              <div className="md:sticky md:top-24 flex md:flex-col items-center justify-center gap-4">
                <button
                  onClick={toggleBookmark}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                  title={getText(isBookmarked ? "bookmarked" : "bookmark")}
                >
                  {isBookmarked ? (
                    <BookmarkCheck
                      size={20}
                      className="text-red-500 dark:text-red-400"
                    />
                  ) : (
                    <Bookmark
                      size={20}
                      className="text-gray-600 dark:text-gray-300"
                    />
                  )}
                </button>

                <button
                  onClick={copyLink}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                  title={
                    linkCopied ? getText("linkCopied") : getText("copyLink")
                  }
                >
                  <Copy
                    size={20}
                    className={
                      linkCopied
                        ? "text-green-500"
                        : "text-gray-600 dark:text-gray-300"
                    }
                  />
                </button>

                <div className="relative group">
                  <button
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    title={getText("share")}
                  >
                    <Share2
                      size={20}
                      className="text-gray-600 dark:text-gray-300"
                    />
                  </button>

                  <div className="absolute left-full ml-2 top-0 hidden group-hover:flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-10">
                    <a
                      href="#"
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                    >
                      <Facebook
                        size={18}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </a>
                    <a
                      href="#"
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                    >
                      <Twitter
                        size={18}
                        className="text-blue-500 dark:text-blue-400"
                      />
                    </a>
                    <a
                      href="#"
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                    >
                      <Linkedin
                        size={18}
                        className="text-blue-700 dark:text-blue-400"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex-1 order-1 md:order-2">
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-red-500 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{
                  __html: getLocalizedContent(article.content),
                }}
              />

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Comments section */}
              <section className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  {getText("comments")} ({article.comments.length})
                </h2>

                <div className="space-y-6 mb-8">
                  {article.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium dark:text-white">
                          {comment.author}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {getLocalizedContent(comment.content)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Comment form */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">
                    {getText("leaveComment")}
                  </h3>

                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {getText("yourName")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {getText("yourEmail")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {getText("yourComment")}
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors"
                    >
                      {getText("submit")}
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </article>

        {/* Related articles */}
        <RelatedArticles
          articles={relatedArticles}
          language={language}
          title={getText("relatedArticles")}
        />
      </main>
    </>
  );
}
