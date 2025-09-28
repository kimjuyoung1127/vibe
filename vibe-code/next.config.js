// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'placehold.co',
      'lh3.googleusercontent.com', // For default avatar
      'avatars.githubusercontent.com', // For GitHub avatars
      // Add your Supabase project URL here (replace with your actual project URL)
      // Example: 'your-project-name.supabase.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      // Add your Supabase storage bucket URL here
      // {
      //   protocol: 'https',
      //   hostname: 'your-project-name.supabase.co',
      //   pathname: '/storage/v1/object/public/**',
      // },
    ],
  },
}

module.exports = nextConfig