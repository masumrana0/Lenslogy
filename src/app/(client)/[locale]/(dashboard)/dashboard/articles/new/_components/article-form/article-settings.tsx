"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Article } from "@prisma/client";

interface ArticleSettingsProps {
  form: UseFormReturn<Article>;
}

const ArticleSettings: React.FC<ArticleSettingsProps> = ({ form }) => {
  const { watch, setValue, control } = form;

  const watchAll = watch();

  const generalSettings = [
    {
      key: "isPublished",
      label: "Published",
      description: "Make visible to public",
    },
    {
      key: "isGadget",
      label: "Is Gadget",
      description: "Mark as a gadget item",
    },
    {
      key: "isFeatured",
      label: "Featured",
      description: "Show in featured section",
    },
    {
      key: "isLatest",
      label: "Latest",
      description: "Mark as latest gadget",
    },
    {
      key: "isUpComing",
      label: "Upcoming",
      description: "Mark as upcoming release",
    },
  ] as const;

  const pinSettings = [
    {
      key: "isPinFeatured",
      label: "Pin Featured",
      description: "Pin to featured section",
    },
    {
      key: "isPinLatest",
      label: "Pin Latest",
      description: "Pin to latest section",
    },
    {
      key: "isPinHero",
      label: "Pin Hero",
      description: "Pin to hero section",
    },
    {
      key: "isPinNav",
      label: "Pin Navigation",
      description: "Pin to navigation",
    },
  ] as const;

  const techSettings = [
    {
      key: "isEmergingTech",
      label: "Emerging Tech",
      description: "Mark as emerging technology",
    },
    {
      key: "isHotTech",
      label: "Hot Tech",
      description: "Mark as hot technology",
    },
  ] as const;

  // Fix SettingGroup to accept correct types and use watchAll properly
  const SettingGroup = ({
    title,
    settings,
    exclusive = false,
  }: {
    title: string;
    settings: readonly {
      key: keyof Article;
      label: string;
      description: string;
    }[];
    exclusive?: boolean;
  }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {settings.map(({ key, label, description }) => {
        const isChecked = watchAll?.[key] ?? false;

        let shouldDisable = false;
        if (exclusive) {
          // Check if any other setting is checked
          const othersChecked = settings
            .filter((s) => s.key !== key)
            .some((s) => watchAll?.[s.key]);
          shouldDisable = othersChecked && !isChecked;
        }

        return (
          <div
            key={key}
            className={`flex items-center justify-between ${
              shouldDisable ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="space-y-0.5">
              <Label htmlFor={key}>{label}</Label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <Switch
                  id={key}
                  checked={field.value as boolean}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (exclusive && checked) {
                      // Disable other checkboxes in this exclusive group
                      settings.forEach((s) => {
                        if (s.key !== key) {
                          setValue(s.key, false);
                        }
                      });
                    }
                  }}
                  className="data-[state=checked]:bg-red-500"
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingGroup title="General Settings" settings={generalSettings} />
        <SettingGroup title="Pin Settings" settings={pinSettings} exclusive />
      </div>
      <SettingGroup
        title="Technology Categories"
        settings={techSettings}
        exclusive
      />
    </div>
  );
};

export default ArticleSettings;
