/** @type {import('next').NextConfig} */
const nextConfig = {
    headers() {
        return [
            {
                source: '/api/data',
                headers: [
                    { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
                ]
            }
        ];
    }
}

module.exports = nextConfig
