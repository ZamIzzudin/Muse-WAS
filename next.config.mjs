/** @format */
//  * @type {import('next').NextConfig}

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["t4.ftcdn.net", "res.cloudinary.com", "yt3.ggpht.com"],
  },
  env: {},
  webpack: (config, { isServer }) => {
    // Hanya terapkan perubahan konfigurasi webpack ini jika saat ini membangun untuk server
    if (!isServer) {
      // Tambahkan aturan konfigurasi khusus untuk modul 'net'
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
