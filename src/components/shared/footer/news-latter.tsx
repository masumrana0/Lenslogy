import React from "react";
import { newsLatterContent } from "./content";
import { langProps } from "@/interface/common";

const NewsLatter: React.FC<langProps> = ({ lang = "en" }) => {
  const { title, description, placeholder, buttonText } =
    newsLatterContent[lang];

  return (
    <div>
      <h4 className="font-bold text-lg mb-4">{title}</h4>
      <p className="text-gray-400 mb-4">{description}</p>
      <form className="space-y-2">
        <input
          type="email"
          placeholder={placeholder}
          className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        <button
          type="submit"
          className="w-full p-2 bg-red-500 hover:bg-red-600 transition-colors text-white rounded font-medium"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default NewsLatter;
