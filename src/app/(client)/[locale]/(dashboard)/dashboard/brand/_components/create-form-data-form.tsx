"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useCreateBandMutation } from "@/redux/api/brand.api";
import { useCreateCategoryMutation } from "@/redux/api/category.api";
import { useCreateGadgetTypeMutation } from "@/redux/api/gadgetType.api";
import { categorySchema } from "@/schama/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import status from "http-status";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";

type FormValues = z.infer<typeof categorySchema>;
type IMode = "category" | "brand" | "gadgetType";

interface Props {
  mode: IMode;
}

const FormEntryForm: React.FC<Props> = ({ mode }) => {
  const [createCategory, { isLoading: isLoadingCategory }] =
    useCreateCategoryMutation();
  const [createBrand, { isLoading: isLoadingBrand }] = useCreateBandMutation();
  const [createGadgetType, { isLoading: isLoadingGadgetType }] =
    useCreateGadgetTypeMutation();

  const isLoading = isLoadingCategory || isLoadingBrand || isLoadingGadgetType;

  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const mutationMap = {
    category: createCategory,
    brand: createBrand,
    gadgetType: createGadgetType,
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const create = mutationMap[mode];
      const response = await create(data).unwrap();

      if (response?.statusCode === status.CREATED) {
        toast({
          title: "Success",
          description: `${mode} created successfully.`,
        });
        form.reset();
      }
    } catch (error: any) {
      const message =
        error?.data?.message ||
        `An unexpected error occurred while creating the ${mode}.`;

      toast({
        title: "Error",
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{`${
                mode.charAt(0).toUpperCase() + mode.slice(1)
              } Name`}</FormLabel>
              <FormControl>
                <Input placeholder={`Enter ${mode} name`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="bg-red-500 hover:bg-red-600 text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default FormEntryForm;
