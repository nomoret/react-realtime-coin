const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
console.log(mode);

module.exports = {
  mode,
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000, // 10Kb
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `빌드 날짜: ${new Date().toLocaleString()}`,
    }),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: mode === "development" ? "(개발용)" : "",
      },
      minify:
        mode === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      hash: mode === "production",
    }),
    new CleanWebpackPlugin(),
    ...(mode === "production"
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
      : []),
  ],
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ]
        : [],
  },
  devtool: mode === "production" ? false : "cheap-module-source-map",
};
