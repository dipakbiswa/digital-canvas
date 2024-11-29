import "./globals.css";

import { Montserrat } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "@/context/AuthContext";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Digital Canvas",
  description: " Digital Canvas Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mont.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
