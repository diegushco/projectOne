const webpack = require('webpack');
// const CompressionPlugin = require('compression-webpack-plugin');
// const zopfli = require('@gfx/zopfli');

module.exports = {
  plugins: [
    // new CompressionPlugin({
    //   compressionOptions: {
    //     numiterations: 15
    //   },
    //   algorithm(input, compressionOptions, callback) {
    //     return zopfli.gzip(input, compressionOptions, callback);
    //   }
    // }),
    // new CompressionPlugin({
    //     filename: '[path].br[query]',
    //     algorithm: 'brotliCompress',
    //     test: /\.(js|css|html|svg)$/,
    //     compressionOptions: {
    //         level: 11
    //     },
    //     threshold: 10240,
    //     minRatio: 0.8,
    //     deleteOriginalAssets: false
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
