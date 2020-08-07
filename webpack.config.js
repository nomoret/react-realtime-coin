const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const mode = process.env.NODE_ENV || "development";
console.log(mode);

module.exports = {
  mode,
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.resolve("./dist"),
    publicPath: "/",
    filename: mode === "production" ? "[name].[chunkhash].js" : "[name].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    port: 3000,
    hot: true,
  },
  resolve: {
    extensions: [".json", ".js", ".ts", ".tsx"],
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
        test: /\.(js|jsx|ts|tsx)$/,
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
      template: path.join(__dirname, "public/index.html"),
      favicon: path.join(__dirname, "public/favicon.ico"),
      templateParameters: {
        env: mode === "development" ? "(DevMode)" : "",
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
      ? [
          new MiniCssExtractPlugin({
            filename: `[name].css`,
            chunkFilename: "[id].css",
          }),
        ]
      : []),
    new ManifestPlugin(),
    ...(mode === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: `[name].css`,
            chunkFilename: "[id].css",
          }),
        ]
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
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
    concatenateModules: true,
  },
  devtool: mode === "production" ? false : "cheap-module-source-map",
};
