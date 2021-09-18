/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/spoon/:path*',
        destination: 'http://bingsubat.iptime.org:8099/spoon/:path*',
      },
      {
        source: '/api/tistory/:path*',
        destination: 'http://bingsubat.iptime.org:8099/tistory/:path*',
      },
    ];
  },
};
