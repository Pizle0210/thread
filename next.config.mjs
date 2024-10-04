/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages:['mongoose'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      // {
      //   protocol: 'https',
      //   hostname: 'img.clerk.com'
      // },
      // {
      //   protocol: 'http',
      //   hostname: 'images.clerk.dev'
      // },
      // {
      //   protocol: 'https',
      //   hostname:'uploadthing.com'
      // },
      // {
      //   protocol: 'https',
      //   hostname:'placehold.co'
      // },
    ],
  }, 
};

export default nextConfig;
