"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimestampWithTranslation } from "@/lib/translator";
import type { Article, Language } from "@prisma/client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { articleBooleanFieldsForUI } from "../utils";
import ArticleFormWrapper from "../../new/_components/article-form/form-wrapper";

interface ArticlesListProps {
  articles: any[];
  isLoading: boolean;
  lang: Language;
  onDeleteClick: (id: string) => void;
}

const ArticlesList = ({
  articles,
  isLoading,
  lang,
  onDeleteClick,
}: ArticlesListProps) => {
  const [isEditOpen, setIsEditOpen] = useState<{
    state: boolean;
    article: Article | null;
  }>({ state: false, article: null });
  const [showLangAlert, setShowLangAlert] = useState(false);
  const handleEdit = (article: Article) => {
    if (lang === "en" && article) {
      setIsEditOpen({ state: true, article });
    } else {
      setShowLangAlert(true);
    }
  };

  return (
    <div className="rounded-md border">
      {isEditOpen.state ? (
        <ArticleFormWrapper
          article={isEditOpen.article as any}
          setIsEditOpen={setIsEditOpen}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell
                    colSpan={5}
                    className="h-12 animate-pulse bg-muted/20"
                  ></TableCell>
                </TableRow>
              ))
            ) : articles.length > 0 ? (
              articles.map((article: any) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/article/${article.baseId}`}
                      className="hover:underline"
                    >
                      {article.title.length > 50
                        ? `${article.title.slice(0, 50)}...`
                        : article.title}
                    </Link>
                  </TableCell>
                  <TableCell>{article?.category?.name || "N/A"}</TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    {articleBooleanFieldsForUI.map(({ name }) => {
                      const value = article[name];

                      if (name === "isPublished") {
                        return (
                          <Badge
                            key={name}
                            variant={value ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {value ? "Published" : "Draft"}
                          </Badge>
                        );
                      }

                      if (value) {
                        return (
                          <Badge
                            key={name}
                            variant="default"
                            className="capitalize"
                          >
                            {name}
                          </Badge>
                        );
                      }

                      return null;
                    })}
                  </TableCell>

                  <TableCell>
                    {formatTimestampWithTranslation(article.createdAt, lang)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(article)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteClick(article.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No articles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={showLangAlert} onOpenChange={setShowLangAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Language Restriction</AlertDialogTitle>
            <AlertDialogDescription>
              Article editing is only supported in English. Please switch the
              language to English to continue editing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowLangAlert(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticlesList;
