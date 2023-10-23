/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rb.gy",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
