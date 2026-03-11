const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entryPoint = "./src/main.ts";

const baseConfig = {
  entry: path.resolve(entryPoint),
  output: {
    path: path.resolve("./build"),
    filename: "bundle.[hash].js",
    clean: true,
    assetModuleFilename: "[name]-[hash][ext]",
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".css", ".scss"],
    conditionNames: ["browser", "require", "node"],
    modules: [path.resolve(process.cwd(), "src"), "node_modules"],
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.(atlas)$/,
        exclude: /node_modules/,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|webp|png|dds|babylon|bin)$/,
        type: "asset/resource",
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        // exclude: /node_modules/
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    port: 8080,
    allowedHosts: ["all"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      template: path.resolve("./src/template.ejs"),
      title: "Dmitrii Shashkov GameArt test assigment",
    }),
  ],
};

module.exports = { baseConfig };
