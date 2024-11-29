/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/foodvisor-api/:path*",
        destination: "https://vision.foodvisor.io/api/:path*",
      },
      {
        source: "/object-detection-img-op/:path*",
        destination: "http://127.0.0.1:5000/:path*",
      },
      {
        source: "/deepfake-detection/:path*",
        destination: "https://api.sightengine.com/:path*",
      },
      {
        source: "/suggest-product/:path*",
        destination: "https://serpapi.com/:path*",
      },
    ];
  },
};

export default nextConfig;
