"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { IUser } from "../../users/_interface/user.interface";
// components
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useUpdateUserMutation } from "@/redux/api/user.api";
import { editProfileSchema } from "@/schama/validation-schema";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import status from "http-status";

import { useRouter } from "next/navigation";

type ProfileFormValues = z.infer<typeof editProfileSchema>;

const EditProfile = ({
  user,
  setIsEditing,
}: {
  user: IUser;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { update } = useSession();
  const [isChangePassword, setChangePassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user?.avatar as string
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      designation: user.designation ?? "",
    },
    mode: "onChange",
  });

  const handleCancel = () => {
    form.reset();
    setPhotoPreview(user.avatar as string);
    setPhotoFile(null);
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // redux rkt
  const [updateUser, { isUpdating }] = useUpdateUserMutation();

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const data = new FormData();

      const payload: any = {};

      if (values.name && values.name !== user.name) payload.name = values.name;
      if (values.email && values.email !== user.email)
        payload.email = values.email;
      if (values.designation && values.designation !== user.designation) {
        payload.designation = values.designation;
      }

      if (values.oldPassword && values.password) {
        payload.oldPassword = values.oldPassword;
        payload.newPassword = values.password;
      }

      data.append("payload", JSON.stringify(payload));

      if (photoFile) {
        data.append("imgFile", photoFile);
      }

      const res = await updateUser({ data }).unwrap();
      if (res?.statusCode == status.OK) {
        await update(res.data);
        toast({
          title: "Changes updated",
          description: "Your changes have been saved.",
        });
        router.refresh();
        setIsEditing(false);
      }
    } catch (error: any) {
      const message = error?.data?.message || "An unexpected error occurred";
      toast({
        title: "Error",
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 rounded-full overflow-hidden dark:border">
            <AvatarImage src={photoPreview || user.avatar} alt="Profile" />
            <AvatarFallback>
              {user.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("photo")?.click()}
            >
              Change Photo
            </Button>
          </div>
        </div>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Designation */}
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input placeholder="Your designation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 rounded-md border border-border p-4 shadow-sm bg-muted/20 dark:bg-background">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-foreground">
              Manage Password
            </h3>
            <Button
              type="button"
              variant="link"
              onClick={() => setChangePassword(!isChangePassword)}
              className="px-3 py-1 text-sm"
            >
              {isChangePassword ? "Cancel Password Change" : "Change Password"}
            </Button>
          </div>
          {isChangePassword && (
            <>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Current password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Required if changing your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave blank if you don&apos;t want to change your
                      password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Footer Actions */}
        <CardFooter className="flex justify-end gap-2 px-0">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            disabled={isUpdating || (!form.formState.isDirty && !photoFile)}
            className="text-red-500"
            type="submit"
          >
            {isUpdating ? "Changing..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default EditProfile;
