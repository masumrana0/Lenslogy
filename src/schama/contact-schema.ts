import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),

  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(val.replace(/[\s\-$$$$]/g, ""));
    }, "Please enter a valid phone number"),

  enquiryType: z.string().min(1, "Please select an enquiry type"),

  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const priorityContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[1-9][\d]{9,15}$/, "Please enter a valid phone number"),

  urgencyLevel: z.enum(["high", "critical", "emergency"], {
    required_error: "Please select urgency level",
  }),

  issue: z
    .string()
    .min(10, "Issue description must be at least 10 characters")
    .max(500, "Issue description must be less than 500 characters"),
});

export type PriorityContactData = z.infer<typeof priorityContactSchema>;
