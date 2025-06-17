// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Calendar,
//   Star,
//   Share2,
//   Bookmark,
//   Heart,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Zap,
//   Camera,
//   Battery,
//   Cpu,
//   Monitor,
// } from "lucide-react";
// import { format } from "date-fns";

// interface GadgetDetailsPageProps {
//   gadget: any; // Replace with proper type based on your schema
// }

// export function GadgetDetailsPage({ gadget }: GadgetDetailsPageProps) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % gadget.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gadget.images.length) % gadget.images.length
//     );
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className={`h-4 w-4 ${
//           i < Math.floor(rating)
//             ? "fill-yellow-400 text-yellow-400"
//             : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   const getBadgeVariant = (type: string) => {
//     switch (type) {
//       case "featured":
//         return "default";
//       case "latest":
//         return "secondary";
//       case "hot":
//         return "destructive";
//       case "emerging":
//         return "outline";
//       default:
//         return "secondary";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* <Header /> */}

//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Hero Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
//               <Image
//                 src={gadget.images[currentImageIndex] || "/placeholder.svg"}
//                 alt={gadget.title}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//               {gadget.images.length > 1 && (
//                 <>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
//                     onClick={prevImage}
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
//                     onClick={nextImage}
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </>
//               )}
//             </div>

//             {/* Thumbnail Gallery */}
//             {gadget.images.length > 1 && (
//               <div className="flex gap-2 overflow-x-auto pb-2">
//                 {gadget.images.map((image: string, index: number) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
//                       index === currentImageIndex
//                         ? "border-red-500"
//                         : "border-gray-200 dark:border-gray-700"
//                     }`}
//                   >
//                     <Image
//                       src={image || "/placeholder.svg"}
//                       alt={`${gadget.title} ${index + 1}`}
//                       fill
//                       className="object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             {/* Badges */}
//             <div className="flex flex-wrap gap-2">
//               {gadget.isFeatured && (
//                 <Badge variant={getBadgeVariant("featured")}>Featured</Badge>
//               )}
//               {gadget.isLatest && (
//                 <Badge variant={getBadgeVariant("latest")}>Latest</Badge>
//               )}
//               {gadget.isHotTech && (
//                 <Badge variant={getBadgeVariant("hot")}>Hot Tech</Badge>
//               )}
//               {gadget.isEmergingTech && (
//                 <Badge variant={getBadgeVariant("emerging")}>
//                   Emerging Tech
//                 </Badge>
//               )}
//               {gadget.isUpComing && <Badge variant="outline">Upcoming</Badge>}
//             </div>

//             {/* Brand and Type */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={gadget.brand.logo || "/placeholder.svg"}
//                   alt={gadget.brand.name}
//                   width={32}
//                   height={32}
//                   className="rounded"
//                 />
//                 <span className="font-semibold text-lg">
//                   {gadget.brand.name}
//                 </span>
//               </div>
//               <Badge variant="outline">{gadget.type.name}</Badge>
//             </div>

//             {/* Title and Model */}
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 {gadget.title}
//               </h1>
//               <p className="text-xl text-muted-foreground">{gadget.model}</p>
//             </div>

//             {/* Rating */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1">
//                 {renderStars(gadget.ratings.overall)}
//                 <span className="ml-2 font-semibold">
//                   {gadget.ratings.overall}
//                 </span>
//               </div>
//               <span className="text-sm text-muted-foreground">
//                 ({gadget.ratings.totalReviews.toLocaleString()} reviews)
//               </span>
//             </div>

//             {/* Excerpt */}
//             <p className="text-lg text-muted-foreground leading-relaxed">
//               {gadget.excerpt}
//             </p>

