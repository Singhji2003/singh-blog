import ThemeRegistry from "../themeRegistry";
import "./globals.css";
import Navbar from "@/componenets/Navbar";
import Footer from "@/componenets/Footer";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Singh Blog - Latest News, Articles & Insights",
  description:
    "Explore the latest news, technology updates, insights, and trending articles on Singh Blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Navbar />
        <ThemeRegistry>{children}</ThemeRegistry>
        <Footer />
      </body>
    </html>
  );
}
