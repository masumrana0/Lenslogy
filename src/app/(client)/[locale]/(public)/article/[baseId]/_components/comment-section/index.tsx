"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n/i18n.client";
import Comment from "./comment";
import SubmitComment from "./submit-comment";

export interface IComment {
  id: number;
  articleId: string;
  author: string;
  createdAt: string;
  content: string;
}

// dummy comment data
const dummyComments: IComment[] = [
  {
    id: 1,
    articleId: "someArticleId1", // Added articleId
    author: "Sarah Chen",
    createdAt: "June 16, 2023",
    content:
      "দারুণ পর্যালোচনা! আমি প্রায় এক মাস ধরে কোয়েস্ট ৩ ব্যবহার করছি এবং মিক্সড রিয়েলিটি ক্ষমতা সম্পর্কে আপনার মূল্যায়নের সাথে সম্পূর্ণরূপে একমত। কালার পাসথ্রু কোয়েস্ট ২ এর তুলনায় একটি গেম-চেঞ্জার。", // Assuming you want the Bengali version
  },
  {
    id: 2,
    articleId: "someArticleId2", // Added articleId
    author: "Michael Torres",
    createdAt: "June 17, 2023",
    content:
      "I'm still on the fence about upgrading from my Quest 2. The improvements sound great, but I'm not sure if they justify the price for someone who only uses VR occasionally. How would you rate the upgrade necessity for casual users?", // Assuming you pick the English version
  },
  {
    id: 3,
    articleId: "someArticleId3", // Added articleId
    author: "Emma Wilson",
    createdAt: "June 18, 2023",
    content:
      "Have you tested any productivity apps on the Quest 3? I'm interested in using it for virtual desktop work and wondering if the increased resolution makes text readable enough for extended use.", // Assuming you pick the English version
  },
];

const ArticleCommentSection: React.FC<{
  articleId: string;
}> = ({ articleId }) => {
  const { t } = useTranslation();
  const comments = dummyComments;

  return (
    <section className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {t("articleDetailsPage.comments")}
      </h2>

      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Comment form */}
      <SubmitComment articleId={articleId} />
    </section>
  );
};

export default ArticleCommentSection;
