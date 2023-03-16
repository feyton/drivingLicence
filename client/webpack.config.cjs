const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const prod = process.env.NODE_ENV === "production";
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => {
  dotenv.config();
  return {
    entry: "./src/index.js",
    mode: process.env.NODE_ENV || "development",
    output: {
      filename: "bundle.js",
      path: path.resolve("build"),
      publicPath: "/",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      historyApiFallback: true,
      compress: true,
      port: 3000,
      watchFiles: ["./src/**/*.{js, jsx, css, scss}"],
      hot: true,
    },
    resolve: {
      modules: ["node_modules"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/i,

          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: ["file-loader"],
        },
      ],
    },
    devtool: prod ? undefined : "source-map",
    optimization: {
      minimize: prod,
      minimizer: [new OptimizeCSSAssetsPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new MiniCssExtractPlugin(),
      new CompressionPlugin({
        algorithm: "gzip", // or 'brotli'
        test: /\.(js|css)$/, // specify which file types to compress
        threshold: 10240, // files larger than 10 KB will be compressed
        minRatio: 0.8, // only compress if the compressed size is at least 80% of the original
      }),
    ],
  };
};
