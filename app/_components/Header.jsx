import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/">
          <h1 className="text-2xl font-bold">Digital Canvas</h1>
        </Link>
        <nav>
          <a href="#features" className="text-white hover:underline mx-4">
            Features
          </a>
          <a href="#pricing" className="text-white hover:underline mx-4">
            Pricing
          </a>
          <a href="#contact" className="text-white hover:underline mx-4">
            Contact
          </a>
        </nav>
        <Link
          href="/signup"
          className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-gray-200"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}
