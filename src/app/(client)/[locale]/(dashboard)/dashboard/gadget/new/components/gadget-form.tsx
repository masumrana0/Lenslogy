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
import {
  useCreateGadgetMutation,
  useUpdateGadgetMutation,
} from "@/redux/api/gadget.api";
import { useState } from "react";

interface GadgetFormProps {
  mode?: "create" | "update";
  gadget?: Partial<GadgetFormData | any>;
}

const GadgetForm = ({ mode = "create", gadget }: GadgetFormProps) => {
  const [removedImages, setRemovedImages] = useState<string[]>([]);

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

  const isUpdate = mode === "update";
  const isCreate = mode === "create";

  // Prepare initial values with proper date conversion
  const initialValue: any = gadget
    ? {
        ...defaultValue,
        ...gadget,
        releaseDate: gadget.releaseDate ? new Date(gadget.releaseDate) : null,
      }
    : defaultValue;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    setValue,
  } = useForm<GadgetFormData>({
    resolver: zodResolver(gadgetSchema as any),
    defaultValues: initialValue,
  });

  const [createGadget, { isLoading: isCreating }] = useCreateGadgetMutation();
  const [updateGadget, { isLoading: isUpdating }] = useUpdateGadgetMutation();
  const isLoading = isCreating || isUpdating;

  const handleRemoveExistingImage = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
  };

  const onFormSubmit = async (data: GadgetFormData) => {
    try {
      const formData = new FormData();

      if (isCreate) {
        // For create, add all data
        if (data.image && data.image instanceof FileList && data.image[0]) {
          formData.append("imgFile", data.image[0]);
        }

        if (
          data.images &&
          data.images instanceof FileList &&
          data.images.length > 0
        ) {
          Array.from(data.images).forEach((file) => {
            formData.append("imgFiles", file);
          });
        }

        const payloadData: any = { ...data };
        delete payloadData.image;
        delete payloadData.images;

        formData.append("payload", JSON.stringify(payloadData));

        const result = await createGadget(formData).unwrap();
        toast.success("Gadget created successfully!");
        reset();
        return result;
      } else if (isUpdate && gadget?.id) {
        // For update, handle both new files and existing URLs
        if (data.image && data.image instanceof FileList && data.image[0]) {
          formData.append("imgFile", data.image[0]);
        }

        if (
          data.images &&
          data.images instanceof FileList &&
          data.images.length > 0
        ) {
          Array.from(data.images).forEach((file) => {
            formData.append("imgFiles", file);
          });
        }

        // Add removed images info
        if (removedImages.length > 0) {
          formData.append("removedImages", JSON.stringify(removedImages));
        }

        const payloadData: any = { ...data };
        delete payloadData.image;
        delete payloadData.images;

        formData.append("payload", JSON.stringify(payloadData));

        const result = await updateGadget({
          id: gadget.id,
          data: formData,
        }).unwrap();

        toast.success("Gadget updated successfully!");
        setRemovedImages([]);
        return result;
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(`Failed to ${mode} gadget. Please try again.`);
    }
  };

  return (
    <div className="container mx-auto">
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
            <div className="flex gap-2">
              <Badge variant={isUpdate ? "secondary" : "default"}>
                {isUpdate ? "Update Mode" : "Create Mode"}
              </Badge>
              {isUpdate && (isDirty || removedImages.length > 0) && (
                <Badge variant="outline" className="text-orange-600">
                  Changes detected
                </Badge>
              )}
            </div>
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
                  onRemoveExistingImage={handleRemoveExistingImage}
                  initialData={gadget}
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
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading
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
