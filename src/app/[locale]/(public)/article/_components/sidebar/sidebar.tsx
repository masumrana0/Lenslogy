"use client";
import CopyLink from "./copy-link";
import ShareArticle from "./share-article";

const ArticleSideBar = () => {
  return (
    <div className="md:w-16 order-2 md:order-1">
      <div className="md:sticky md:top-24 flex md:flex-col items-center justify-center gap-4">
        <CopyLink />

        {/* share article */}
        <ShareArticle />
      </div>
    </div>
  );
};

export default ArticleSideBar;
