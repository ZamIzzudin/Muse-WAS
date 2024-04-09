/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
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
