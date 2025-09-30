// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enable React Server Components if needed
    serverComponentsExternalPackages: [],
  },
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
  // Performance optimizations
  webpack: (config, { dev, isServer }) => {
    // Only enable in production builds
    if (!dev && !isServer) {
      // Enable compression
      config.optimization.minimize = true;
      config.optimization.minimizer = config.optimization.minimizer || [];
    }

    return config;
  },
  // Enable compression and caching
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Enable font optimization
  optimizeFonts: true,
}

module.exports = nextConfig