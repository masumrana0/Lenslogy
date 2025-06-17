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
import { TableCell, TableRow } from "@/components/ui/table";
import { formatTimestampWithTranslation } from "@/lib/translator";
import type { Article } from "@prisma/client";
import { Calendar, Edit, MoreHorizontal, Package, Trash } from "lucide-react";
import Link from "next/link";

interface ArticleTableRowProps {
  article: Article | any;
  lang: "en" | "bn";
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  articleBooleanFilterKeys: string[];
}

const ArticleTableRow = ({
  article,
  lang,
  onEdit,
  onDelete,
  articleBooleanFilterKeys,
}: ArticleTableRowProps) => {
  const renderStatusBadges = () => {
    return articleBooleanFilterKeys.map((key) => {
      const value = article[key as keyof Article];

      if (key === "isPublished") {
        return (
          <Badge
            key={key}
            variant={value ? "default" : "secondary"}
            className="text-xs"
          >
            {value ? "Published" : "Draft"}
          </Badge>
        );
      }

      if (value) {
        return (
          <Badge key={key} variant="outline" className="text-xs capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Badge>
        );
      }

      return null;
    });
  };

  return (
    <TableRow className="group hover:bg-muted/30 transition-colors">
      <TableCell className="font-medium py-4">
        <div className="space-y-1">
          <Link
            href={`/article/${article.baseId}`}
            className="hover:text-primary transition-colors font-medium block"
          >
            {article.title.length > 60
              ? `${article.title.slice(0, 60)}...`
              : article.title}
          </Link>
          <div className="text-xs text-muted-foreground">
            ID: {article.baseId}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
            <Package className="h-3 w-3 text-muted-foreground" />
          </div>
          <span className="font-medium">
            {article?.category!.name || "N/A"}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-wrap gap-1">{renderStatusBadges()}</div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatTimestampWithTranslation(article.createdAt, lang)}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-2  border rounded "
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(article)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(article.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ArticleTableRow;
