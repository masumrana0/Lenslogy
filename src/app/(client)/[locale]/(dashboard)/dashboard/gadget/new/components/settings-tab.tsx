"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GadgetFormData } from "@/schama/gadget-schema";
import { Controller, UseFormReturn } from "react-hook-form";

interface SettingsTabProps {
  form: UseFormReturn<GadgetFormData>;
}

export function SettingsTab({ form }: SettingsTabProps) {
  const { watch, control, setValue } = form;

  // Watch all fields at once to use for disable logic
  const watchAll = watch();

  const generalSettings = [
    {
      key: "isPublished",
      label: "Published",
      description: "Make visible to public",
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

  const SettingGroup = ({
    title,
    settings,
    exclusive = false,
  }: {
    title: string;
    settings: readonly {
      key: keyof GadgetFormData;
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
}
