/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure environment variables are available on the client-side
  env: {
    NEXT_PUBLIC_GROQ_API_KEY: process.env.GROQ_API_KEY,
  }
};

module.exports = nextConfig;