//             {/* Key Specs */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex items-center gap-2">
//                 <Monitor className="h-5 w-5 text-red-500" />
//                 <div>
//                   <p className="text-sm text-muted-foreground">Display</p>
//                   <p className="font-medium">{gadget.specifications.display}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Cpu className="h-5 w-5 text-red-500" />
//                 <div>
//                   <p className="text-sm text-muted-foreground">Processor</p>
//                   <p className="font-medium">
//                     {gadget.specifications.processor}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Camera className="h-5 w-5 text-red-500" />
//                 <div>
//                   <p className="text-sm text-muted-foreground">Camera</p>
//                   <p className="font-medium">{gadget.specifications.camera}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Battery className="h-5 w-5 text-red-500" />
//                 <div>
//                   <p className="text-sm text-muted-foreground">Battery</p>
//                   <p className="font-medium">{gadget.specifications.battery}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing */}
//             <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground">
//                       Starting Price
//                     </p>
//                     <p className="text-3xl font-bold text-red-600">
//                       ${gadget.pricing.msrp.toLocaleString()}
//                     </p>
//                   </div>
//                   <Badge
//                     variant="outline"
//                     className="text-green-600 border-green-600"
//                   >
//                     {gadget.pricing.availability}
//                   </Badge>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setIsBookmarked(!isBookmarked)}
//                 className={isBookmarked ? "text-red-500 border-red-500" : ""}
//               >
//                 <Bookmark
//                   className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
//                 />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setIsLiked(!isLiked)}
//                 className={isLiked ? "text-red-500 border-red-500" : ""}
//               >
//                 <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
//               </Button>
//               <Button variant="outline" size="icon">
//                 <Share2 className="h-4 w-4" />
//               </Button>
//               <Button className="flex-1 bg-red-500 hover:bg-red-600">
//                 View Full Specifications
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Detailed Content */}
//         <Tabs defaultValue="overview" className="space-y-8">
//           <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="specs">Specifications</TabsTrigger>
//             <TabsTrigger value="reviews">Reviews</TabsTrigger>
//             <TabsTrigger value="compare">Compare</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-8">
//             {/* Article Content */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Detailed Review</CardTitle>
//               </CardHeader>
//               <CardContent className="prose prose-lg max-w-none dark:prose-invert">
//                 <div dangerouslySetInnerHTML={{ __html: gadget.content }} />
//               </CardContent>
//             </Card>

//             {/* Author Info */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>About the Author</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-start gap-4">
//                   <Avatar className="h-16 w-16">
//                     <AvatarImage
//                       src={gadget.author.avatar || "/placeholder.svg"}
//                       alt={gadget.author.name}
//                     />
//                     <AvatarFallback>
//                       {gadget.author.name.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="space-y-2">
//                     <h3 className="text-lg font-semibold">
//                       {gadget.author.name}
//                     </h3>
//                     <p className="text-muted-foreground">{gadget.author.bio}</p>
//                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         Published {format(gadget.createdAt, "MMM dd, yyyy")}
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Eye className="h-4 w-4" />
//                         12.5K views
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="specs" className="space-y-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Monitor className="h-5 w-5" />
//                     Display & Design
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Display</span>
//                     <span className="font-medium">
//                       {gadget.specifications.display}
//                     </span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">
//                       Available Colors
//                     </span>
//                     <div className="flex gap-1">
//                       {gadget.specifications.colors.map(
//                         (color: string, index: number) => (
//                           <div
//                             key={index}
//                             className="w-4 h-4 rounded-full border border-gray-300"
//                             style={{
//                               backgroundColor: color
//                                 .toLowerCase()
//                                 .includes("black")
//                                 ? "#000"
//                                 : color.toLowerCase().includes("white")
//                                 ? "#fff"
//                                 : color.toLowerCase().includes("blue")
//                                 ? "#007AFF"
//                                 : "#8E8E93",
//                             }}
//                           />
//                         )
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Cpu className="h-5 w-5" />
//                     Performance
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Processor</span>
//                     <span className="font-medium">
//                       {gadget.specifications.processor}
//                     </span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">
//                       Storage Options
//                     </span>
//                     <span className="font-medium">
//                       {gadget.specifications.storage}
//                     </span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">
//                       Operating System
//                     </span>
//                     <span className="font-medium">
//                       {gadget.specifications.os}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Camera className="h-5 w-5" />
//                     Camera System
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Main Camera</span>
//                     <span className="font-medium">
//                       {gadget.specifications.camera}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Zap className="h-5 w-5" />
//                     Battery & Connectivity
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Battery Life</span>
//                     <span className="font-medium">
//                       {gadget.specifications.battery}
//                     </span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Connectivity</span>
//                     <span className="font-medium">
//                       {gadget.specifications.connectivity}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="reviews" className="space-y-6">
//             {/* Rating Breakdown */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Rating Breakdown</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <div className="space-y-3">
//                     {Object.entries(gadget.ratings)
//                       .filter(
//                         ([key]) => key !== "overall" && key !== "totalReviews"
//                       )
//                       .map(([category, rating]) => (
//                         <div
//                           key={category}
//                           className="flex items-center justify-between"
//                         >
//                           <span className="capitalize text-muted-foreground">
//                             {category}
//                           </span>
//                           <div className="flex items-center gap-2">
//                             <div className="flex">
//                               {renderStars(rating as number)}
//                             </div>
//                             <span className="font-medium">{rating}</span>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                   <div className="flex flex-col items-center justify-center">
//                     <div className="text-4xl font-bold">
//                       {gadget.ratings.overall}
//                     </div>
//                     <div className="flex">
//                       {renderStars(gadget.ratings.overall)}
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       Based on {gadget.ratings.totalReviews.toLocaleString()}{" "}
//                       reviews
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="compare">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Compare with Similar Gadgets</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   Comparison feature coming soon...
//                 </p>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }



import React from 'react';

const page = () => {
    return (
        <div>
            
        </div>
    );
};

export default page;