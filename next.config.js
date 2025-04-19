/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/apple-portfolio" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
