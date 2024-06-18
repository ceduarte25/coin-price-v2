/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
        ppr: 'incremental',
    },
    bundlePagesRouterDependencies: true,
};

export default nextConfig;
