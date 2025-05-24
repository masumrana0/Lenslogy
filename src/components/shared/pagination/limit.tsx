"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface LimitProps {
  limit: number;
  onLimitChange: (limit: number) => void;
}

const Limit: React.FC<LimitProps> = ({ limit, onLimitChange }) => {
  return (
    <Select
      value={limit.toString()}
      onValueChange={(value) => onLimitChange(Number(value))}
    >
      <SelectTrigger className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md px-3 py-1 border-none focus:ring-2 focus:ring-red-500">
        <SelectValue placeholder="10 per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5 per page</SelectItem>
        <SelectItem value="10">10 per page</SelectItem>
        <SelectItem value="20">20 per page</SelectItem>
        <SelectItem value="50">50 per page</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Limit;
