const { merge } = require("webpack-merge");
const { baseConfig } = require("./baseConfig");
const path = require("path");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve("./public"),
    },
    host: "localhost",
    port: 8080,
    allowedHosts: ["all"],
  },
});
