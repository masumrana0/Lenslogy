"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to request password reset");
      }

      setIsSubmitted(true);
      toast({
        title: "Check your email",
        description:
          "If your email is registered, you will receive a password reset link",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            If your email is registered, you will receive a password reset link
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
          className="w-full"
        >
          Try another email
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-primary"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </Form>
  );
}
