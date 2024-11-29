"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../_components/Header";
export default function Page() {
  return (
    <>
      <Header />
      <>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Revolutionize Image Understanding with AI
            </h2>
            <p className="text-lg mb-8">
              Digital Canvas is your intelligent conversational chatbot,
              bringing advanced image recognition and analysis to your
              fingertips.
            </p>
            <Link
              href="/signin"
              className="bg-white text-indigo-600 px-6 py-3 rounded shadow hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Features</h3>
            <p className="text-lg mb-12">
              Explore the cutting-edge functionalities of Digital Canvas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">
                  Object Recognition
                </h4>
                <p>
                  Identify and classify objects within images with precision.
                </p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">Face Detection</h4>
                <p>Detect and analyze faces in any image.</p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">
                  Face Emotion Detection
                </h4>
                <p>Understand emotions conveyed through facial expressions.</p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">
                  Handwriting Detection
                </h4>
                <p>Accurately identify and digitize handwritten text.</p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">
                  Food Nutrition Analysis
                </h4>
                <p>Estimate nutritional information from food images.</p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">
                  Object Detection in Images
                </h4>
                <p>Locate and tag multiple objects in complex images.</p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">
                  Deepfake Detection
                </h4>
                <p>Identify AI-generated manipulated images.</p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <h4 className="text-xl font-semibold mb-4">AI Detection</h4>
                <p>Detect AI-generated content in images.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Pricing</h3>
            <p className="text-lg mb-12">
              Choose the plan that suits your needs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white text-indigo-600 p-6 shadow rounded">
                <h4 className="text-2xl font-bold mb-4">Free</h4>
                <p className="mb-4">Basic features with limited usage.</p>
                <p className="text-lg font-semibold">$0/month</p>
              </div>
              <div className="bg-indigo-500 p-6 shadow rounded">
                <h4 className="text-2xl font-bold mb-4">Premium</h4>
                <p className="mb-4">
                  Unlock all features and extended usage limits.
                </p>
                <p className="text-lg font-semibold">$29/month</p>
              </div>
              <div className="bg-white text-indigo-600 p-6 shadow rounded">
                <h4 className="text-2xl font-bold mb-4">Enterprise</h4>
                <p className="mb-4">Custom solutions with API access.</p>
                <p className="text-lg font-semibold">Contact Us</p>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer id="contact" className="bg-gray-800 text-gray-300 py-6">
          <div className="container mx-auto text-center">
            <p className="mb-4">
              Have questions? Reach out to us at{" "}
              <a
                href="mailto:support@digitalcanvas.com"
                className="text-indigo-400"
              >
                support@digitalcanvas.com
              </a>
            </p>
            <p>© 2024 Digital Canvas. All rights reserved.</p>
          </div>
        </footer>
      </>
    </>
  );
}
