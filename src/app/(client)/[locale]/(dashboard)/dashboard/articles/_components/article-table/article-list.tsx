"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Article } from "@prisma/client";
import type React from "react";

import { useState, type SetStateAction } from "react";

import Modal from "@/components/ui/modal";
import { useDeleteArticleMutation } from "@/redux/api/article.api";
import GadgetListSkeleton from "../../../gadget/_components/skeletons/gadget-list-skeleton";
import { articleBooleanFilterKeys } from "../../_utils/utils";
import ArticleCard from "./article-card";
import ArticleTableRow from "./article-table-row";
import EmptyDataList from "../../../_components/shared/empty-data-list";

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  lang: "en" | "bn";
  setIsEditOpen: React.Dispatch<
    SetStateAction<{ state: boolean; article: Article | null }>
  >;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  setIsEditOpen,
  lang,
}) => {
  const [showLangAlert, setShowLangAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

  const handleEdit = (article: Article) => {
    if (lang === "en" && article) {
      setIsEditOpen({ state: true, article: article });
    } else {
      setShowLangAlert(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (idToDelete) {
      await deleteArticle(idToDelete);
      setShowDeleteAlert(false);
      setIdToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setShowDeleteAlert(true);
  };

  const skeletonComponents = GadgetListSkeleton({ count: 5 });

  const renderDesktopView = () => (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-[40%] font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Created At</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <skeletonComponents.Desktop />
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <ArticleTableRow
                key={article.id}
                article={article}
                lang={lang}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                articleBooleanFilterKeys={articleBooleanFilterKeys}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="p-0">
                <EmptyDataList name="article" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const renderMobileView = () => (
    <div className="md:hidden p-4">
      {isLoading ? (
        <skeletonComponents.Mobile />
      ) : articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              lang={lang}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              articleBooleanFields={articleBooleanFilterKeys}
            />
          ))}
        </div>
      ) : (
        <EmptyDataList name="article" />
      )}
    </div>
  );

  return (
    <div className="rounded-lg md:border md:bg-card">
      {renderDesktopView()}
      {renderMobileView()}

      {/* Modals */}
      <Modal
        content="Article editing is only supported in English. Please switch the language to English to continue editing."
        setShowModal={setShowLangAlert}
        showModal={showLangAlert}
        title="Language Restriction"
      />
      <Modal
        content="Are you sure you want to delete this Article? This action cannot be undone."
        setShowModal={setShowDeleteAlert}
        showModal={showDeleteAlert}
        title="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        showCancel
      />
    </div>
  );
};

export default ArticleList;
