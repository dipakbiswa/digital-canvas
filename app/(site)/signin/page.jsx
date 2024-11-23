"use client";
import React, { useState } from "react";

import signIn from "@/firebase/auth/signin";

import { toast } from "react-hot-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";

import FormControls from "@/components/FormControls";

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
    //* Wrapper Div
    <div className="wrapper">
      {/* Form Wrapper */}
      <div className="form-wrapper flex flex-col">
        {/* Title Div */}
        <div className="py-10">
          <h1 className="text-4xl lg:text-5xl text-center font-bold px-2">
            Sign In to Digital Canvas
          </h1>
        </div>
        {/* Form Controls: Email */}
        <FormControls
          label="Email"
          type="email"
          id="email"
          value={email}
          setValue={setEmail}
        />
        {/* Form Controls: Password */}
        <FormControls
          label="Password"
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
        />
        <div className="flex flex-col items-center">
          {/* Buttons Wrapper */}
          <div className="flex flex-col items-center">
            <button className="btn" onClick={handleForm} type="submit">
              Login
            </button>
            {/* Sign-up URL */}
            <Link className="btn-3" href="/signup">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
