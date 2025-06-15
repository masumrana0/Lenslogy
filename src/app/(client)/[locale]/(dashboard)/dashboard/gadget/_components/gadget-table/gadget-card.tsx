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
import type { Gadget } from "@prisma/client";
import {
  Calendar,
  Edit,
  MoreHorizontal,
  Package,
  Tag,
  Trash,
} from "lucide-react";
import Link from "next/link";

interface GadgetCardProps {
  gadget: Gadget;
  lang: "en" | "bn";
  onEdit: (gadget: Gadget) => void;
  onDelete: (id: string) => void;
  gadgetBooleanFields: Array<{ name: string }>;
}

const GadgetCard = ({
  gadget,
  lang,
  onEdit,
  onDelete,
  gadgetBooleanFields,
}: GadgetCardProps) => {
  const renderStatusBadges = () => {
    return gadgetBooleanFields.map(({ name }) => {
      const value = gadget[name as keyof Gadget];

      if (name === "isPublished") {
        return (
          <Badge
            key={name}
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
            key={name}
            variant="outline"
            className="text-xs px-2 py-0.5 capitalize"
          >
            {name.replace(/([A-Z])/g, " $1").trim()}
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
              href={`/gadget/${gadget.baseId}`}
              className="hover:text-primary transition-colors line-clamp-2"
            >
              {gadget.title}
            </Link>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0  border rounded   ">
                <MoreHorizontal className="h-4 w-4  " />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(gadget)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(gadget.id)}
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
            <span>Brand:</span>
          </div>
          <span className="font-medium">{gadget?.brand?.name || "N/A"}</span>
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
            {formatTimestampWithTranslation(gadget.createdAt, lang)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GadgetCard;
