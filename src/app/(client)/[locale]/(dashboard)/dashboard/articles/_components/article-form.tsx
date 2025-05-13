// "use client";

// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "@/components/ui/toast";
// import { ImageUploader } from "@/components/ui/image-uploader";
// import { Loader2, Save } from "lucide-react";
// import { RichTextEditor } from "./editor";
// import { useGetAllCategoriesQuery } from "@/redux/api/category.api";
// import { articleSchema } from "@/schama";
// import { useCreateArticleMutation } from "@/redux/api/article.api";

// // Validation schema

// type FormValues = z.infer<typeof articleSchema>;

// export function ArticleForm({ article }: { article?: any }) {
//   const router = useRouter();
//   const { data: categories, isLoading: isCategoryLoading } =
//     useGetAllCategoriesQuery("en");

//   const [create, { isLoading }] = useCreateArticleMutation();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(articleSchema as any),
//     defaultValues: {
//       title: article?.title || "",
//       excerpt: article?.excerpt || "",
//       content: article?.content || "",
//       image: article?.image || null,
//       categoryId: article?.categoryId || "",
//       isFeatured: article?.isFeatured || false,
//       isPinFeatured: article?.isPinFeatured || false,
//       isPinLatest: article?.isPinLatest || false,
//       isPublished: article?.isPublished || false,
//     },
//   });

//   async function onSubmit(values: FormValues) {
//     try {
//       const { image, ...payload } = values;

//       const formdata = new FormData();
//       formdata.append("payload", JSON.stringify(payload));
//       formdata.append("imgFile", image);
//       await create(formdata);

//       toast({ title: "Success", description: "Article saved successfully" });
//       router.refresh();
//     } catch (error) {
//       console.error(error);
//       toast({ title: "Error", description: "Failed to save article" });
//     } finally {
//     }
//   }

//   return (
//     <Card className="border-none shadow-none p-5">
//       <CardHeader className="px-0">
//         <CardTitle className="text-2xl font-bold">
//           {article ? "Edit Article" : "Create New Article"}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="px-0">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <Tabs defaultValue="content" className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-8">
//                 <TabsTrigger value="content">Content</TabsTrigger>
//                 <TabsTrigger value="settings">Settings</TabsTrigger>
//               </TabsList>

