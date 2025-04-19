"use client";
import React, { useState } from "react";
import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n/i18n.client";

const CopyLink = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const { t } = useTranslation();

  // Handle Copy link
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1000);
  };

  return (
    <button
      onClick={copyLink}
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 ease-in-out"
      title={
        linkCopied
          ? t("articleDetailsPage.linkCopied")
          : t("articleDetailsPage.copyLink")
      }
    >
      <Copy
        size={20}
        className={`transition-colors duration-200 ${
          linkCopied ? "text-green-500" : "text-gray-600 dark:text-gray-300"
        }`}
      />
    </button>
  );
};

export default CopyLink;
