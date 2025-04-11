import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import React from "react";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pb-12">{children}</div>
      <Footer />
    </main>
  );
};

export default PublicLayout;
