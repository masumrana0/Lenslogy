"use client";
import { Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n/i18n.client";

const ShareArticle = () => {
  const { t } = useTranslation();
  

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  // Handle native share if available
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        url: shareUrl,
      });
    }
  };

  return (
    <div className="relative">
      <button
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        title={t("articleDetailsPage.share")}
        onClick={handleNativeShare}
      >
        <Share2 size={20} className="text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default ShareArticle;
