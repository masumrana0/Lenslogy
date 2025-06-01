"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";

import { Article } from "@prisma/client";
import type { UseFormReturn } from "react-hook-form";
import { articleBooleanFieldsForUI } from "../../../_components/utils";

interface ArticleSettingsProps {
  form: UseFormReturn<Article>;
}
const ArticleSettings: React.FC<ArticleSettingsProps> = ({ form }) => {
  const watch = form.watch();

  const pinFields = ["isPinFeatured", "isPinLatest", "isPinHero", "isPinNav"];
  const techFields = ["isLatest", "isUpComing"];
  const anoFields = ["isGadget", "isHotTech"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articleBooleanFieldsForUI.map(({ name, desc }) => {
        const isPinField = pinFields.includes(name);
        const isTechField = techFields.includes(name);
        const isAnoFields = anoFields.includes(name);
        const isChecked = watch[name as keyof Article];

        let shouldDisable = false;

        if (isTechField) {
          // If the other tech field is selected and this one is not
          const otherTechChecked = techFields
            .filter((field) => field !== name)
            .some((field) => watch[field as keyof Article]);

          shouldDisable = otherTechChecked && !isChecked;
        }

        if (isPinField) {
          // If another pin is selected and this one is not
          const otherPinChecked = pinFields
            .filter((field) => field !== name)
            .some((field) => watch[field as keyof Article]);

          shouldDisable = otherPinChecked && !isChecked;
        }
        if (isAnoFields) {
          // If another ano field is selected and this one is not
          const otherAnoChecked = anoFields
            .filter((field) => field !== name)
            .some((field) => watch[field as keyof Article]);

          shouldDisable = otherAnoChecked && !isChecked;
        }

        return (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof Article}
            render={({ field }) => (
              <FormItem
                className={`flex flex-row items-start p-4 border rounded-md space-x-3 space-y-0 ${
                  shouldDisable
                    ? "bg-gray-100 opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                    id={name}
                    disabled={shouldDisable}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel
                    htmlFor={name}
                    className={shouldDisable ? "text-gray-500" : ""}
                  >
                    {name}
                  </FormLabel>
                  <FormDescription
                    className={shouldDisable ? "text-gray-400" : ""}
                  >
                    {desc}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        );
      })}
    </div>
  );
};

export default ArticleSettings;
