"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { SettingsTab } from "./settings-tab";
import { gadgetSchema, type GadgetFormData } from "@/schama/gadget-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ContentTab from "./content-tab";

interface GadgetFormProps {
  mode?: "create" | "update";
  initialData?: Partial<GadgetFormData | any>;
}

const GadgetForm = ({ mode = "create", initialData }: GadgetFormProps) => {
  const defaultValue = {
    typeId: "",
    brandId: "",
    model: "",
    releaseDate: null,
    title: "",
    excerpt: "",
    content: "",
    image: "",
    images: [],
    isGadget: true,
    isFeatured: false,
    isPinFeatured: false,
    isPinLatest: false,
    isLatest: false,
    isPinHero: false,
    isPinNav: false,
    isPublished: false,
    isUpComing: false,
    isEmergingTech: false,
    isHotTech: false,
  };

  const initialValue: any = initialData ? initialData : defaultValue;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<GadgetFormData>({
    resolver: zodResolver(gadgetSchema as any),
    defaultValues: initialValue,
  });

  const isUpdate = mode === "update";
  const isCreate = mode === "create";

  const onFormSubmit = async (data: GadgetFormData) => {
    console.log(data);

    try {
      if (isCreate) {
        toast.success(
          `Gadget ${mode === "create" ? "created" : "updated"} successfully!`
        );
        if (mode === "create") {
          // reset();
        }
      } else {
        // Default behavior - just log the data
        // console.log("Form submitted:", data);
        // console.log("Main image:", data.image?.[0]);
        // console.log(
        //   "Other images:",
        //   data.images ? Array.from(data.images) : []
        // );
        // toast.success(
        //   `Gadget ${mode === "create" ? "created" : "updated"} successfully!`
        // );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(`Failed to ${mode} gadget. Please try again.`);
    }
  };

  return (
    <div className="container  mx-auto ">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {isUpdate ? "Update Gadget" : "Create New Gadget"}
              </CardTitle>
              <CardDescription>
                {isUpdate
                  ? "Update the gadget details below"
                  : "Fill in the details to create a new gadget entry"}
              </CardDescription>
            </div>
            <Badge variant={isUpdate ? "secondary" : "default"}>
              {isUpdate ? "Update Mode" : "Create Mode"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <ContentTab
                  control={control}
                  errors={errors as any}
                  setValue={setValue}
                />
              </TabsContent>

              <TabsContent value="settings">
                <SettingsTab control={control} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => reset()}>
                {isUpdate ? "Reset" : "Clear"}
              </Button>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isUpdate
                    ? "Updating..."
                    : "Creating..."
                  : isUpdate
                  ? "Update Gadget"
                  : "Create Gadget"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GadgetForm;
