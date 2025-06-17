"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTimestampWithTranslation } from "@/lib/translator";
import type { Article } from "@prisma/client";
import {
  Calendar,
  Edit,
  MoreHorizontal,
  Package,
  Tag,
  Trash,
} from "lucide-react";
import Link from "next/link";

interface articleCardProps {
  article: Article | any;
  lang: "en" | "bn";
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  articleBooleanFields: string[];
}

const ArticleCard = ({
  article,
  lang,
  onEdit,
  onDelete,
  articleBooleanFields,
}: articleCardProps) => {
  const renderStatusBadges = () => {
    return articleBooleanFields.map((key) => {
      const value = article[key as keyof Article];

      if (key === "isPublished") {
        return (
          <Badge
            key={key}
            variant={value ? "default" : "secondary"}
            className="text-xs px-2 py-0.5"
          >
            {value ? "Published" : "Draft"}
          </Badge>
        );
      }

      if (value) {
        return (
          <Badge
            key={key}
            variant="outline"
            className="text-xs px-2 py-0.5 capitalize"
          >
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Badge>
        );
      }

      return null;
    });
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium leading-tight flex-1 pr-2">
            <Link
              href={`/article/${article.baseId}`}
              className="hover:text-primary transition-colors line-clamp-2"
            >
              {article.title}
            </Link>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0  border rounded   "
              >
                <MoreHorizontal className="h-4 w-4  " />
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
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>Category:</span>
          </div>
          <span className="font-medium">{article!.category.name || "N/A"}</span>
        </div>

        <div className="flex items-start justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>Status:</span>
          </div>
          <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
            {renderStatusBadges()}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created:</span>
          </div>
          <span className="text-muted-foreground">
            {formatTimestampWithTranslation(article.createdAt, lang)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
