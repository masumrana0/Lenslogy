"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 
import { useState } from "react";
import { Loader2, AlertTriangle, Zap, AlertCircle } from "lucide-react";
import { PriorityContactData, priorityContactSchema } from "@/schama/contact-schema";

interface PriorityContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PriorityContactModal({
  open,
  onOpenChange,
}: PriorityContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PriorityContactData>({
    resolver: zodResolver(priorityContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      urgencyLevel: undefined,
      issue: "",
    },
  });

  const urgencyLevel = watch("urgencyLevel");

  const onSubmit = async (data: PriorityContactData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Priority contact submitted:", data);
      setSubmitSuccess(true);
      reset();

      // Close modal and reset success state after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting priority contact:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <Zap className="w-4 h-4" />;
      case "emergency":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-yellow-500";
      case "critical":
        return "bg-orange-500";
      case "emergency":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] dark:bg-gray-900 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="w-5 h-5 text-pink-500" />
            Priority Contact
          </DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            For urgent matters requiring immediate attention. We aim to respond
            within 2 hours during business hours.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
              Request Submitted!
            </h3>
            <p className="text-green-600 dark:text-green-400 text-sm">
              Your priority request has been received. Our team will contact you
              within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your full name"
                className={`${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your@email.com"
                  className={`${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                  className={`${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency" className="text-foreground">
                Urgency Level *
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("urgencyLevel", value as any)
                }
              >
                <SelectTrigger
                  className={`${errors.urgencyLevel ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="high"
                    className="dark:text-white text-gray-900"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span>High Priority</span>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 text-xs"
                      >
                        4-6 hours
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="critical"
                    className="dark:text-white text-gray-900"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span>Critical</span>
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 text-xs"
                      >
                        2-4 hours
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="emergency"
                    className="dark:text-white text-gray-900"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span>Emergency</span>
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-800 text-xs"
                      >
                        {"< 2 hours"}
                      </Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.urgencyLevel && (
                <p className="text-red-500 text-sm">
                  {errors.urgencyLevel.message}
                </p>
              )}
            </div>

            {urgencyLevel && (
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2 mb-1">
                  {getUrgencyIcon(urgencyLevel)}
                  <span className="font-medium text-sm capitalize">
                    {urgencyLevel} Priority
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${getUrgencyColor(
                      urgencyLevel
                    )}`}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {urgencyLevel === "high" &&
                    "Important matters that need attention within 4-6 hours"}
                  {urgencyLevel === "critical" &&
                    "Urgent issues requiring immediate attention within 2-4 hours"}
                  {urgencyLevel === "emergency" &&
                    "Critical emergencies requiring immediate response within 2 hours"}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="issue" className="text-foreground">
                Issue Description * ({watch("issue")?.length || 0}/500)
              </Label>
              <Textarea
                id="issue"
                {...register("issue")}
                placeholder="Briefly describe your urgent issue..."
                rows={4}
                className={`resize-none ${
                  errors.issue ? "border-red-500" : ""
                }`}
              />
              {errors.issue && (
                <p className="text-red-500 text-sm">{errors.issue.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Submit Priority Request
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
