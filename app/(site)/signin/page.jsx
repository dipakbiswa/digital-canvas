"use client";
import React, { useState } from "react";

import signIn from "@/firebase/auth/signin";

import { toast } from "react-hot-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";

import FormControls from "@/components/FormControls";
import Header2 from "@/app/_components/Header2";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      toast.error("Sign In failed!");
      return console.log(error);
    }

    //* else successful
    toast.success("Sign In successful!");
    console.log(result);
    return router.push("/dashboard");
  };

  //* Return the form
  return (
    <>
      <Header2 />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Sign In to Digital Canvas
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Enter your credentials to access your account.
          </p>
          {/* Sign In Form */}
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <FormControls
                label="Email"
                type="email"
                id="email"
                value={email}
                setValue={setEmail}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <FormControls
                label="Password"
                type="password"
                id="password"
                value={password}
                setValue={setPassword}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleForm}
            >
              Sign In
            </button>
          </form>
          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="border-t border-gray-300 flex-grow" />
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow" />
          </div>
          {/* Footer */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account? &nbsp;
            <Link href="signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
