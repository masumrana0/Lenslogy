"use client";

import Link from "next/link";
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
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { formatTimestampWithTranslation } from "@/lib/translator";
import type { Article, Language } from "@prisma/client";
import { useState } from "react";
import { boolean } from "zod";
import ArticleForm from "../article-form/article-form";

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
  return (
    <div className="rounded-md border">
      {isEditOpen.state ? (
        <ArticleForm
          article={isEditOpen.article as Article}
          onSuccess={(updatedArticle) => {
            setIsEditOpen({ state: false, article: null });
          }}
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
                      href={`/article/${article.id}`}
                      className="hover:underline"
                    >
                      {article.title.length > 50
                        ? `${article.title.slice(0, 50)}...`
                        : article.title}
                    </Link>
                  </TableCell>
                  <TableCell>{article?.category?.name || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={article.isPublished ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {article.isPublished ? "Published" : "Draft"}
                    </Badge>
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
                        <DropdownMenuItem
                          onClick={() =>
                            setIsEditOpen({ state: true, article })
                          }
                        >
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
    </div>
  );
};

export default ArticlesList;
