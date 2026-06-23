import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // API_URL is used to proxy client-side API requests to the Express backend.
    // In development, this defaults to http://localhost:5000.
    let apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Auto-heal the URL if the user omitted http:// or https:// protocol in Vercel settings
    if (
      apiBaseUrl && 
      !apiBaseUrl.startsWith('http://') && 
      !apiBaseUrl.startsWith('https://') && 
      !apiBaseUrl.startsWith('/')
    ) {
      apiBaseUrl = `https://${apiBaseUrl}`;
    }

    return [
      {
        source: '/api/courses/:path*',
        destination: `${apiBaseUrl}/api/courses/:path*`,
      },
      {
        source: '/api/paths/:path*',
        destination: `${apiBaseUrl}/api/paths/:path*`,
      },
      {
        source: '/api/orders/:path*',
        destination: `${apiBaseUrl}/api/orders/:path*`,
      },
      {
        source: '/api/testimonials/:path*',
        destination: `${apiBaseUrl}/api/testimonials/:path*`,
      },
      {
        source: '/api/campaign/:path*',
        destination: `${apiBaseUrl}/api/campaign/:path*`,
      },
      {
        source: '/api/health',
        destination: `${apiBaseUrl}/api/health`,
      },
    ];
  },
};

export default nextConfig;
