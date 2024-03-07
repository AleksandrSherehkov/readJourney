/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{ source: '/', destination: '/recommended', permanent: true }];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ftp.goit.study',
            },
        ],
    },
};

module.exports = nextConfig;
