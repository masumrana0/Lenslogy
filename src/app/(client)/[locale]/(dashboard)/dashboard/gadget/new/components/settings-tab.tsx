"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GadgetFormData } from "@/schama/gadget-schema";
import { Controller, type Control } from "react-hook-form";

interface SettingsTabProps {
  control: Control<GadgetFormData | any>;
}

export function SettingsTab({ control }: SettingsTabProps) {
  const generalSettings = [
    {
      key: "isGadget" as keyof GadgetFormData,
      label: "Is Gadget",
      description: "Mark as a gadget item",
    },
    {
      key: "isPublished" as keyof GadgetFormData,
      label: "Published",
      description: "Make visible to public",
    },
    {
      key: "isFeatured" as keyof GadgetFormData,
      label: "Featured",
      description: "Show in featured section",
    },
    {
      key: "isLatest" as keyof GadgetFormData,
      label: "Latest",
      description: "Mark as latest gadget",
    },
    {
      key: "isUpComing" as keyof GadgetFormData,
      label: "Upcoming",
      description: "Mark as upcoming release",
    },
  ];

  const pinSettings = [
    {
      key: "isPinFeatured" as keyof GadgetFormData,
      label: "Pin Featured",
      description: "Pin to featured section",
    },
    {
      key: "isPinLatest" as keyof GadgetFormData,
      label: "Pin Latest",
      description: "Pin to latest section",
    },
    {
      key: "isPinHero" as keyof GadgetFormData,
      label: "Pin Hero",
      description: "Pin to hero section",
    },
    {
      key: "isPinNav" as keyof GadgetFormData,
      label: "Pin Navigation",
      description: "Pin to navigation",
    },
  ];

  const techSettings = [
    {
      key: "isEmergingTech" as keyof GadgetFormData,
      label: "Emerging Tech",
      description: "Mark as emerging technology",
    },
    {
      key: "isHotTech" as keyof GadgetFormData,
      label: "Hot Tech",
      description: "Mark as hot technology",
    },
  ];

  const SettingGroup = ({
    title,
    settings,
  }: {
    title: string;
    settings: Array<{
      key: keyof GadgetFormData;
      label: string;
      description: string;
    }>;
  }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {settings.map((setting) => (
        <div key={setting.key} className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor={setting.key}>{setting.label}</Label>
            <p className="text-sm text-muted-foreground">
              {setting.description}
            </p>
          </div>
          <Controller
            name={setting.key}
            control={control}
            render={({ field }) => (
              <Switch
                id={setting.key}
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-red-500"
              />
            )}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingGroup title="General Settings" settings={generalSettings} />
        <SettingGroup title="Pin Settings" settings={pinSettings} />
      </div>
      <SettingGroup title="Technology Categories" settings={techSettings} />
    </div>
  );
}
