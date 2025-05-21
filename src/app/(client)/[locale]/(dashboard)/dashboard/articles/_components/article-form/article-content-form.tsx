"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Article } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import { RichTextEditor } from "./editor";

type Props = {
  form: UseFormReturn<Article>;
};

const ArticleTextInputs = ({ form }: Props) => (
  <div className="space-y-8">
    {/* Title */}
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter article title" {...field} />
          </FormControl>
          <FormDescription>Title as it appears on the blog.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Excerpt */}
    <FormField
      control={form.control}
      name="excerpt"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Excerpt</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Brief summary..."
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Content */}
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Write your article content..."
              className="min-h-[500px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default ArticleTextInputs;
