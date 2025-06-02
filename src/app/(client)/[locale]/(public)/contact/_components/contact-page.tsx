"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 
import { useState } from "react";
import PriorityContactModal from "./prioity-contact-modal";
import { ContactFormData, contactFormSchema } from "@/schama/contact-schema";
 

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      enquiryType: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", data);
      setSubmitSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-black dark:text-white">Contact</span>{" "}
              <span className="text-pink-500">Us</span>
            </h1>
            <p className="dark:text-gray-400 text-gray-800 text-lg max-w-2xl mx-auto">
              Have a question, news tip, or want to collaborate? We&apos;d love
              to hear from you. Get in touch with our team and we&apos;ll get
              back to you as soon as possible.
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-8 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
              <p className="text-green-800 dark:text-green-300 text-center font-medium">
                Thank you! Your message has been sent successfully. We&apos;ll
                get back to you soon.
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="dark:bg-gray-900/50 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white text-gray-800 text-2xl">
                    Send us a message
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400 text-black">
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-foreground">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          placeholder="Enter your first name"
                          className={`dark:bg-gray-800 bg-gray-50 dark:border-gray-700 border-gray-500 dark:text-white placeholder:text-gray-500 ${
                            errors.firstName
                              ? "border-red-500 dark:border-red-500"
                              : ""
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-foreground">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          placeholder="Enter your last name"
                          className={`dark:bg-gray-800 bg-gray-50 dark:border-gray-700 border-gray-500 dark:text-white placeholder:text-gray-500 ${
                            errors.lastName
                              ? "border-red-500 dark:border-red-500"
                              : ""
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email address"
                        className={`dark:bg-gray-800 bg-gray-50 dark:border-gray-700 border-gray-500 dark:text-white placeholder:text-gray-500 ${
                          errors.email
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="Enter your phone number"
                        className={`dark:bg-gray-800 bg-gray-50 dark:border-gray-700 border-gray-500 dark:text-white placeholder:text-gray-500 ${
                          errors.phone
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="enquiry" className="text-foreground">
                        What is your enquiry about? *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("enquiryType", value)
                        }
                      >
                        <SelectTrigger
                          className={`dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-300 dark:text-white text-gray-900 ${
                            errors.enquiryType
                              ? "border-red-500 dark:border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-300">
                          <SelectItem
                            value="news-tips"
                            className="dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-100"
                          >
                            News Tips
                          </SelectItem>
                          <SelectItem
                            value="events"
                            className="dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-100"
                          >
                            Events Related Inquiries
                          </SelectItem>
                          <SelectItem
                            value="advertising"
                            className="dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-100"
                          >
                            Advertising & Sponsorships
                          </SelectItem>
                          <SelectItem
                            value="error-reports"
                            className="dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-100"
                          >
                            Error Reports
                          </SelectItem>
                          <SelectItem
                            value="general"
                            className="dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-100"
                          >
                            General Inquiry
                          </SelectItem>
                          <SelectItem
                            value="partnership"
                            className="dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-100"
                          >
                            Partnership Opportunities
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.enquiryType && (
                        <p className="text-red-500 text-sm">
                          {errors.enquiryType.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        placeholder="Enter the subject of your message"
                        className={`dark:bg-gray-800 bg-gray-50 dark:border-gray-700 border-gray-500 dark:text-white placeholder:text-gray-500 ${
                          errors.subject
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">
                        Message * ({watch("message")?.length || 0}/1000)
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Enter your message here..."
                        rows={6}
                        className={`dark:bg-gray-800 bg-gray-50 dark:border-gray-700 border-gray-500 dark:text-white placeholder:text-gray-500 resize-none ${
                          errors.message
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="dark:bg-gray-900/50 bg-white dark:border-gray-800 border-gray-200">
                <CardHeader>
                  <CardTitle className="dark:text-white text-gray-900 text-xl">
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-pink-500 mt-1" />
                    <div>
                      <h3 className="dark:text-white text-gray-900 font-medium">
                        Email
                      </h3>
                      <p className="dark:text-gray-400 text-gray-600 text-sm">
                        contact@lenslogy.com
                      </p>
                      <p className="dark:text-gray-400 text-gray-600 text-sm">
                        news@lenslogy.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-pink-500 mt-1" />
                    <div>
                      <h3 className="dark:text-white text-gray-900 font-medium">
                        Phone
                      </h3>
                      <p className="dark:text-gray-400 text-gray-600 text-sm">
                        +1 (555) 123-4567
                      </p>
                      <p className="dark:text-gray-400 text-gray-600 text-sm">
                        Mon-Fri 9AM-6PM EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-pink-500 mt-1" />
                    <div>
                      <h3 className="dark:text-white text-gray-900 font-medium">
                        Address
                      </h3>
                      <p className="dark:text-gray-400 text-gray-600 text-sm">
                        123 Tech Street
                        <br />
                        Digital City, DC 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-pink-500/30">
                <CardContent className="p-6">
                  <h3 className="dark:text-white text-gray-900 font-bold text-lg mb-2">
                    Quick Response
                  </h3>
                  <p className="dark:text-gray-300 text-gray-700 text-sm mb-4">
                    Need urgent assistance? Use our priority contact form for
                    faster response times.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                    onClick={() => setIsPriorityModalOpen(true)}
                  >
                    Priority Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <PriorityContactModal
            open={isPriorityModalOpen}
            onOpenChange={setIsPriorityModalOpen}
          />
        </div>
      </main>
    </div>
  );
}
