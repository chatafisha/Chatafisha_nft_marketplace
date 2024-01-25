const webpack = require("webpack");

module.exports = function override(webpackConfig) {
  // Existing rules for .mjs files
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  // Fallback for the buffer module
  webpackConfig.resolve = webpackConfig.resolve || {};
  webpackConfig.resolve.fallback = webpackConfig.resolve.fallback || {};
  webpackConfig.resolve.fallback.buffer = require.resolve("buffer/");

  // Define Buffer globally using ProvidePlugin
  webpackConfig.plugins = webpackConfig.plugins || [];
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"], // Provide a polyfill for the Buffer class
    })
  );

  return webpackConfig;
};
