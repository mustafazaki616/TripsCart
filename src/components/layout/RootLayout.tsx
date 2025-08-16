import React from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import MarqueeBanner from "@/components/site/MarqueeBanner";
import AccreditationDrawer from "@/components/site/AccreditationDrawer";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
        {/* <MarqueeBanner /> */}
      </main>
      <Footer />
      <AccreditationDrawer />
    </div>
  );
};

export default RootLayout;
