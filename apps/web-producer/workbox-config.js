module.exports = {
  globDirectory: 'dist/apps/web-producer/',
  globPatterns: [
    'index.html',
    'offline.html',
    'favicon.ico',
    '*.js',
    '*.css',
    'assets/**/*.png',
    'manifest.json'
  ],
  dontCacheBustURLsMatching: new RegExp('.+.[a-f0-9]{20}..+'),
  maximumFileSizeToCacheInBytes: 5000000,
  swSrc: './apps/web-producer/src/service-worker.js',
  swDest: './dist/apps/web-producer/service-worker.js'
};
