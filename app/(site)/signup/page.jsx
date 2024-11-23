"use client";
import React, { useState } from "react";

import { toast } from "react-hot-toast";

import signUp from "@/firebase/auth/signup";

import Link from "next/link";
import { useRouter } from "next/navigation";

import FormControls from "@/components/FormControls";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      toast.error("Sign up failed, please try again!");
      return console.log(error);
    }

    //* else successful
    console.log(result);
    toast.success("Sign up successful!");
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
            Sign Up to Digital Canvas
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
        {/* Buttons Wrapper */}
        <div className="flex flex-col items-center">
          <button className="btn" onClick={handleForm} type="submit">
            Register
          </button>
          {/* Login URL */}
          <Link className="btn-2" href="/signin">
            Login to Account
          </Link>
        </div>
      </div>
    </div>
  );
}