//               <TabsContent value="content" className="space-y-8">
//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
//                   <div className="space-y-8">
//                     <FormField
//                       control={form.control}
//                       name="title"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Title</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter article title"
//                               {...field}
//                               className="text-lg"
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             The title of your article as it will appear on the
//                             blog
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="excerpt"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Excerpt</FormLabel>
//                           <FormControl>
//                             <Textarea
//                               placeholder="Brief summary of your article"
//                               className="min-h-[100px] resize-none"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             A short summary that appears on article cards
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="content"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Content</FormLabel>
//                           <FormControl>
//                             <RichTextEditor
//                               value={field.value}
//                               onChange={field.onChange}
//                               placeholder="Write your article content here..."
//                               className="min-h-[500px] w-4xl"
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <div className="space-y-8">
//                     <FormField
//                       control={form.control}
//                       name="image"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Featured Image</FormLabel>
//                           <FormControl>
//                             <ImageUploader
//                               onImageUpload={({ file }) => field.onChange(file)}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Upload a featured image for your article
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="categoryId"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Category</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select a category" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {!isCategoryLoading &&
//                                 categories?.map((category: any) => (
//                                   <SelectItem
//                                     key={category.id}
//                                     value={category.id}
//                                   >
//                                     {category.name}
//                                   </SelectItem>
//                                 ))}
//                             </SelectContent>
//                           </Select>
//                           <FormDescription>
//                             The category this article belongs to
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="settings" className="space-y-8">
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   {[
//                     {
//                       name: "isPublished",
//                       label: "Publish",
//                       desc: "Check this box to make the article publicly visible",
//                     },
//                     {
//                       name: "isFeatured",
//                       label: "Featured",
//                       desc: "Feature this article on the homepage",
//                     },
//                     {
//                       name: "isPinFeatured",
//                       label: "Pin to Featured",
//                       desc: "Pin this article to the top of featured articles",
//                     },
//                     {
//                       name: "isPinLatest",
//                       label: "Pin to Latest",
//                       desc: "Pin this article to the top of latest articles",
//                     },
//                     {
//                       name: "isPinHero",
//                       label: "Pin to Hero Section",
//                       desc: "Pin this article to the top hero section of the homepage",
//                     },
//                     {
//                       name: "isUpComing",
//                       label: "Upcoming",
//                       desc: "Mark this article as an upcoming feature",
//                     },
//                     {
//                       name: "isEmergingTech",
//                       label: "Emerging Technology",
//                       desc: "Categorize this article under emerging technology",
//                     },
//                     {
//                       name: "isHotTech",
//                       label: "Hot Technology",
//                       desc: "Mark this article as trending in hot technology",
//                     },
//                     {
//                       name: "isGadget",
//                       label: "Gadget",
//                       desc: "Categorize this article under gadgets",
//                     },
//                   ].map(({ name, label, desc }) => (
//                     <FormField
//                       key={name}
//                       control={form.control}
//                       name={name as keyof FormValues}
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                           <FormControl>
//                             <Checkbox
//                               checked={field.value as any}
//                               onCheckedChange={field.onChange}
//                             />
//                           </FormControl>
//                           <div className="space-y-1 leading-none">
//                             <FormLabel>{label}</FormLabel>
//                             <FormDescription>{desc}</FormDescription>
//                           </div>
//                         </FormItem>
//                       )}
//                     />
//                   ))}
//                 </div>
//               </TabsContent>
//             </Tabs>

//             <div className="flex gap-2">
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="gap-2 bg-red-500 hover:bg-red-600 text-white"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4 " />
//                     Save Article
//                   </>
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Loader2, Save } from "lucide-react";
import { RichTextEditor } from "./editor";
import { useGetAllCategoriesQuery } from "@/redux/api/category.api";
import { articleSchema } from "@/schama";
import { useCreateArticleMutation } from "@/redux/api/article.api";
import { Article } from "@prisma/client";

type FormValues = z.infer<typeof articleSchema>;

export function ArticleForm({ article }: { article?: Partial<Article> }) {
  const router = useRouter();
  const { data, isLoading: isCategoryLoading } = useGetAllCategoriesQuery("en");

  const categories = data?.data || [];

  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(articleSchema as any),
    defaultValues: {
      title: article?.title || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      categoryId: article?.categoryId || "",
      isFeatured: article?.isFeatured || false,
      isPinFeatured: article?.isPinFeatured || false,
      isPinLatest: article?.isPinLatest || false,
      isPublished: article?.isPublished || false,
      isPinHero: article?.isPinHero || false,
      isUpComing: article?.isUpComing || false,
      isEmergingTech: article?.isEmergingTech || false,
      isHotTech: article?.isHotTech || false,
      isGadget: article?.isGadget || false,
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const { image, ...payload } = values;

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (image) {
        formData.append("imgFile", image);
      }

      await createArticle(formData).unwrap();

      toast({ title: "Success", description: "Article saved successfully" });
      router.refresh();
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error?.message || "Failed to save article",
      });
    }
  }

  const booleanFields = [
    {
      name: "isPublished",
      label: "Publish",
      desc: "Make article publicly visible",
    },
    { name: "isFeatured", label: "Featured", desc: "Feature on homepage" },
    {
      name: "isPinFeatured",
      label: "Pin to Featured",
      desc: "Pin at featured articles top",
    },
    {
      name: "isPinLatest",
      label: "Pin to Latest",
      desc: "Pin at latest articles top",
    },
    {
      name: "isPinHero",
      label: "Pin to Hero",
      desc: "Pin to top hero section",
    },
    { name: "isUpComing", label: "Upcoming", desc: "Mark as upcoming feature" },
    {
      name: "isEmergingTech",
      label: "Emerging Tech",
      desc: "Emerging technology tag",
    },
    {
      name: "isHotTech",
      label: "Hot Tech",
      desc: "Trending hot technology tag",
    },
    { name: "isGadget", label: "Gadget", desc: "Categorized as Gadget" },
  ] as const;

  return (
    <Card className="border-none shadow-none p-5">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">
          {article ? "Edit Article" : "Create New Article"}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                  <div className="space-y-8">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter article title"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Title as it appears on the blog.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief summary..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Write your article content..."
                              className="min-h-[500px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-8">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image</FormLabel>
                          <FormControl>
                            <ImageUploader
                              onImageUpload={({ file }) => field.onChange(file)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {!isCategoryLoading &&
                                categories?.map((cat: Category) => (
                                  <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {booleanFields.map(({ name, label, desc }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as keyof FormValues}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start p-4 border rounded-md">
                          <FormControl>
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="ml-3 space-y-1">
                            <FormLabel>{label}</FormLabel>
                            <FormDescription>{desc}</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-red-500 hover:bg-red-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Article
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
