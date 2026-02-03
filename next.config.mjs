import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Enable modern JavaScript output (reduces polyfills)
  experimental: {
    optimizePackageImports: ["motion/react", "lucide-react"],
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
