import React from "react";
import Footer from "@/components/(public)/shared/footer";
import Navbar from "@/components/(public)/shared/navbar";

const PublicLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: "en" | "bn" };
}>) => {
  return (
    <main className="min-h-screen">
      <Navbar lang={params.locale} />
      <div className="container mx-auto px-4 pb-12">{children}</div>
      <Footer lang={params.locale} />
    </main>
  );
};

export default PublicLayout;
